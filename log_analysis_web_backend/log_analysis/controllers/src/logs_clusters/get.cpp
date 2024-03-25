#include <controllers/logs_clusters/get.h>
#include <data_models/logs_clusters.h>
#include <storage/storage.h>

#include "details/fields.h"

using namespace controllers::logs_clusters;

json Get::operator()(const json& parameters) const {
    // Создаём транзакцию
    auto transaction = storage::Storage::Get().CreateTransaction();

    // Создаём модель
    data_models::LogsClustersModel logs_clusters_model(transaction);

    // Запрашиваем кластеры
    auto clusters = logs_clusters_model.GetAll();

    // Формируем ответ
    json result = json::array();
    for (auto& cluster : clusters) {
        json item = json::object();
        item[fields::id] = cluster.id;
        item[fields::name] = std::move(cluster.name);
        item[fields::description] = std::move(cluster.description);
        item[fields::recommendation] = std::move(cluster.recommendation);

        result.push_back(std::move(item));
    }

    return result;
}
