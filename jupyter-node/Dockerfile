# start from a base image
FROM node:latest

# run various command, ussualy installs
RUN apt-get update \
    && apt-get install -y python3 python3-notebook jupyter jupyter-core python3-pip

RUN pip3 install pyzmq bash_kernel
RUN npm i -g ijavascript
RUN ijsinstall
RUN python3 -m bash_kernel.install

RUN apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

RUN curl -fsSL https://get.docker.com -o /get-docker.sh

RUN sh /get-docker.sh

# final comand to run
CMD jupyter notebook /usr/project --ip=0.0.0.0 --allow-root --NotebookApp.token='' --NotebookApp.password=''
