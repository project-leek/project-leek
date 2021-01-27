# Development

## Contributing

[How to contribute](CONTRIBUTING.md)

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

Checkout project locally.

```bash
git clone https://github.com/project-leek/project-leek/
# git clone git@github.com:project-leek/project-leek.git
```

Enter the project folder and run:

```bash
yarn setup
```

### Edit config

Copy `.env.sample` to `.env` and change the values to your needs.

### Start for development

Compile and watch file changes with hot-reloading:

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
```
