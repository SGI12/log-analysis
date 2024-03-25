# libpqxx

# Отключаем сборку тестов
set(SKIP_BUILD_TEST ON)

FetchContent_Declare(libpqxx
    GIT_REPOSITORY https://github.com/jtv/libpqxx.git
    GIT_TAG 7.8.1
)

FetchContent_MakeAvailable(libpqxx)
