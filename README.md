cactus-boilerplate
==================

A standard boilerplate for use with Cactus

## Installation Steps

1. Download/Clone this repo (duh)
2. `cd` to the directory, and run `npm install`
3. Run `gulp` in terminal
4. Tinker away to your little heart's content.

## Troubleshooting

If you get an error saying that the port 8000 is currently in use, follow these steps

1.	Type `lsof -i tcp:8000` where `8000` is the name of the port you're trying to access
2.	This gives a list of processes running on this port, it'll usually look like this
	1.	```
		COMMAND&nbsp;&nbsp;PID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;USER&nbsp;&nbsp;&nbsp;FD&nbsp;&nbsp;&nbsp;TYPE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DEVICE SIZE/OFF&nbsp;NODE&nbsp;NAME
		```
		```
		Python&nbsp;&nbsp;5387&nbsp;fueledldn2&nbsp;&nbsp;&nbsp;&nbsp;3u&nbsp;&nbsp;IPv4&nbsp;0x1c99874475f23a4f&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0t0&nbsp;&nbsp;TCP&nbsp;*:irdmi&nbsp;(LISTEN)
		```
3.	Take a note of the `PID`, and run `kill -9 5387` where `5387` is the `PID` value