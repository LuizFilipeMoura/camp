FROM node:16.6.2

WORKDIR /home/node/app

COPY package.json .

COPY yarn.lock .

RUN yarn install --quiet

COPY . .

RUN yarn build

CMD yarn start
