
![Logo](https://github.com/sarthakpriyadarshi/gnome-panel-genmon-vpnip/blob/master/images/Kali%20Track.png?raw=true)


# Kali Track
![App Screenshot](https://github.com/sarthakpriyadarshi/gnome-panel-genmon-vpnip/blob/master/images/ip%20display.png?raw=true)
I am one of those who was pursuing OSCP and loves Gnome, when Kali moved to XFCE, i wanted to move to XFCE but can't. One of the features that XFCE Kali Linux offered was Displaying of VPN IP Address that you can click and copy while working in the lab. It's kind of hard and monotonous when it comes to find your own ip address when trying to get a reverse shell.

So, I created this Gnome Extension that displays the VPN IP address in the top bar when a VPN connection is active at the same time you can click to copy the IP address to the clipboard. 

## Gnome 48 Update

![Gnome 48 Update](https://github.com/sarthakpriyadarshi/gnome-panel-genmon-vpnip/blob/master/images/Gnome%2048.png?raw=true)

## Run Locally

Clone the project

```bash
  git clone https://github.com/sarthakpriyadarshi/gnome-panel-genmon-vpnip
```

Copy the Extension

```bash
  cp -R gnome-panel-genmon-vpnip ~/.local/share/gnome-shell/extensions/top-panel-genmon-vpnip@cyberol.codes
```

### Restart Gnome Shell

![Restart Gnome Shell](https://github.com/sarthakpriyadarshi/gnome-panel-genmon-vpnip/blob/master/images/restart%20gnome-shell.png?raw=true)

```bash
  Alt + F2
```
Type

```
  r
```

### Enabling the Extension

![Enabling Extension](https://github.com/sarthakpriyadarshi/gnome-panel-genmon-vpnip/blob/master/images/enable.png?raw=true)

```bash
  gnome-extensions list
```

```bash
  gnome-extensions enable gnome-panel-genmon-vpnip@cyberol.codes
```

### Disabling the Extension

```bash
  gnome-extensions disable gnome-panel-genmon-vpnip@cyberol.codes
```
## Authors

- [@sarthakpriyadarshi](https://www.github.com/sarthakpriyadarshi)


## License

[MIT](https://github.com/sarthakpriyadarshi/gnome-panel-genmon-vpnip/blob/master/LICENSE)
