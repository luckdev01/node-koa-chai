FROM node:12.14.1-alpine as server

RUN \
  yarn global add nodemon@2.0.1 && \
  yarn cache clean

ENV NODE_ENV production

WORKDIR /opt/app

COPY ["package.json", "*yarn*", "./"]

RUN \
  yarn --no-emoji --frozen-lockfile --production=true && \
  yarn cache clean

COPY ["./", "."]

CMD ["node", "server"]
