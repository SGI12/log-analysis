#include <sstream>

#include <data_models/statistics.h>

using namespace data_models;

StatisticsModel::StatisticsModel(storage::Transaction& transaction)
        : transaction_(transaction) {}

std::vector<Statistic> StatisticsModel::GetAll() const {
    std::ostringstream query;
    query << "select name, value from statistics;";

    auto pqxx_result = transaction_.Do(query.str());

    std::vector<Statistic> result;
    result.reserve(pqxx_result.size());

    for (const auto& row : pqxx_result) {
        Statistic statistic{
            row[0].as<std::string>(),
            row[1].as<size_t>()
        };

        result.push_back(std::move(statistic));
    }

    return result;
}
