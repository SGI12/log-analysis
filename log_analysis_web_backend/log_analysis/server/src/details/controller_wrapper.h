#pragma once

#include <string>

#include <userver/server/handlers/http_handler_base.hpp>

#include <json/json.h>

#include "details.h"
#include "traits.h"

namespace server::details {
    /// @brief Обёртка-компонент над контроллером
    /// @tparam Controller Тип контроллера
    template <typename Controller>
    class ControllerWrapper final : public userver::server::handlers::HttpHandlerBase {
    public:
        /// @brief Название компонента
        static constexpr std::string_view kName = server::details::traits::ControllerTraits<Controller>::name;

        using HttpHandlerBase::HttpHandlerBase;

        /// @brief Обработка запроса
        /// @param[in] request Запрос
        /// @param[in] context Контекст
        /// @returns Ответ
        std::string HandleRequestThrow(const userver::server::http::HttpRequest& request, userver::server::request::RequestContext&) const override {
            auto request_body = server::details::GetRequestBody(request);
            return server::details::HandleRequest(controller_, request_body);
        }

    private:
        Controller controller_; ///< Контроллер
    };
}
