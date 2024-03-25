#pragma once

#include <string_view>

/// @brief Поля запроса и ответа
namespace server::details::fields {
    constexpr std::string_view parameters = "parameters"; ///< Параметры
    constexpr std::string_view status = "status"; ///< Статус ответа (ok/error)
    constexpr std::string_view result = "result"; ///< Результат (в случае статуса ok)
    constexpr std::string_view error_message = "error_message"; ///< Сообщение об ошибке (в случае статуса error)
}
