FROM nginx:1.11

MAINTAINER Xebia <jsmadja@xebia.fr>

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY dist /usr/share/nginx/html/dist
COPY images /usr/share/nginx/html/images
COPY favicon /usr/share/nginx/html/favicon
COPY launcher-icon-2x.png /usr/share/nginx/html/launcher-icon-2x.png
COPY launcher-icon-3x.png /usr/share/nginx/html/launcher-icon-3x.png
COPY launcher-icon-4x.png /usr/share/nginx/html/launcher-icon-4x.png