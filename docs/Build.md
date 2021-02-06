# How to build your own leek-box?

This guide should help everybody to build and setup an own version of the leek-box.

## What do you need?
* Raspberry PI
* SD-Card
* HDMI-Cable
* Power-Cable
* Lan-Cable
* NFC-Reader

## Setting up the Raspberry PI
Since the Raspberry is ideally hidden in a fancy box, it is recommended to install the Raspberry Pi OS Lite. This saves resources, as no graphical user interface needs to be rendered if no monitor is connected to it most of the time anyway.

### Making the SD card bootable
* Download the Raspberry Pi Imager https://www.raspberrypi.org/software/
* choose os -> Raspberry Pi OS (other) -> Raspberry Pi OS **Lite**
* choose SD Card and start writing

After the Raspberry Pi Imager is ready, the SD card can be plugged into the back of the PI. It now needs to be connected to power, LAN, a monitor and a keyboard.

### Connecting the PI
When the Raspberry PI is now fully connected, you should be able to log in for the first time. The default login data  is as follows: </br>
  ```json
  user: pi
  password: raspberry
  ```
⚠️ The default keyboard setting is English.
Europeans must therefore watch their z.

Connect the Pi to the WLAN:
For the next steps, it is easiest if we connect to the PI via a computer in order to be able to work through the following instructions as quickly as possible. Therefore, we recommend connecting the PI via LAN and establishing an SSH connection.

Activate SSH: <br>
```linux
  sudo systemctl enable ssh
  sudo systemctl start ssh
```
Connecting to the Pi <br>
To obtain the PI's ip address run
```
ifconfig
```
and connect with a ssh-client like [vsCode](https://www.hanselman.com/blog/visual-studio-code-remote-development-over-ssh-to-a-raspberry-pi-is-butter)

### Wifi setup via configuration hotspot
Now that we can comfortably copy and paste commands onto the raspberry, let's get down to the actual wifi setup.


1. Add the comitup repo as instructed [here](https://davesteele.github.io/comitup/ppa.html)
2. prepare the pi for the service with
```
sudo rm  /etc/wpa_supplicant/wpa_supplicant.conf
sudo systemctl disable systemd-resolved
```
3.  replace the  line '# ap_name: comitup-<nn>' with 'ap_name: leek-<nn>'
```
sudo nano /etc/comitup.conf
```
4. restart the PI

After the restart, a new wifi should be available with the name "leek-"....
Now connect to the WLAN and follow the prompt to log on to the network or navigate manually to http://10.41.0.1/

In the new screen, you can now connect to your home WLAN. Every time the box is powered on and does not find a registered Wi-Fi, it will open its configuration hotspot again.
However, if it finds a known WLAN, the hotspot will be closed and the Pi will use the available WLAN.

Finally, with a new ifconfig, we find out the new WLAN IP address, which we will use to address the Pi in the future and set up the box.


### Install docker and docker compose
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt-get install -y libffi-dev libssl-dev
sudo apt-get install -y python3 python3-pip
sudo apt-get remove python-configparser
sudo pip3 -v install docker-compose
```
get-docker can take quite a while on older Pi's. <br>
After the process is complete run 'docker-compose' to check if the installation was successfull.


## Setup the Leek-Box

Our project is split into multiple docker containers. One Container to handle the events of your NFC-Reader and one container to host the backend. For seamless setup of both, please use our docker-compose file as follows:

```bash
mkdir leek && cd $_ ```

curl --remote-name https://gist.githubusercontent.com/anbraten/40db2d35b1788714b6899b2e01057597/raw/746935ae596ee0b0331f1c259e4c52909f97ae30/docker-compose.yml```

curl --remote-name https://gist.githubusercontent.com/anbraten/40db2d35b1788714b6899b2e01057597/raw/746935ae596ee0b0331f1c259e4c52909f97ae30/.env
```

In the newly created folder there is now an `.env` file that has to be adjusted with your personal Spotify-Client-ID, Spotify-Client-Secret. You can gather those by following this [guide](https://developer.spotify.com/documentation/general/guides/app-settings/)

**AFTER** you set your id in the env file, your leek your leek-box ist now ready to use.
For further instructions look here: [User Guide](./Usage.md)
