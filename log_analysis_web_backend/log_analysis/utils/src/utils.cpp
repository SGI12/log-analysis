#include <sstream>

#include <utils/utils.h>

namespace utils {
    void CheckForRequiredFields(const json& json, std::initializer_list<std::string_view> fields) {
        for (const auto& field : fields)
            if (!json.contains(field)) {
                std::ostringstream message;
                message << "request doesn't contain required field '" << field << "'";
                throw std::runtime_error(message.str());
            }
    }
}
