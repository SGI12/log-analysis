#include <controllers/statistics/get.h>
#include <data_models/statistics.h>
#include <storage/storage.h>

using namespace controllers::statistics;

json Get::operator()(const json& parameters) const {
    // Создаём транзакцию
    auto transaction = storage::Storage::Get().CreateTransaction();

    // Создаём модель
    data_models::StatisticsModel statistics_model(transaction);

    // Запрашиваем статистику
    auto statistics = statistics_model.GetAll();

    // Формируем ответ
    json result;
    for (auto& statistic : statistics) {
        result[std::move(statistic.name)] = statistic.value;
    }

    return result;
}
