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

## Contributing

[How to contribute](CONTRIBUTING.md)

## Install for production

```bash
docker pull ...

docker run ...
```

## Packages

This repository is based on following packages:

- `app`: A PWA / web-ui to manage nfc-tags and their corresponding songs. // TODO
- `backend`: A backend responsible for ... // TODO
- `commons`: A shared library for common types, classes and funcitonality
- `nfc-reader`: A package to read nfc-tags from a usb-nfc-reader and send them to a running backend

## Development

### Project setup

> Hint: If using WSL make sure that you place the project files in the linux filesystem and do NOT mount them from Windows as this leads to some problems with build performance and file-watching.
Otherwise, Node is so slow that it is hardly possible to work

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
