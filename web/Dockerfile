FROM nginx:1.11

MAINTAINER Jean-Louis Rigau <jlrigau@xebia.fr>

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY dist /usr/share/nginx/html/dist
COPY images /usr/share/nginx/html/images