FROM node:lts-alpine
WORKDIR /app
ENV VUE_APP_API_URL=/api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install
RUN npm run build
RUN rm -rf node_modules
CMD [ "sh", "deploy.sh" ]
