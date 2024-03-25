# nlohmann/json

# Отключаем сборку тестов
set(JSON_BuildTests OFF)

FetchContent_Declare(nlohmann-json
    GIT_REPOSITORY https://github.com/nlohmann/json.git
    GIT_TAG v3.11.2
)

FetchContent_MakeAvailable(nlohmann-json)
