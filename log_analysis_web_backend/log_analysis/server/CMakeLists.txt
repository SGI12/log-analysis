# Модуль для работы с серверной частью и исполняемым приложением
project(la_server)

# Собираем исходные файлы
file(GLOB_RECURSE SOURCES src/*.cpp)

# Создаём исполняемое приложение
add_executable(${PROJECT_NAME} ${SOURCES})

# Указываем директории с заголовочными файлами
target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/include)

# Подключаем зависимости
target_link_libraries(${PROJECT_NAME}
    la_controllers
    userver-core
)
