NODE_VERSION=6.2

NAME=xskillz-web
IMAGE_NAME=xebiafrance/$(NAME)

all: test build-image

install:
	docker run --rm -t -v $(PWD):/usr/src/$(NAME) -w /usr/src/$(NAME) node:$(NODE_VERSION) npm install

test: install
	docker run --rm -t -v $(PWD):/usr/src/$(NAME) -w /usr/src/$(NAME) node:$(NODE_VERSION) npm test

package: test
	docker run --rm -t -v $(PWD):/usr/src/$(NAME) -w /usr/src/$(NAME) node:$(NODE_VERSION) npm run build:production

build-image:
	docker build -t $(IMAGE_NAME) .

push-image:
	docker push $(IMAGE_NAME)