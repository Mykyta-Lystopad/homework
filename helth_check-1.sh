#!bin/bash

response=$(curl -I -s http://192.168.0.139:4200 | grep -i 'HTTP/1.1' | cut -d' ' -f2)

echo $response