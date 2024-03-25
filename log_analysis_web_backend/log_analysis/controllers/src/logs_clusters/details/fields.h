#pragma once

#include <string_view>

namespace controllers::logs_clusters::fields {
    /// @defgroup Поля ответа
    /// @{
    constexpr std::string_view id = "id";
    constexpr std::string_view name = "name";
    constexpr std::string_view description = "description";
    constexpr std::string_view recommendation = "recommendation";
    /// @}
}
