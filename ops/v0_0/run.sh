set -a
. ./ops/v0_0/.env
set +a

docker run -d --name reservation-db \
    -e POSTGRES_USER=user \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=reservation \
    -p 5432:5432 \
    postgres:16

sleep 5

docker exec -i reservation-db psql -U user -d reservation < ops/v0_0/database.sql
