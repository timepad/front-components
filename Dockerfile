FROM cr.yandex/crpt7n2li2drrrf292dl/node:14.18-buster-slim as deps
ARG SSH_KEY
RUN apt-get update \
    && apt-get install --no-install-recommends -y git openssh-client ca-certificates

ADD ./* /
# Authorize SSH Host
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh && \
    ssh-keyscan github.com > /root/.ssh/known_hosts

# Add the keys and set permissions
RUN echo "${SSH_KEY}" > /root/.ssh/id_rsa >&1 && \
    chmod 600 /root/.ssh/id_rsa

RUN npm install --legacy-peer-deps
RUN ls
RUN npm run build-storybook

# Remove SSH keys
RUN rm -rf /root/.ssh/

CMD npm run storybook
