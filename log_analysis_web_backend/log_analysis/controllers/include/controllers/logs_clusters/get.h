#pragma once

#include <controllers/controller_base.h>

namespace controllers::logs_clusters {
    /// @brief Получение кластеров логов
    class Get : public ControllerBase {
    public:
        /// @brief Оператор вызова
        /// @param[in] parameters Параметры
        /// @returns Ответ
        json operator()(const json& parameters) const override;
    };
}
