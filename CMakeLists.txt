cmake_minimum_required(VERSION 3.20)
project(acalc LANGUAGES CXX)

add_executable(acalc WIN32 calculator.cpp)
target_compile_features(acalc PRIVATE cxx_std_17)
target_link_libraries(acalc PRIVATE comctl32)
