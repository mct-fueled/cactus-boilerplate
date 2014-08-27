cactus-boilerplate
==================

A standard boilerplate for use with Cactus

## Installation Steps

- Download/Clone this repo (duh)
- `cd` to the directory, and run `npm install`
- Run `easy_install pip; pip install -r requirements.txt`
- Run `gulp` in terminal
- Tinker away to your little heart's content.


## Troubleshooting

If you get an error saying that the port 8000 is currently in use, follow these steps

1.	Type `lsof -i tcp:8000` where `8000` is the name of the port you're trying to access
2.	This gives a list of processes running on this port, it'll usually look like this
	1.	![Screenshot of terminal](/terminal.png?raw=true "Screenshot of Terminal")
3.	Take a note of the `PID`, and run `kill -9 5387` where `5387` is the `PID` value
