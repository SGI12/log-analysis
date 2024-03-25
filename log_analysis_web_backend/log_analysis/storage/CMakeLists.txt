project(la_storage)

file(GLOB_RECURSE SOURCES src/*.cpp)

add_library(${PROJECT_NAME})

target_sources(${PROJECT_NAME} PRIVATE ${SOURCES})

target_include_directories(${PROJECT_NAME} PUBLIC include PRIVATE ${THIRD_PARTY_DIR}/include)

target_link_libraries(${PROJECT_NAME} PUBLIC pqxx)
