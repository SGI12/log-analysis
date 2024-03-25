#pragma once

#include <string_view>
#include <memory>

#include <pqxx/pqxx>

namespace storage {
    /// @brief Транзакция
    class Transaction {
    public:
        /// @brief Конструктор
        Transaction(const std::string& connection_data);

        /// @brief Деструктор
        ~Transaction();

        /// @brief Конструктор перемещения
        Transaction(Transaction&&) = default;

        /// @brief Оператор перемещающего присваивания
        Transaction& operator=(Transaction&&) = default;

        /// @brief Выполнение запроса
        /// @param[in] query Запрос
        /// @returns Результат выполнения
        pqxx::result Do(std::string_view query) const;

    private:
        std::unique_ptr<pqxx::connection> connection_; ///< Соединение
        std::unique_ptr<pqxx::work> transaction_; ///< Транзакция
    };
}
