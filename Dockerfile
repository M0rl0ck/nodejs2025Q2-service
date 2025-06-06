ARG NODE_VERSION=22.16.0

FROM node:${NODE_VERSION}-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY tsconfig*.json ./

COPY . .

RUN npm run build

FROM node:${NODE_VERSION}-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

EXPOSE 4000

COPY --from=development /app/dist ./dist

CMD [ "node", "dist/main" ]

