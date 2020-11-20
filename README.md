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

### For externals

TBD 🤔

### For official team members

Always check for open [code-reviews](https://github.com/project-leek/project-leek/pulls?q=is%3Aopen+is%3Apr+type%3Apr+review%3Arequired) and do them if available before you start with a new issue.

#### How to start with a new issue

1. choose an open issues from the [project boards Todo column](https://github.com/project-leek/project-leek/projects/1)
1. 👉🏾 assign the issue to yourself
1. At the moment you assign the issue, a local branch with an auto-generated title will be created for you.
1. 👨🏾 👩🏾 ✍🏾 💻 ☕  (start coding)
1. ⬆️ commit + push
1. in [pull-requests](https://github.com/project-leek/project-leek/pulls): create pull-request for current changes (from your branch to master) (there should be a button)
1. 🕙 wait for at least 2 other contributors to review your code and for the automated pipeline to finish
1. 🥗 merge your pull-request
1. 😃 be happy to be a part of this project
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
