#pragma once

#include <userver/components/component.hpp>
#include <userver/components/loggable_component_base.hpp>
#include <userver/yaml_config/schema.hpp>

namespace server::details {
    /// @brief Обёртка-компонент над хранилищем
    class StorageWrapper : public userver::components::LoggableComponentBase {
    public:
        /// @brief Название компонента
        static constexpr std::string_view kName = "storage-wrapper";

        /// @brief Конструктор
        /// @param[in] config Конфигурация
        /// @param[in] context Контекст
        StorageWrapper(const userver::components::ComponentConfig& config, const userver::components::ComponentContext& context);

        /// @brief Получение схемы статической конфигурации
        /// @returns Схема статической конфигурации
        static userver::yaml_config::Schema GetStaticConfigSchema();
    };
}
