# culturale-server
Backend NodeJS application that works as an API for Culturale apps.

## Installation instructions manual for developing in React Native and NodeJS

### General programs

- Install Android Studio
- Install XCode if you own a MacOS

### Linux & Mac Dependencies

#### Install brew

*Brew is a package manager that helps you to install software in your computer **

- Open a terminal and input `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

#### Install coreutils

**GNU core utils is a collection of many system tools that will be useful to have at some point**

- `brew install coreutils`

#### Install node

** NodeJS is the runtime environment that runs on the V8 Javascript engine which is capable of executing Javascript code OUTSIDE the browser (meaning in your computer) **

- `brew install node`
- Check that node is installed correctly using `node -v`, you should see the version installed

#### Install NPM

**NPM Stands for Node Package Manager and it is used to manage the dependencies of a node project. Normally all the dependencies of a project will be listed inside a file called package.json, npm can be used to download all the dependencies listed there in order to run a project**
- `npm install -g npm`

#### Install yarn

**Yarn is like NPM only better**

- `npm install --global yarn`

#### Android installation

1. Android Studio
```
brew install --cask adoptopenjdk8
brew install --cask android-studio

touch ~/.android/repositories.cfg
sdkmanager --update
sdkmanager "platform-tools" "platforms;android-28"
```

Add this env variable to your system to configure Android Studio

`export ANDROID_HOME=/usr/local/share/android-sdk/`

2. Android Platform tools (adb)
```
brew install --cask android-platform-tools
brew install bundletool
```

#### XCode installation

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
