#
# Stage: deps
#   Used to install dependencies (npm install)
#
FROM node:19-slim AS deps

ENV ENV_VAR prod

WORKDIR /app

COPY package.json ./
COPY package-lock.json   ./

RUN npm install \
   --no-progress \
   --silent

#
# Stage: build
#   Used to run `npm run build`, and also used for development (docker-compose)
#

FROM node:19-slim AS build

ENV ENV_VAR prod
ARG API_ORIGIN

WORKDIR /app

COPY ./docker/docker-entrypoint.sh /

COPY next.config.js ./
COPY package.json package-lock.json ./
COPY --from=deps --chown=node:node /app/node_modules ./node_modules

COPY . ./

RUN yarn build

ENTRYPOINT ["/docker-entrypoint.sh"]

#
# Stage: default
#   Used to run the service in production
#

FROM node:19-slim

ENV ENV_VAR  prod
ENV PORT      80

ENV APP_NAME    monetiseur-web
ENV PREFIX      /opt/monetiseur-web
ENV PREFIX_APP  ${PREFIX}/${APP_NAME}

EXPOSE 80

WORKDIR ${PREFIX_APP}

COPY ./docker/docker-entrypoint.sh /

COPY --from=deps  /app/node_modules   ./node_modules
COPY --from=build /app/next.config.js ./
COPY --from=build /app/package.json   ./
COPY --from=build /app/package-lock.json     ./

COPY --from=build /app/public ./public
COPY --from=build /app/.next  ./.next

RUN chmod +x '/docker-entrypoint.sh'

ENTRYPOINT [ "/docker-entrypoint.sh" ]
