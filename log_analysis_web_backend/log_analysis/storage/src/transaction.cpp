#include <sstream>

#include <storage/transaction.h>

using namespace storage;

Transaction::Transaction(const std::string& connection_data)
    : connection_(std::make_unique<pqxx::connection>(connection_data))
    , transaction_(std::make_unique<pqxx::work>(*connection_)) {}

Transaction::~Transaction() {
    if (connection_ && transaction_) {
        transaction_->commit();
        connection_->close();
    }
}

pqxx::result Transaction::Do(std::string_view query) const {
    return transaction_->exec(query);
}
