#include <controllers/anomaly_logs/get.h>
#include <data_models/anomaly_logs.h>
#include <storage/storage.h>
#include <utils/utils.h>

#include "details/fields.h"

using namespace controllers::anomaly_logs;

json Get::operator()(const json& parameters) const {
    // Проверяем наличие необходимых полей
    utils::CheckForRequiredFields(parameters, { fields::last_id });

    // Создаём транзакцию
    auto transaction = storage::Storage::Get().CreateTransaction();

    // Создаём модель
    data_models::AnomalyLogsModel anomaly_logs_model(transaction);

    // Запрашиваем логи
    auto last_id = std::stoull(parameters[fields::last_id].get<std::string>());
    auto anomaly_logs = anomaly_logs_model.GetAll(last_id);

    // Формируем ответ
    json result = json::array();
    for (auto& log : anomaly_logs) {
        json item = json::object();
        item[fields::id] = log.id;
        item[fields::cluster_id] = log.cluster_id;
        item[fields::data] = std::move(log.data);

        result.push_back(std::move(item));
    }

    return result;
}
