# libpq

if (WIN32)
    # Для Windows необходимо скопировать библиотеки и заголовочные файлы PostgreSQL в папку third_party/postgresql
    # Дополнительно необходимо вручную положить libpq.dll, libcrypto-3-x64.dll, libssl-3-x64.dll рядом с исполняемым приложением
    set(PostgreSQL_INCLUDE_DIR ${THIRD_PARTY_DIR}/postgresql/include)
    set(PostgreSQL_TYPE_INCLUDE_DIR ${THIRD_PARTY_DIR}/postgresql/include/server)
    set(PostgreSQL_LIBRARY_DEBUG ${THIRD_PARTY_DIR}/postgresql/debug/lib/libpq.lib)
    set(PostgreSQL_LIBRARY_RELEASE ${THIRD_PARTY_DIR}/postgresql/lib/libpq.lib)
endif()
