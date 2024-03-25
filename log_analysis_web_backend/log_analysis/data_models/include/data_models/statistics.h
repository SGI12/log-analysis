#pragma once

#include <string>
#include <vector>

#include <storage/transaction.h>

namespace data_models {
    /// @brief Статистика
    struct Statistic {
        std::string name; ///< Название
        size_t value; ///< Значение
    };

    /// @brief Модель статистик
    class StatisticsModel {
    public:
        /// @brief Конструктор
        /// @param[in] transaction Транзакция
        StatisticsModel(storage::Transaction& transaction);

        /// @brief Получение всех записей
        /// @returns Записи
        std::vector<Statistic> GetAll() const;
    private:
        storage::Transaction& transaction_; ///< Транзакция
    };
}
