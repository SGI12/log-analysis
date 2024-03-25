#pragma once

#include <userver/server/http/http_request.hpp>

#include <controllers/controller_base.h>
#include <json/json.h>

namespace server::details {
    /// @brief Парсинг строки в json
    /// @param[in] data Строка
    /// @throws std::runtime_error В случае ошибки парсинга (например, некорректный формат)
    /// @returns json
    json ParseJson(const std::string& data);

    /// @brief Получение тела запроса
    /// @param[in] request Запрос
    /// @returns Тело запроса
    json GetRequestBody(const userver::server::http::HttpRequest& request);

    /// @brief Обработка запроса
    /// @param[in] controller Контроллер
    /// @param[in] request Запрос
    /// @returns Ответ
    std::string HandleRequest(const controllers::ControllerBase& controller, const json& request);
}
