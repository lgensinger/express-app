# Express Web Application

Node/Express web application.

## System Requirements

1. docker
1. git

## Environmental Variables

The following values need to be configured in the environment **prior** to running the commands below.

1. NODE_ENV
1. NPM_REGISTRY_URL
1. SOME_VALUE_FROM_ENVIRONMENT

---

## Quickstart

### Actively Develop the Application

```bash
# clone project
git clone https://github.com/lgensinger/express-app.git

# update directory context
cd express-app

# build image
docker build \
  --build-arg NPM_REGISTRY_URL=${NPM_REGISTRY_URL} \
  -t myimage \
  .

# run container
docker run \
  --rm \
  --name mycontainer \
  --env-file env_file \
  -p 3000:3000 \
  -v $(pwd)/app:/service/app \
  myimage
```

### Unit Test

```bash
# clone project
git clone https://github.com/lgensinger/express-app.git

# update directory context
cd express-app

# build image
docker build \
  --build-arg NPM_REGISTRY_URL=${NPM_REGISTRY_URL} \
  -t myimage \
  .

# run container
docker run \
  --rm \
  --env-file env_file \
  myimage \
  run test
```