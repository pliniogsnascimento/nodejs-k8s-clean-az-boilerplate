FROM node:8.11.1
COPY package.json package-lock.json /home/app/
WORKDIR /home/app
RUN npm install --silent
COPY . /home/app

FROM node:8.11.1
ENV NODE_ENV production
COPY --from=0 /home/app /home/app
WORKDIR /home/app
ENTRYPOINT [ "npm", "start" ]
