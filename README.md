# Christoffel Symbols Calculator frontend

Christoffel-Symbols-Calculator Team - 2024-2025

**This project is under development!**

## Build Instructions

# Docker Setup

Brief walkthrough on how to _locally_ prepare the `PyCSC GUI` in a Docker container.

1. Download the git repo:

   ```bash
   git clone https://github.com/Christoffel-Symbols/Christoffel-Symbols-Calculator-frontend.git
   ```

2. Change the present working directory to `frontend` and run the following:

   ```bash
   npm install
   npm run build
   ```

3. Ensure you have [Docker](https://docs.docker.com/get-started/) installed and running in the background.

4. After cloning the Christoffel-Symbols-Calculator-frontend repository, you will need to build the docker image. This can be done by setting the `RUN` variable to true and then passing `./build.sh` command from the repository-level directory.

5. Access the Christoffel-Symbols-Calculator GUI instance via localhost port 5000.

6. Once you're done using the GUI, close the window and run the following commands:

   ```bash
   docker ps # This will help you find the CONTAINER ID corresponding to the running instance of castor_etc_gui_v<VERSION> Docker image
   docker stop <CONTAINER ID> # Stops the container
   docker rm <CONTAINER ID> # Removes the container
   docker images # Once you have stopped and removed the container, find the IMAGE ID of the castor_etc_gui_v<VERSION> Docker image
   docker image rm <IMAGE ID> # Removes the Docker image
   ```

   where `<VERSION>` is some string like `23.11.13.1359`. You can also check the version
   number by looking at the last line of the output from `./build.sh`, which should say
   something like "DONE! Access the pycsc_gui_v23.11.13.1421 instance via localhost port 5000.".

Please reach out if you have any questions about this, either through email
([dhananjhay03@gmail.com](mailto:dhananjhay03@gmail.com)) or the [discussions
page](https://github.com/orgs/Christoffel-Symbols/discussions).
