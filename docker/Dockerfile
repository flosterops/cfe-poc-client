# docker build -f docker/Dockerfile .

# build environment
FROM node:14.15.1 as build
COPY . /srv
WORKDIR /srv
RUN yarn install
RUN yarn run build

# production environment
FROM node:14.15.1
WORKDIR /srv
COPY --from=build /srv/package.json /srv/package.json
COPY --from=build /srv/yarn.lock /srv/yarn.lock
COPY --from=build /srv/.next /srv/.next
COPY --from=build /srv/public /srv/public
# TODO: remove --force once going live!
RUN yarn install --production --force
EXPOSE 3000
CMD ["yarn", "start"]
