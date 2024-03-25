#pragma once

#include <string>
#include <memory>

#include <storage/transaction.h>

namespace storage {
    /// @brief Данные подключения
    struct ConnectionData {
        std::string database, username, password, host, port;
    };

    /// @brief Хранилище
    class Storage {
    public:
        /// @brief Получение хранилища
        /// @returns Хранилище
        static Storage& Get();

        /// @brief Подключение к хранилищу
        /// @param[in] connection_data Данных подключения
        void Connect(const ConnectionData& connection_data);

        /// @brief Создание транзацкии
        /// @returns Транзакция
        Transaction CreateTransaction();

    private:
        std::string connection_data_; ///< Данные подключения
    };
}
