# building react app first
FROM node:16.8 as base
WORKDIR /app

FROM base as build
ENV CI=true
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn install
# destination cwd needs to include / at the end
COPY . ./
RUN yarn build

# build final image and copy all build files
FROM nginx:1.20-alpine
WORKDIR /var/www
COPY --from=build /app/build/ .
RUN rm /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
# adding bash to alphine
RUN apk add --no-cache bash
# For some reason nginx always tries to access /var/log/nginx/error.log at
# startup. In the cluster this fails, seems likely due to
# https://github.com/knative/serving/issues/2142
RUN echo "mkdir -p /var/log/nginx" > /docker-entrypoint.d/01-recreate-default-log-dir.sh
RUN chmod 775 /docker-entrypoint.d/01-recreate-default-log-dir.sh
# This script turns environment variables into javascript variables that can be
# loaded at runtime.
COPY env.sh /docker-entrypoint.d/02-create-app-env.sh
RUN chmod 775 /docker-entrypoint.d/02-create-app-env.sh
CMD ["nginx", "-e", "stderr", "-g", "daemon off;"]
