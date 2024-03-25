#pragma once

#include <string>

/// @brief Уровень логирования
enum class LogLevel {
    Debug,
    Access,
    Info,
    Warning,
    Error,
    Severe,
};

/// @brief Функция логирования
using LogFunction = void (*)(LogLevel, const char*);

/// @brief Логгер
class Logger {
public:
    /// @brief Получение экземпляра класса Logger
    static Logger& Get();

    /// @brief Задание настроек логирования
    /// @param[in] max_log_level Максимальный уровень логирования
    /// @param[in] log_function Функция логирования
    void SetSettings(LogLevel max_log_level, LogFunction log_function);

    /// @brief Логирование сообщения
    /// @param[in] level Уровень логирования
    /// @param[in] message Сообщение
    void Write(LogLevel level, const char* message);

    /// @brief Логирование сообщения
    /// @param[in] level Уровень логирования
    /// @param[in] message Сообщение
    void Write(LogLevel level, const std::string& message);

private:
    /// @brief Конструктор
    Logger() = default;

private:
    LogLevel max_log_level_; ///< Максимальный уровень логирования
    LogFunction log_function_; ///< Функция логирования
};
