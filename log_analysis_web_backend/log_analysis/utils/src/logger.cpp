#include <utils/logger.h>

Logger& Logger::Get() {
    static Logger logger;
    return logger;
}

void Logger::SetSettings(LogLevel max_log_level, LogFunction log_function) {
    max_log_level_ = max_log_level;
    log_function_ = log_function;
}

void Logger::Write(LogLevel level, const char* message) {
    if (log_function_ && level <= max_log_level_) {
        log_function_(level, message);
    }
}

void Logger::Write(LogLevel level, const std::string& message) {
    Write(level, message.c_str());
}
