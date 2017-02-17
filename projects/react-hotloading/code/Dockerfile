FROM tcloud/ubuntu-node:latest

RUN apt-get update && apt-get install -y libcairo2-dev libpango1.0-dev libssl-dev libjpeg62-dev libgif-dev pkg-config

ENV source="."
ENV target="/home/nexboard"
ENV DEV=false

# Default value (can be overridden by build.args.DEV in docker-compose v2)
# ARG DEV=false

EXPOSE 8000

RUN mkdir ${target}

COPY ${source} ${target}

RUN cd ${target} && \
    npm cache clean && \
    (if ${DEV}; then npm install; else npm install --production --no-optional; fi)

RUN cd ${target} && \
    (if ! ${DEV}; then npm run build; fi)

CMD cd ${target} && \
    (if ${DEV}; then echo "Running in development mode"; else echo "Running in production mode"; fi) && \
    (if ${DEV}; then npm start; else npm run start-production; fi) && \
    tail -f /dev/null
