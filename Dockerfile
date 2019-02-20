FROM node:10.15.1-alpine AS builder
RUN npm i -g yarn
COPY package.json yarn.lock /home/app/
WORKDIR /home/app
RUN npm install --silent
COPY . /home/app

FROM node:10.15.1-alpine
COPY --from=builder /home/app /home/app
WORKDIR /home/app
ENTRYPOINT [ "npm", "start" ] 
