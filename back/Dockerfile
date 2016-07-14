FROM node:6.2

MAINTAINER Jean-Louis Rigau <jlrigau@xebia.fr>

RUN mkdir /skills

WORKDIR /skills

EXPOSE 8080

COPY bootstrap.sh bootstrap.sh

COPY database/migrations migrations
COPY database/database.json database.json

COPY node_modules node_modules
COPY configuration.json configuration.json
COPY src src

ENTRYPOINT ["/skills/bootstrap.sh"]