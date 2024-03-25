#include "storage_wrapper.h"

#include <userver/yaml_config/merge_schemas.hpp>

#include <storage/storage.h>

using namespace server::details;

StorageWrapper::StorageWrapper(const userver::components::ComponentConfig& config,
                               const userver::components::ComponentContext& context)
    : userver::components::LoggableComponentBase(config, context) {
    storage::ConnectionData connection_data;
    connection_data.database = config["database"].As<std::string>();
    connection_data.username = config["username"].As<std::string>();
    connection_data.password = config["password"].As<std::string>();
    connection_data.host = config["host"].As<std::string>();
    connection_data.port = config["port"].As<std::string>();

    storage::Storage::Get().Connect(connection_data);
}

userver::yaml_config::Schema StorageWrapper::GetStaticConfigSchema() {
    return userver::yaml_config::MergeSchemas<userver::components::LoggableComponentBase>(R"(
        type: object
        description: storage wrapper component
        additionalProperties: false
        properties:
            database:
                type: string
                description: database
            host:
                type: string
                description: host
            port:
                type: string
                description: port
            username:
                type: string
                description: username
            password:
                type: string
                description: password
    )");
}
