FROM node:8.11.1-alpine AS builder
COPY package.json package-lock.json /home/app/
WORKDIR /home/app
RUN npm install --silent
COPY . /home/app

FROM node:8.11.1-alpine
# ENV NODE_ENV production
COPY --from=builder /home/app /home/app
WORKDIR /home/app
ENTRYPOINT [ "npm", "start" ] 
