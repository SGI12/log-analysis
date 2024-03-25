#include <sstream>

#include <data_models/logs_clusters.h>

using namespace data_models;

LogsClustersModel::LogsClustersModel(storage::Transaction& transaction)
        : transaction_(transaction) {}

bool LogsClustersModel::Has(int64_t id) const {
    std::ostringstream query;
    query << "select id from logs_clusters where id = " << id << ";";

    auto pqxx_result = transaction_.Do(query.str());
    return !pqxx_result.empty();
}

std::vector<LogsCluster> LogsClustersModel::GetAll() const {
    std::ostringstream query;
    query << "select id, name, description, recommendation from logs_clusters;";

    auto pqxx_result = transaction_.Do(query.str());

    std::vector<LogsCluster> result;
    result.reserve(pqxx_result.size());

    for (const auto& row : pqxx_result) {
        LogsCluster logs_cluster{
                row[0].as<int64_t>(),
                row[1].as<std::string>(),
                row[2].as<std::string>(),
                row[3].as<std::string>(),
        };

        result.push_back(std::move(logs_cluster));
    }

    return result;
}

void LogsClustersModel::Create(const LogsCluster& cluster) {
    std::ostringstream query;
    query << "insert into logs_clusters (id, name, description, recommendation) values "
          << "(" << cluster.id << ", "
          << "'" << cluster.name << "', "
          << "'" << cluster.description << "', "
          << "'" << cluster.recommendation << "'"
          << ");";

    transaction_.Do(query.str());
}
