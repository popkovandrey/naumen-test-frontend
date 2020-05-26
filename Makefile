install:
	npm install

lint:
	npx eslint .

develop:
	npx webpack-dev-server

build:
	rm -rf dist
	NODE_ENV=production npx webpack

start:
	heroku local -f Procfile.dev
