#include <controllers/anomaly_logs/update_cluster_id.h>
#include <data_models/anomaly_logs.h>
#include <storage/storage.h>
#include <utils/utils.h>

#include "details/fields.h"

using namespace controllers::anomaly_logs;

json UpdateClusterId::operator()(const json& parameters) const {
    // Проверяем наличие необходимых полей
    utils::CheckForRequiredFields(parameters, { fields::id, fields::cluster_id });

    // Создаём транзакцию
    auto transaction = storage::Storage::Get().CreateTransaction();

    // Создаём модель
    data_models::AnomalyLogsModel anomaly_logs_model(transaction);

    // Проверяем наличие лога с указанным id
    const int64_t id = parameters[fields::id];
    if (!anomaly_logs_model.Has(id)) {
        throw std::runtime_error("There is no such log with specified id");
    }

    // Обновляем идентификатор кластера в логе
    auto anomaly_log = anomaly_logs_model.Get(id);

    const int64_t cluster_id = parameters[fields::cluster_id];
    anomaly_log.cluster_id = cluster_id;

    anomaly_logs_model.Update(anomaly_log);

    // Обновляем кластер в кластеризаторе
    // UpdateClusterIdInClusterizer(anomaly_log.data, cluster_id);

    return {};
}
