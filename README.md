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

Compiles and watches files changes with hot-reloading

```bash
yarn start:app # build and watch app
yarn start:backend # build and watch backend
yarn start:commons # build and watch shared commons library
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
