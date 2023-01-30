# definindo a imagem base
FROM node:15

# definindo a pasta de trabalho a ser criada e focada no acesso
WORKDIR /usr/src/app

# instalando o dockerize para melhorar a inicialização sincronizada dos containers
# RUN apt-get update && apt-get install -y wget
# ENV DOCKERIZE_VERSION v0.6.1
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
