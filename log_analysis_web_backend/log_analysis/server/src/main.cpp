#include <iostream>

#include <userver/components/minimal_server_component_list.hpp>
#include <userver/server/handlers/http_handler_static.hpp>
#include <userver/components/fs_cache.hpp>
#include <userver/utils/daemon_run.hpp>

#include <controllers/anomaly_logs/get.h>
#include <controllers/anomaly_logs/update_cluster_id.h>
#include <controllers/logs_clusters/create.h>
#include <controllers/logs_clusters/get.h>
#include <controllers/statistics/get.h>

#include <utils/logger.h>

#include "details/controller_wrapper.h"
#include "details/storage_wrapper.h"

void Log(LogLevel level, const char* message) {
    std::cout << message << std::endl;
}

int main(int argc, char** argv) {
    // Настраиваем логирование
    Logger::Get().SetSettings(LogLevel::Info, Log);

    // Создаём список компонентов
    const auto component_list = userver::components::MinimalServerComponentList()
        // Static content
        .Append<userver::components::FsCache>("fs-cache-main")
        .Append<userver::server::handlers::HttpHandlerStatic>()
        // Storage
        .Append<server::details::StorageWrapper>()
        // Anomaly Logs
        .Append<server::details::ControllerWrapper<controllers::anomaly_logs::Get>>()
        .Append<server::details::ControllerWrapper<controllers::anomaly_logs::UpdateClusterId>>()
        // Logs Clusters
        .Append<server::details::ControllerWrapper<controllers::logs_clusters::Create>>()
        .Append<server::details::ControllerWrapper<controllers::logs_clusters::Get>>()
        // Statistics
        .Append<server::details::ControllerWrapper<controllers::statistics::Get>>();

    // Запускаем сервер
    return userver::utils::DaemonMain(argc, argv, component_list);
}
