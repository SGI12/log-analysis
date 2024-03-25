#pragma once

#include <controllers/controller_base.h>

namespace controllers::logs_clusters {
    /// @brief Создание кластера логов
    class Create : public ControllerBase {
    public:
        /// @brief Оператор вызова
        /// @param[in] parameters Параметры
        /// @returns Ответ
        json operator()(const json& parameters) const override;
    };
}
