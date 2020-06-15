# Docker

## Docker Desktop

Docker Desktop is an application for MacOS and Windows machines for the building and sharing of containerized applications

## Docker Hub

For developers and those experimenting with Docker, Docker Hub is your starting point into Docker containers. Create an account and start exploring the millions of images that are available from the community and verified publishers.

## Why Do You Need Docker?

- Comaptibility/Dependency
- Long setup time
- Different Dev/Test/Prod environments

With Docker, you are able to run each component (webserver, database, etc) in their own containers with their own dependancies and their own libraries on separate machines with a simple docker command.

- Containerize Applications
- Run each service with it;s own dependencies in separate containers

## What are containers?

Are completely isolated environments - they have their own processes, services, their networking interfaces, and mounts except they share the same OS Kernel. Containers have been around for about 11 years.

An OS Kernel is a computer program at the core of a computer's operating system with complete control over everything in the system.

## Operating systems

All operating systems consist of the same (2) things. An os kernel and a set of software. The kernel is responsible for interacting the with underlying hardware. While the kernel is the same (Linux), the software above is what makes them different. Software consistens of different file mangers, compilers, UI, drivers, developer tools, etc.

If we have docker installed on Ubuntu system...

Docker
OS - Ubuntu

As long as docker has the same kernal, it can run any flavor of OS, expect windows. You won't be able to run a windows based container on a docker host with Linnux on it. For that, it would require docker on a windows server.

Docker is not meant to virtualize and run different operating systems on the same hardware. The main purpose for Docker is to package and containerize applications and to ship them and run them anywhere and as many times as you want.

## Containers vs Virtual Machines

VM

## Hardware Infrastructure

## Hypervisor

Virtual Machine
Application
Libs | Deps
OS

Container

## Hardware Infrastructure

## OS

## Docker

Container
Application
Libs | Deps

Docker is more consumes less diskspace, consume less resources, and have a faster bootup time.

VMs have more isolation than Docker.

## How is it done?

Most organizations have containerized images available on the docker hub. Once you identify the images you need all you need to do is:

`docker run ansible`
`docker run mongodb`
`docker run redis`

..etc

If you need to run multiple at the same time, configure a load balancer.

## Docker Image

A Docker image is a private filesystem, just for your container. It provides all the files and code your container will need. Running the docker build command creates a Docker image using the Dockerfile. This built image is in your machine's local Docker image registry.

## Image vs Container

A Docker Image is a package, template, or plan used to create 1 or more containers

Containers are running instances of images that are isolated that have their own environemnts and set of processes.

Docker helps DevOps and Engineers work hand in hand.

## Getting Started w/ Docker

Community Edition and Enterprise Edition

[tutorial](https://docker-curriculum.com/)

`docker run hello-world`

When you call `run`, the Docker client finds the image, loads up the container and then runs a command in that container.

`docker ps`

Shows you what containers are currently running

`docker ps -a`

Shows you a list of containers you ran

## Busy Box

`docker run -it busybox sh`

Brings us to an interactive tty ()

`docker run --help`

## Deleting Containers

`docker ps -a`

then...

`docker rm {instanceId}`

A good rule of thumb is to clean up your containers as you're done with them

Deletes all of them:

`docker rm $(docker ps -a -q -f status=exited)`

In later versions, `docker container prune` command can be used to achieve the same effect.

`docker container prune`
`WARNING! This will remove all stopped containers.`
`Are you sure you want to continue? [y/N] y`
`Total reclaimed space: 0B`

## Terminology

- Images - The blueprints of our application which form the basis of containers. In the demo above, we used the `docker pull` command to download the busybox image.
- Containers - Created from Docker images and run the actual application. We create a container using `docker run` which we did using the busybox image that we downloaded. A list of running containers can be seen using the `docker ps` command.
  Docker Daemon - The background service running on the host that manages building, running and distributing Docker containers. The daemon is the process that runs in the operating system which clients talk to.
- Docker Client - The command line tool that allows the user to interact with the daemon. More generally, there can be other forms of clients too - such as Kitematic which provide a GUI to the users.
- Docker Hub - A registry of Docker images. You can think of the registry as a directory of all available Docker images. If required, one can host their own Docker registries and can use them for pulling images.

## Web Apps w/ Docker

### Static Sites

`docker run --rm prakhar1989/static-site`

The `--rm` flag deletes the container after exiting

`docker run -d -P --name static-site prakhar1989/static-site`

The `-d` flag will detach our terminal, `-P` will publish all exposed ports to random ports and finally `--name` corresponds to a name we want to give.

`docker port static-site`

returns ports:

`80/tcp -> 0.0.0.0:32769`
`443/tcp -> 0.0.0.0:32768`

Or you can specify a port:

`docker run -p 8888:80 prakhar1989/static-site`

### Creating Your Own Docker Images

Get a list of images that are available locally

`docker images`

The `TAG` refers to a particular snapshot of the image and the `IMAGE ID` is the corresponding unique identifier for that image.

For simplicity, you can think of an image in similar fashion to a git repository - images can be committed with changes and have multiple versions. If you don't provide a specific version number, the client defaults to `latest`.

Pull a specific verison:

`docker pull ubuntu:18.04`

Search for docker images on the command line:

`docker search`

An important distinction to be aware of when it comes to images is the difference between base and child images.

- Base images are images that have no parent image, usually images with an OS like ubuntu, busybox or debian.

- Child images are images that build on base images and add additional functionality.

- Official images are images that are officially maintained and supported by the folks at Docker. These are typically one word long. In the list of images above, the python, ubuntu, busybox and hello-world images are official images. `OFFICIAL` column is flagged with `OK`

- User images are images created and shared by users like you and me. They build on base images and add additional functionality. Typically, these are formatted as `user/{imageName}`.

### Dockerfile

A `Dockerfile` is a simple text file that contains a list of commands that the Docker client calls while creating an image. It's a simple way to automate the image create process. The best part is that the commands your write in a `Dockerfile` are almost identical to their linnux equivalent.

### Creating a Dockerfile

Start with specifying our base image. Use the `FROM` keyword to do so:

`FROM python:3`

Next, we write the commands of copying the files and installing the dependancies. First, we set a working directory and then copy all files for our app

`WORKDIR /usr/src/app`

`COPY . .`

Now, that we have the files, we can install the dependencies

`RUN pip install --no-cache-dir -r requirements.txt`

Specify a PORT

`EXPOSE 5000`

The last step is to write the command for running the application

`CMD ["python", "./app"]`

The primary purpose of CMD is to tell the container which command it should run when it is started

Now that the `Dockerfile` is complete, we can build our image.

`docker build -t {username}/{imageName} .`

Go to the port to check if it is running locally.

## Docker Push

`docker login`

`docker push ${yourusername}/catnip`

## Deploy To Elatic BeanStalk (AWS)

From the UI, simpley upload the `Dockerrun.aws.json`
