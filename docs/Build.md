# How to build your own leek-box?

This guide should help everybody to build and setup an own version of the leek-box.

## Raspberry PI

We mainly use a Raspberry PI as the computing device behind the leek-box.

### Wifi

To simplify the setup of the PIs wifi we recommend the [comitup](https://github.com/davesteele/comitup) library by davesteele.

#### Installation

1. Install `comitup` from the PPA as described by [this](https://davesteele.github.io/comitup/ppa.html) guide.

1. Then setup `comitup` like done by [this](https://github.com/davesteele/comitup/wiki/Installing-Comitup) guide.

1. Edit the `/etc/comitup.conf` file and set the following values:
    ```conf
    ap_name=leek-<nnn>
    ```

1. Finally reboot the PI.

### Install docker

TBD

#### NFC-Reader container setup

This container is used as an interface between the USB-NFC-Reader and the backend.

TBD

#### Backend container setup

This container is the actual backend which is used by the leek-boxes app.
It has an websocket and REST interface to manage the database which holds all data of the app.

TBD