FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY ad_main.html /usr/share/nginx/html/ad_main.html
COPY index.html /usr/share/nginx/html/index.html
COPY ./vid /usr/share/nginx/html/vid
EXPOSE 80
