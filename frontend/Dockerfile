# build env
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY package*.json ./
#RUN npm install
RUN npm ci
RUN npm i react-scripts
COPY . ./
#RUN npm run build
CMD [ "npm", "run", "start" ]

# production env
#FROM nginx:stable-alpine
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
