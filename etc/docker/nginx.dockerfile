FROM nginx:stable-alpine
USER root

RUN echo http://dl-2.alpinelinux.org/alpine/edge/community/ >> /etc/apk/repositories
RUN apk add openssl shadow --update --upgrade --no-cache

RUN adduser -D -H -u 1000 -s /bin/bash www-data -G www-data

WORKDIR /app

COPY etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY etc/nginx/performance /etc/nginx/performance

CMD ["nginx", "-g", "daemon off;"]
