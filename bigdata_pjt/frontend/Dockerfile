FROM node:14.17.1-alpine
USER root
WORKDIR /frontend
COPY . /frontend
ARG API_URL
ENV REACT_APP_HOST_IP_ADDRESS $API_URL
ENV CHOKIDAR_USEPOLLING=true
RUN yarn config set "strict-ssl" false
RUN yarn
RUN yarn build
