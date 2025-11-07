# Simple static file server with Nginx
FROM nginx:alpine

# Copy static files
COPY public/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
