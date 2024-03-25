#pragma once

#include <string_view>
#include <initializer_list>

#include <json/json.h>

namespace utils {
    /// @brief Проверка наличия необходимых ключей
    /// @param[in] json Объект, который надо проверить
    /// @param[in] fields Необходимые ключи
    /// @throws std::runtime_error В случае отсутствия хотя бы одного ключа
    void CheckForRequiredFields(const json& json, std::initializer_list<std::string_view> fields);
}
