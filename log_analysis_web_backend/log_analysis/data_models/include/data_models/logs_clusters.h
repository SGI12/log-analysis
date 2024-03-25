#pragma once

#include <string>
#include <vector>

#include <storage/transaction.h>

namespace data_models {
    /// @brief Кластер логов
    struct LogsCluster {
        int64_t id; ///< Идентификатор
        std::string name; ///< Название
        std::string description; ///< Описание
        std::string recommendation; ///< Рекомендация
    };

    /// @brief Модель кластеров логов
    class LogsClustersModel {
    public:
        /// @brief Конструктор
        /// @param[in] transaction Транзакция
        LogsClustersModel(storage::Transaction& transaction);

        /// @brief Проверка существования записи по идентификатору
        /// @param[in] id Идентификатор
        /// @returns Существование записи
        bool Has(int64_t id) const;

        /// @brief Получение всех записей
        /// @returns Записи
        std::vector<LogsCluster> GetAll() const;

        /// @brief Создание кластера
        /// @param[in] cluster Кластер
        void Create(const LogsCluster& cluster);
    private:
        storage::Transaction& transaction_; ///< Транзакция
    };
}
