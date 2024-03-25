# Модуль контроллеров -- обработчиков запросов
project(la_controllers)

# Собираем исходные файлы
file(GLOB_RECURSE SOURCES src/*.cpp)

# Создаём библиотеку
add_library(${PROJECT_NAME} ${SOURCES})

# Указываем директории с заголовочными файлами
target_include_directories(${PROJECT_NAME} PUBLIC include)

# Подключаем зависимости
target_link_libraries(${PROJECT_NAME}
    la_data_models
    la_json
    la_storage
    la_utils
)
