FROM node:18-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci

COPY ./ ./

EXPOSE 4321

ENTRYPOINT ["npm", "run", "start", "--", "--host"]
