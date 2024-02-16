FROM oven/bun:1

RUN apt update \
    && apt -y install --no-install-recommends \
    git \
    vim \
    && apt auto-remove -y \
    && apt clean -y \
    && chsh -s $(which bash) bun \
    && echo 'export PS1="\e[01;32m\u\e[m:\e[01;34m\w\e[m\$ "' >> /home/bun/.bashrc

USER bun
