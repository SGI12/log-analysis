#include "details.h"

#include <utils/logger.h>
#include <utils/utils.h>

#include "fields.h"

namespace server::details {
    json ParseJson(const std::string& data) {
        json json;
        try {
            json = json::parse(data);
        } catch (const std::exception& e) {
            throw std::runtime_error("failed to parse json, details: " + std::string(e.what()));
        }

        return json;
    }

    json GetRequestBody(const userver::server::http::HttpRequest& request) {
        json body;

        if (!request.RequestBody().empty() && request.RequestBody() != "null") {
            body = json::parse(request.RequestBody());
        }

        for (const auto& argument_name : request.ArgNames()) {
            if (body.contains(argument_name)) {
                throw std::runtime_error("body already has parameter '" + argument_name + "'");
            }

            body[argument_name] = request.GetArg(argument_name);
        }

        return body;
    }

    std::string HandleRequest(const controllers::ControllerBase& controller, const json& request) {
        Logger::Get().Write(LogLevel::Info, "accepted request '" + request.dump() + "'");

        json result;
        try {
            result = controller(request);
        }
        catch (const std::exception& e) {
            json json;
            json[fields::status] = "error";
            json[fields::error_message] = e.what();

            result = json.dump();

            return result;
        }

        json json;
        json[fields::status] = "ok";
        json[fields::result] = result;

        result = json.dump();

        return result;
    }
}
