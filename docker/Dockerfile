# WORKDIR /frontend/build
# COPY frontend/build /frontend/build

# -------------------------------------------------------------------------------------- #

FROM --platform=linux/amd64 python:3.9-slim

USER root

RUN mkdir /opt/image-build && chmod 777 /opt/image-build
# Add required files for CANFAR (gunicorn for Flask server)
ADD docker/nsswitch.conf /etc/
COPY docker/apt-install.sh /opt/image-build
WORKDIR /opt/image-build
RUN ./apt-install.sh sssd acl gunicorn gcc g++ libcurl4-openssl-dev libssl-dev git

RUN pip3 install flask flask-cors wheel gunicorn

# Install PyCSC package
ARG CACHEBUST_PyCSC=1

# Make sure the spectrum.py file in the github repository points towards the correct stellar_models directory path.
RUN pip3 install git+https://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@github.com/Christoffel-Symbols/Christoffel-Symbols-Calculator.git

ARG CACHEBUST_BACKEND=1
# REVIEW: cachebust not working?
COPY backend /backend

# Copy the minified frontend files
ARG CACHEBUST_FRONTEND=1
# COPY --from=frontend-builder /frontend/build /backend/client
COPY frontend/build /backend/client

EXPOSE 5000

ADD docker/startup.sh /skaha/
RUN chmod a+x /skaha/startup.sh

# https://stackoverflow.com/a/67206046
ENV skaha_sessionid=1
ENTRYPOINT [ "/bin/bash", "-c", "exec /skaha/startup.sh ${skaha_sessionid} \"${@}\"", "--" ]
# ENTRYPOINT [ "/skaha/startup.sh" ]