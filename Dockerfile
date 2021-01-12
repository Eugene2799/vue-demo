FROM nginx
MAINTAINER Eugene2799

EXPOSE 80

RUN mkdir /opt/www
WORKDIR /opt/www

ADD ./dist/ /opt/www

ADD ./nginx.conf /etc/nginx/
CMD ["nginx", "-g", "daemon off;"]
