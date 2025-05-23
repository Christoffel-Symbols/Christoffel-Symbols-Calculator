#!/bin/bash
# Build script for the PyCSC (Python Christoffel Symbols Calculator) grpahical user interface
echo "Building PyCSC GUI..."
#
# Set some parameters
#
VERSION=$(date +%y.%m.%d.%H%M)
# (following line from <https://stackoverflow.com/a/246128>)
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
# (following line from <https://stackoverflow.com/a/8426110>)
REPO_DIR="$(dirname "$SCRIPT_DIR")"
#
# Load custom parameters
#
source ${SCRIPT_DIR}/Docker_env

RUN=${1:-true}
#
# Build the project
#
cd ${REPO_DIR}  # necessary so Docker can access other folders within the repo
docker build -t pycsc_gui:${VERSION} \
        --platform=linux/arm64 -f docker/Dockerfile .
#
echo "Finishing building pycsc_gui:${VERSION}"
#
# Run the project
#
if [[ ${RUN} = true ]]; then
    echo "Now running pycsc_gui_v${VERSION}..."
    # https://docs.docker.com/config/containers/container-networking/#published-ports
    docker run --interactive \
            --tty \
            --publish 5000:5000 \
            --name pycsc_gui_v${VERSION} \
            -d pycsc_gui:${VERSION}
    #
    docker logs pycsc_gui_v${VERSION}
    #
    echo "DONE! Access the pycsc_gui_v${VERSION} instance via localhost port 5000."
else
    echo "DONE! The pycsc_gui_v${VERSION} has been built."
fi