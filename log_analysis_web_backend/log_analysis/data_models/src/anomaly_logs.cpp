#include <sstream>

#include <data_models/anomaly_logs.h>

using namespace data_models;

namespace {
    std::vector<AnomalyLog> ConvertAnomalyLogs(pqxx::result pqxx_result) {
        std::vector<AnomalyLog> result;
        result.reserve(pqxx_result.size());

        for (const auto& row : pqxx_result) {
            AnomalyLog anomaly_log{
                    row[0].as<int64_t>(),
                    row[1].as<int64_t>(),
                    row[2].as<std::string>(),
            };

            result.push_back(std::move(anomaly_log));
        }

        return result;
    }
}

AnomalyLogsModel::AnomalyLogsModel(storage::Transaction& transaction)
    : transaction_(transaction) {}

bool AnomalyLogsModel::Has(int64_t id) const {
    std::ostringstream query;
    query << "select id from anomaly_logs where id = " << id << ";";

    auto pqxx_result = transaction_.Do(query.str());
    return !pqxx_result.empty();
}

AnomalyLog AnomalyLogsModel::Get(int64_t id) const {
    std::ostringstream query;
    query << "select id, cluster_id, data from anomaly_logs where id = " << id << ";";

    auto pqxx_result = transaction_.Do(query.str());
    auto pqxx_row = pqxx_result.front();

    AnomalyLog anomaly_log{
        pqxx_row[0].as<int64_t>(),
        pqxx_row[1].as<int64_t>(),
        pqxx_row[2].as<std::string>(),
    };

    return anomaly_log;
}

std::vector<AnomalyLog> AnomalyLogsModel::GetAll(int64_t last_id) const {
    std::ostringstream query;
    query << "select id, cluster_id, data from anomaly_logs where id > " << last_id << ";";

    auto pqxx_result = transaction_.Do(query.str());
    return ConvertAnomalyLogs(std::move(pqxx_result));
}

std::vector<AnomalyLog> AnomalyLogsModel::GetByClusterId(int64_t cluster_id) const {
    std::ostringstream query;
    query << "select id, cluster_id, data from anomaly_logs where cluster_id = " << cluster_id << ";";

    auto pqxx_result = transaction_.Do(query.str());
    return ConvertAnomalyLogs(std::move(pqxx_result));
}

void AnomalyLogsModel::Update(const AnomalyLog& anomaly_log) {
    std::ostringstream query;
    query << "update anomaly_logs set "
          << "cluster_id = " << anomaly_log.cluster_id;

    if (!anomaly_log.data.empty()) {
        query << ", data = '" << anomaly_log.data << "' ";
    }

    query << "where id = " << anomaly_log.id
          << ";";

    transaction_.Do(query.str());
}
