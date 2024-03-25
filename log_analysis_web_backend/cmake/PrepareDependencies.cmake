# Подготавливаем зависимости

include(FetchContent)

include(${CMAKE_CURRENT_LIST_DIR}/PrepareNlohmannJson.cmake)
include(${CMAKE_CURRENT_LIST_DIR}/PreparePostgreSql.cmake)
include(${CMAKE_CURRENT_LIST_DIR}/PreparePqxx.cmake)
include(${CMAKE_CURRENT_LIST_DIR}/PrepareUserver.cmake)
