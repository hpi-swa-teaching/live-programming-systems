FROM ubuntu:16.04
MAINTAINER Fabio Niephaus <code@fniephaus.com>

# Install dependencies including Dart
RUN apt-get update
RUN apt-get install -y apt-transport-https curl git
RUN sh -c 'curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -'
RUN sh -c 'curl https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list > /etc/apt/sources.list.d/dart_stable.list'
RUN apt-get update
RUN apt-get install -y dart

ENV PATH /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/dart/bin

RUN git clone https://github.com/fniephaus/sintr_live
RUN cd sintr_live/infrastructure && pub get
RUN cd sintr_live/ui && pub get

EXPOSE 8080
EXPOSE 8990

CMD cd sintr_live && bash ./start_sintr_local.sh demo_shakespeare
