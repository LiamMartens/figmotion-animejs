#/bin/bash
docker run -p 1234:1234 --user=$(id -u):$(id -u) -itv $(pwd):/app -w /app node:stretch $@