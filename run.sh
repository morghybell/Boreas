#!/bin/sh

chromium http://0.0.0.0:8080/Home.html && python3 -m http.server 8080

