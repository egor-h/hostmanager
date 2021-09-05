# Запуск в docker-compose
## Обычная версия
Запускается как `docker-compose -f hostsmanager.yml up -d`
## Версия для разработки
Открывает порт для отладки JVM 8000, а так же пробрасывает порт MySQL 3306.
Запускается следующим образом: `docker-compose -f hostsmanager.yml -f hostsmanager.dev.yml up -d`