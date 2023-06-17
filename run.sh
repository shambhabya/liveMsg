#!/bin/bash

node server.js

open "https://localhost:3000"
open "https://localhost:3000/display.html"

xdg-open https://localhost:3000
xdg-open https://localhost:3000/display.html

osascript -e 'tell application "Safari" to open location "https://localhost:3000"'
osascript -e 'tell application "Safari" to open location "https://localhost:3000/display.html"'

