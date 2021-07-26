FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install
RUN npm run build
RUN rm -rf node_modules
RUN cd site \
    rm -rf * \
    cd .. \
    cp dist/* site -rf
CMD [ "echo", "Frontend compiled succesfully" ]
