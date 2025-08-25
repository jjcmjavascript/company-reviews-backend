#!/bin/sh
set -e

echo "dev-entry.sh: Running migrations and starting the app"

echo ${NODE_ENV}

echo "Esperando a que la base de datos esté lista... 💤"
while ! pg_isready -d ${DATABASE_URL}; do
  echo "Esperando a que la base de datos esté lista...💤"
  sleep 2
done


echo "entry.sh: Running migrations ✅"
npx prisma migrate deploy

echo "entry.sh: Generating Prisma Client 📈📈"
npx prisma generate

echo "entry.sh: Seeding the database 🌵🌵"
npm run seed

echo "🚀 entry.sh: Starting the app 🚀"

echo "############ Welcome: entry.sh: Done ############"

exec npm start