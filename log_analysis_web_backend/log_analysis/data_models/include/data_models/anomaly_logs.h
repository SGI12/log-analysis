#pragma once

#include <string>
#include <vector>

#include <storage/transaction.h>

namespace data_models {
    /// @brief Аномальный лог
    struct AnomalyLog {
        int64_t id; ///< Идентификатор
        int64_t cluster_id; ///< Идентификатор кластера
        std::string data; ///< Содержимое лога
    };

    /// @brief Модель аномальных логов
    class AnomalyLogsModel {
    public:
        /// @brief Конструктор
        /// @param[in] transaction Транзакция
        AnomalyLogsModel(storage::Transaction& transaction);

        /// @brief Проверка существования записи по идентификатору
        /// @param[in] id Идентификатор
        /// @returns Существование записи
        bool Has(int64_t id) const;

        /// @brief Получение записи по идентификатору
        /// @param[in] id Идентификатор
        /// @returns Запись
        AnomalyLog Get(int64_t id) const;

        /// @brief Получение всех записей с идентификатором больше указанного
        /// @details Если надо получить все записи, необходимо передать идентификатор -1
        /// @param[in] last_id Идентификатор
        /// @returns Записи
        std::vector<AnomalyLog> GetAll(int64_t last_id) const;

        /// @brief Получение записей с указанным идентификатором кластера
        /// @param[in] cluster_id Идентификатор кластера
        /// @returns Записи
        std::vector<AnomalyLog> GetByClusterId(int64_t cluster_id) const;

        /// @brief Обновление записи
        /// @param[in] anomaly_log Запись
        void Update(const AnomalyLog& anomaly_log);

    private:
        storage::Transaction& transaction_; ///< Транзакция
    };
}
