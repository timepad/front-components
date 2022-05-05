FROM cr.yandex/crpt7n2li2drrrf292dl/node:14.18-buster-slim as deps

RUN apt-get update \
    && apt-get install --no-install-recommends -y git openssh-client ca-certificates

RUN npm install --legacy-peer-deps
RUN npm run build-storybook
CMD npm run storybook
