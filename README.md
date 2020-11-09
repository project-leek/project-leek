# Project leek

One sentence description.

[![CI](https://github.com/project-leek/project-leek/workflows/PR%20Checks/badge.svg)](https://github.com/project-leek/project-leek/actions?query=workflow%3A"PR+Checks")

## Screenshots

![Screenshot](screenshot.jpg)

## Features

* first
* second

## Roadmap

See [Roadmap](https://github.com/project-leek/project-leek/projects/1)

## How to contribute

just follow these steps:
1:	check for open code-reviews and do them if available
2: 	choose an open issues
3:	assign yourself
4: 	create a local branch with name: issue-number (without hash) + "-" + issue-title (e.g. 8-setup-mono-repo)
5: 	codecodecode
6: 	commit + push
7: 	in pull-requests: create pull-request for current changes (from your branch to master) (there should be a button)
8: 	wait for at least 2 other contributers to review your code and for the automated pipeline to finish
9: 	merge your pull-request

## Install for production

```bash
docker pull ...

docker run ...
```

## Development

### Project setup

Checkout project locally. Enter the project folder and run:

```bash
yarn setup
```

### Start for development

Compiles and hot-reloads

```bash
yarn start:app
yarn start:backend
```

### Linting

```bash
yarn lint

yarn lint:fix # auto-fix linting
```

### Typechecking

```bash
yarn typecheck
```

### (Unit-) Testing

```bash
yarn test

yarn test:update # update snapshots
```
