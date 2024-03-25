# seasocks

# Отключаем сборку тестов, демо-приложения и поддержку deflate
set(UNITTESTS OFF)
set(SEASOCKS_EXAMPLE_APP OFF)
set(DEFLATE_SUPPORT OFF)

FetchContent_Declare(seasocks
    GIT_REPOSITORY https://github.com/mattgodbolt/seasocks.git
    GIT_TAG v1.4.5
)

FetchContent_MakeAvailable(seasocks)
