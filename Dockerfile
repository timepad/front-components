FROM cr.yandex/crpt7n2li2drrrf292dl/node:12.16.3-buster-slim as deps
RUN apt-get update \
    && apt-get install --no-install-recommends -y git openssh-client ca-certificates

WORKDIR /front-components

COPY . .

#install fonts
RUN REPO=$(cat package.json| grep front-shared | awk '{print $2}' | sed 's/,//g' | sed 's/"//g') && \
    echo $REPO && \
    npm install git+$REPO && \
    cat package.json | sed '/front-shared/d' > tmpfile && mv tmpfile package.json

RUN npm install --legacy-peer-deps
RUN npm run build-storybook

CMD npm run storybook