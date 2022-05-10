# build environment
FROM node:13.12.0-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Set env variable
ARG REACT_APP_API_GATEWAY_IP
ENV REACT_APP_API_GATEWAY_IP=$REACT_APP_API_GATEWAY_IP

ARG REACT_APP_API_GATEWAY_PORT
ENV REACT_APP_API_GATEWAY_PORT=$REACT_APP_API_GATEWAY_PORT

# that will be empty
RUN echo "REACT_APP_API_GATEWAY_IP": $REACT_APP_API_GATEWAY_IP
RUN echo "REACT_APP_API_GATEWAY_PORT": $REACT_APP_API_GATEWAY_PORT


COPY package.json ./
COPY package-lock.json ./
#RUN npm ci
RUN npm install -g npm
RUN npm install --legacy-peer-deps --verbose
#RUN npm install --save --legacy-peer-deps --verbose
RUN npm install react-scripts@3.4.1 -g 
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Set env variable
ARG REACT_APP_API_GATEWAY_IP
ENV REACT_APP_API_GATEWAY_IP=$REACT_APP_API_GATEWAY_IP

ARG REACT_APP_API_GATEWAY_PORT
ENV REACT_APP_API_GATEWAY_PORT=$REACT_APP_API_GATEWAY_PORT

# that will be empty
RUN echo "REACT_APP_API_GATEWAY_IP": $REACT_APP_API_GATEWAY_IP
RUN echo "REACT_APP_API_GATEWAY_PORT": $REACT_APP_API_GATEWAY_PORT

CMD ["nginx", "-g", "daemon off;"]