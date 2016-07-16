NODE_VERSION=6.2

NAME=skillz-back
IMAGE_NAME=xebiafrance/$(NAME)

all: build-image

install:
	docker run --rm -t -v $(PWD):/usr/src/$(NAME) -w /usr/src/$(NAME) node:$(NODE_VERSION) npm install

test: install
	docker run --rm -t -v $(PWD):/usr/src/$(NAME) -w /usr/src/$(NAME) node:$(NODE_VERSION) npm test

build-image:
	docker build -t $(IMAGE_NAME) .

push-image:
	docker push $(IMAGE_NAME)