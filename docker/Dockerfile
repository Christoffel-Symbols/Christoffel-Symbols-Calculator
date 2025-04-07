# Stage 1: Frontend builder
FROM node:18-slim AS frontend-builder

WORKDIR /app/frontend

# Copy only package files first for caching install step
COPY frontend/package*.json ./

RUN npm install

# Now copy the rest of the frontend code
COPY frontend/ .

# Build the frontend
RUN npm run build

# Stage 2: Final backend image

# needed in macos --platform=linux/arm64
FROM --platform=linux/arm64 python:3.9-slim

USER root

RUN mkdir /opt/image-build && chmod 777 /opt/image-build

COPY docker/apt-install.sh /opt/image-build
WORKDIR /opt/image-build
RUN ./apt-install.sh sssd acl gunicorn gcc g++ libcurl4-openssl-dev libssl-dev git

RUN pip3 install flask flask-cors wheel gunicorn

# Install PyCSC package
RUN pip3 install git+https://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@github.com/Christoffel-Symbols/Christoffel-Symbols-Calculator.git@v2.1.1

COPY backend /backend

COPY --from=frontend-builder /app/frontend/build /backend/client

EXPOSE 5000

ADD docker/startup.sh /server/
RUN chmod a+x /server/startup.sh

# https://stackoverflow.com/a/67206046
ENTRYPOINT [ "/bin/bash", "-c", "exec /server/startup.sh \"${@}\"", "--" ]