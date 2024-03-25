#pragma once

#include <controllers/controller_base.h>

namespace controllers::anomaly_logs {
    /// @brief Обновление идентификатора кластера у аномального лога
    class UpdateClusterId : public ControllerBase {
    public:
        /// @brief Оператор вызова
        /// @param[in] parameters Параметры
        /// @returns Ответ
        json operator()(const json& parameters) const override;
    };
}
