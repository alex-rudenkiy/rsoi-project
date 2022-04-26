#!/bin/bash
service postgresql start
su - postgres


psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE database_appeal;
    GRANT ALL PRIVILEGES ON DATABASE database_appeal TO docker;
    CREATE DATABASE database_users;
    GRANT ALL PRIVILEGES ON DATABASE database_users TO docker;
EOSQL
