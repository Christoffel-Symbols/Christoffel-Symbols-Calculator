# -------------------------------------------------------------------------------------- #
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

# -------------------------------------------------------------------------------------- #
# Build the frontend assets (adjust this if you're using npm, yarn, or another tool)
# Add steps to install frontend dependencies and build the frontend if necessary
WORKDIR /frontend

# Assuming you're using npm (adjust the build steps accordingly)
RUN npm install
RUN npm run build

# Copy the frontend build files into the container
COPY frontend/build /backend/client

EXPOSE 5000

ADD docker/startup.sh /server/
RUN chmod a+x /server/startup.sh

# https://stackoverflow.com/a/67206046
ENTRYPOINT [ "/bin/bash", "-c", "exec /server/startup.sh \"${@}\"", "--" ]