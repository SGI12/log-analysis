#include <sstream>

#include <storage/storage.h>

using namespace storage;

Storage& Storage::Get() {
    static Storage storage;
    return storage;
}

void Storage::Connect(const ConnectionData& connection_data) {
    std::ostringstream connection;
    connection << "dbname = " << connection_data.database
            << " user = " << connection_data.username
            << " password = " << connection_data.password
            << " host = " << connection_data.host
            << " port = " << connection_data.port;

    connection_data_ = connection.str();
}

Transaction Storage::CreateTransaction() {
    return { connection_data_ };
}
