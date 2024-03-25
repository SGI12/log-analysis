#include <controllers/logs_clusters/create.h>
#include <data_models/logs_clusters.h>
#include <storage/storage.h>
#include <utils/utils.h>

#include "details/fields.h"

using namespace controllers::logs_clusters;

json Create::operator()(const json& parameters) const {
    // Проверяем наличие необходимых полей
    utils::CheckForRequiredFields(parameters, { fields::id, fields::name, fields::description, fields::recommendation });

    // Создаём транзакцию
    auto transaction = storage::Storage::Get().CreateTransaction();

    // Создаём модель
    data_models::LogsClustersModel logs_clusters_model(transaction);

    // Проверяем, что кластер с указанным id не существует
    int64_t id = parameters[fields::id];
    if (logs_clusters_model.Has(id)) {
        throw std::runtime_error("Cluster with specified id already exists");
    }

    // Создаём кластер
    logs_clusters_model.Create({
        id,
        parameters[fields::name],
        parameters[fields::description],
        parameters[fields::recommendation]
    });

    return {};
}
