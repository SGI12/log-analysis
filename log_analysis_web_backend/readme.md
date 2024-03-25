# Log Analysis Web Backend
Репозиторий содержит веб-сервер проекта Log Analysis.

## Как собрать и использовать
Сначала необходимо инициализировать сабмодули:
```bash
git submodule --init
```

Далее можно собирать проект:
```bash
cmake -B <build-dir> -DCMAKE_BUILD_TYPE=<Debug|Release>
cmake --build <build-dir> -j <threads-amount>
```

После сборки исполняемое приложение находится по пути build-dir/log_analysis/server/la_server.

При запуске необходимо указать путь к конфигурационным файлам:
```bash
la_server --config configuration.yaml --config_vars configuration_vars.yaml
```
