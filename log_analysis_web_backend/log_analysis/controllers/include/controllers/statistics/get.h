#pragma once

#include <controllers/controller_base.h>

namespace controllers::statistics {
    /// @brief Получение статистики
    class Get : public ControllerBase {
    public:
        /// @brief Оператор вызова
        /// @param[in] parameters Параметры
        /// @returns Ответ
        json operator()(const json& parameters) const override;
    };
}
