# Модуль для работы с json
project(la_json)

# Создаём библиотеку
add_library(${PROJECT_NAME} INTERFACE)

# Указываем директории с заголовочными файлами
target_include_directories(${PROJECT_NAME}
    INTERFACE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

# Подключаем зависимости
target_link_libraries(${PROJECT_NAME} INTERFACE nlohmann_json)
