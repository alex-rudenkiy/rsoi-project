# Step 1

FROM node:10-alpine as build-step

RUN mkdir /app

WORKDIR /app

#COPY package.json /app

#RUN npm install

#COPY . /app
COPY ./build /app
RUN npm install -g serve
CMD ["cd", "frontend"]
#CMD ["serve", "-l", "3456", "-s", "build"]


#RUN serve -s build

#RUN npm run build
