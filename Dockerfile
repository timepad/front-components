FROM node:22-alpine AS deps
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