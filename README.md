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

