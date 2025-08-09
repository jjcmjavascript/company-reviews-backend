#!/bin/sh
set -e

echo "dev-entry.sh: Running migrations and starting the app"

echo "Esperando a que la base de datos esté lista... 💤"
while ! pg_isready -h reportedcompanydb -p ${DATABASE_PORT} -U ${DATABASE_USER}; do
  echo "Esperando a que la base de datos esté lista...💤"
  sleep 2
done


echo "dev-entry.sh: Running migrations ✅"
npx prisma migrate deploy

echo "dev-entry.sh: Generating Prisma Client 📈📈"
npx prisma generate

echo "dev-entry.sh: Seeding the database 🌵🌵"
npm run seed

echo "🚀 dev-entry.sh: Starting the app 🚀"

echo "############ Welcome: dev-entry.sh: Done ############"

exec npm run dev