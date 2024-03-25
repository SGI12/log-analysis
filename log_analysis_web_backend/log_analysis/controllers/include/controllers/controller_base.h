#pragma once

#include <string>

#include <json/json.h>

namespace controllers {
    class ControllerBase {
    public:
        /// @brief Деструктор
        virtual ~ControllerBase() = default;

        /// @brief Вызов логики контроллера
        /// @param[in] parameters Параметры
        /// @returns Ответ контроллера
        virtual json operator()(const json& parameters) const = 0;
    };
}
