#pragma once

#include <string_view>

namespace controllers::anomaly_logs::fields {
    /// @defgroup Поля запроса
    /// @{
    constexpr std::string_view last_id = "last_id";
    /// @}

    /// @defgroup Поля ответа
    /// @{
    constexpr std::string_view id = "id";
    constexpr std::string_view cluster_id = "cluster_id";
    constexpr std::string_view data = "data";
    /// @}
}
