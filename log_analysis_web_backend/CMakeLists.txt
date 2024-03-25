cmake_minimum_required(VERSION 3.16)
cmake_policy(SET CMP0077 NEW)
set(CMAKE_POLICY_DEFAULT_CMP0077 NEW)

# Проект Log Analysis. Названия CMake-таргетов имеют префикс "la_" (первые буквы слов в названии проекта)
project(traffic_analysis)

# Указываем переменные
set(CMAKE_CXX_STANDARD 20)
set(PROJECT_ROOT_DIR ${CMAKE_CURRENT_SOURCE_DIR})
set(THIRD_PARTY_DIR ${PROJECT_ROOT_DIR}/third_party)

# Подготавливаем зависимости
include(${CMAKE_CURRENT_SOURCE_DIR}/cmake/PrepareDependencies.cmake)

# Добавляем исходный код
add_subdirectory(log_analysis)
