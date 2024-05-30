# WORKDIR /frontend/build
# COPY frontend/build /frontend/build

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

# COPY --from=frontend-builder /frontend/build /backend/client
COPY frontend/build /backend/client

EXPOSE 5000

ADD docker/startup.sh /server/
RUN chmod a+x /server/startup.sh

# https://stackoverflow.com/a/67206046
ENTRYPOINT [ "/bin/bash", "-c", "exec /server/startup.sh \"${@}\"", "--" ]