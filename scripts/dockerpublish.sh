#!/bin/bash
echo Executing after success scripts on branch $TRAVIS_BRANCH

DOCKER_ENV=''
DOCKER_TAG=''
case "$TRAVIS_BRANCH" in 
    "master")
    DOCKER_ENV=production
    DOCEKR_TAG=latest
    ;;
    "develop")
    DOCKER_ENV=development
    DOCKER_TAG=dev
    ;;
esac

docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker build -t $DOCKER_USERNAME/tobenorme-ng-app .
# docker tag $DOCKER_USERNAME/tobenorme:$DOCKER_TAG
docker push $DOCKER_USERNAME/tobenorme-ng-app:$DOCEKR_TAG