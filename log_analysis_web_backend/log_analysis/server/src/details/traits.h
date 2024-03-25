#pragma once

#include <string_view>

namespace controllers {
    namespace anomaly_logs {
        class Get;
        class UpdateClusterId;
    }

    namespace logs_clusters {
        class Create;
        class Get;
    }

    namespace statistics {
        class Get;
    }
}

namespace server::details::traits {
    /// @brief Свойства контроллера
    /// @tparam T Тип контроллера
    template <typename T>
    struct ControllerTraits {};

    /// @defgroup Свойства контроллеров Anomaly Logs
    /// @{

    template <>
    struct ControllerTraits<controllers::anomaly_logs::Get> {
        static constexpr std::string_view name = "anomaly-logs-get";
    };

    template <>
    struct ControllerTraits<controllers::anomaly_logs::UpdateClusterId> {
        static constexpr std::string_view name = "anomaly-logs-update-cluster-id";
    };

    /// @}


    /// @defgroup Свойства контроллеров Logs Clusters
    /// @{

    template <>
    struct ControllerTraits<controllers::logs_clusters::Create> {
        static constexpr std::string_view name = "logs-clusters-create";
    };

    template <>
    struct ControllerTraits<controllers::logs_clusters::Get> {
        static constexpr std::string_view name = "logs-clusters-get";
    };

    /// @}


    /// @defgroup Свойства контроллеров Statistics
    /// @{

    template <>
    struct ControllerTraits<controllers::statistics::Get> {
        static constexpr std::string_view name = "statistics-get";
    };

    /// @}
}
