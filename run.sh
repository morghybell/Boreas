#!/bin/sh

URL="http://localhost:8080/Home.html"

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open -a "Safari" "$URL"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    chromium "$URL"
else
    echo "Unsupported platform: $OSTYPE"
    exit 1
fi

alacritty -e bash -c "cd access; ./run.sh" &
alacritty -e bash -c "cd server; ./run.sh" &
alacritty -e bash -c "python3 -m http.server 8080" &

