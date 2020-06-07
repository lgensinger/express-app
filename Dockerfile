# use an official runtime as parent image
FROM node

# declare for build
ARG NPM_REGISTRY_URL

# set configs
RUN npm config set -g package-lock false && \
    npm config set -g registry ${NPM_REGISTRY_URL}
    
##########################################################  PROJECT FILES  ##########################################################

# copy all contents into container
COPY . /service

# update directory context
WORKDIR /service

# install dependencies
RUN npm install

##########################################################  RUNTIME CONFIGS  ##########################################################

# app
EXPOSE 3000

# set starting context
ENTRYPOINT ["npm"]

# run app
CMD ["start"]