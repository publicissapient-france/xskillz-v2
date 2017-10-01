NODE_VERSION=6.2

NAME=skillz-web
IMAGE_NAME=xebiafrance/$(NAME)

all: package build-image

install:
	npm install

test: install
	npm test

nodesass: test
	npm rebuild node-sass

package: nodesass
	npm run build:production

build-image:
	docker build -t $(IMAGE_NAME) .

push-image:
	docker push $(IMAGE_NAME)

clean:
	docker rmi -f $(docker images | grep "^<none>" | awk "{print $3}")