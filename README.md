# culturale-server
Backend NodeJS application that works as an API for Culturale apps.

## Installation instructions manual for developing in React Native and NodeJS

### Linux & Mac Dependencies

### Install brew

**Brew is a package manager that helps you to install software in your computer**

- Open a terminal and input `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

### Install coreutils

**GNU core utils is a collection of many system tools that will be useful to have at some point**

- `brew install coreutils`

### Install node

**NodeJS is the runtime environment that runs on the V8 Javascript engine which is capable of executing Javascript code OUTSIDE the browser (meaning in your computer)**

- `brew install node`
- Check that node is installed correctly using `node -v`, you should see the version installed

### Install NPM

**NPM Stands for Node Package Manager and it is used to manage the dependencies of a node project. Normally all the dependencies of a project will be listed inside a file called package.json, npm can be used to download all the dependencies listed there in order to run a project**
- `npm install -g npm`

### Install yarn

**Yarn is like NPM only better**

- `npm install --global yarn`

### Install Docker and Docker Compose

**Docker is a containerization software. It is capable of wrapping up an application like a NodeJS server and all it's dependencies in a container, which simulates a virtual machine, in order to run the application**

- Install docker using `brew cask install docker`
- Install docker-compose using `brew install docker-compose`

### Install project dependencies

1. Enter to the root directory of the project, where `package.json` is.
2. Type this in your terminal `yarn`.

It will install all the dependencies of the project

### XCode installation - Only for MacOS

1. XCode IDE
`brew install --cask xcode`

2. Xode Command Line Tools
```
xcode-select --install
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

3. Accept XCode license
`sudo xcodebuild -license accept`

4. Cocoapods - Dependency manager for native iOS Applications
`sudo gem install cocoapods`

## Start server and database in local environment

*In order to do this step you should have all the previous dependencies installed*

1. Run the Docker Compose to run the NodeJS application and MongoDB instance
`docker-compose up --build -d`

2. Now, the docker container should be running in background
3. You can stall making calls to `localhost:8080`


## Project architecture
```
├── application
│   ├── controllers
│   │   ├── index.ts
│   │   └── user-controller
│   │       ├── index.ts
│   │       ├── user-controller.interface.ts
│   │       ├── user-controller.test.ts
│   │       └── user-controller.ts
│   ├── index.ts
│   └── use-cases
│       ├── index.ts
│       └── log-in
│           ├── index.ts
│           └── log-in.ts
├── domain
│   ├── entities
│   │   └── index.ts
│   ├── index.ts
│   └── repositories
│       └── index.ts
├── infrastructure
│   ├── database
│   │   ├── database.interface.ts
│   │   ├── database.ts
│   │   └── index.ts
│   ├── index.ts
│   ├── infrastructure.interface.ts
│   └── infrastructure.ts
├── routes
│   ├── index.ts
│   ├── routes.ts
│   └── user-routes.ts
└── server.ts
```
