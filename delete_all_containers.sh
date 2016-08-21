#!/bin/bash
docker rm $(docker ps -a -q) -f
