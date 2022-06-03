FROM node:12

# создание директории приложения
WORKDIR /usr/src/app

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

# копируем исходный код
COPY . .

RUN ls

RUN apt-get update && \
    apt-get install -y openjdk-11-jre-headless && \
    apt-get clean;

EXPOSE 8080
CMD [ "node", "apiGateway.js" ]
