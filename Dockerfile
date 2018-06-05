FROM python:latest

LABEL maintainer="knut.schlesselmann@fortis-it.de oliver.kaak@acando.de"

WORKDIR /usr/src/app

COPY . .

RUN ./setup.sh --no-venv


CMD [ "python", "./run.py" ]
