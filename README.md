# culturale-server
Backend NodeJS application that works as an API for Culturale apps.


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
