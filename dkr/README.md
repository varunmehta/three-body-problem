# All things `docker`

We are running a local [docker-compose](https://docs.docker.com/compose/) setup, consisting of [pact-broker](https://hub.docker.com/r/pactfoundation/pact-broker), [sonarqube](https://hub.docker.com/_/sonarqube/), [postgres](https://hub.docker.com/_/postgres) & [jenkins](https://hub.docker.com/r/jenkinsci/blueocean), there are some init scripts and helper scripts to make life easier when using it. All those are parked here.

## `docker-annihilation.sh`
As the name righty says;

> **an·ni·hi·la·tion** (*n*): complete destruction or obliteration.

This is a master script which does the following;

* `docker stop $(docker ps -aq)` stop all docker process
* `docker rm $(docker ps -aq)` remove all dangling process
* `docker network prune -f` remove all networks
* `docker rmi -f $(docker images --filter dangling=true -qa)` remove any dangling images
* `docker volume rm $(docker volume ls --filter dangling=true -q)` remove all volumes

Use this very carefully, you might clear out all your docker processes and instances, even if you did not intend to.

## `docker-entrypoint-initdb.d`
To save memory and not having to maintain multiple separate `postgres` docker databases for sonarqube & pact-broker, trying to run one db for both. Postgres docker image does not support multiple dbs out of the box, there is workaround proposed for it. https://hub.docker.com/_/postgres/

The script creates two users, `sonar` & `pact`, and their respective dbs which are then used by each of the docker instances..
