# NodeJs, Typescript, TDD, SOLID

# Gostack BootCamp

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]


Clean Architecture for node.js projects

## Folder Structure

```
├── src
│   ├── @types                              # typing file            
│   ├── config                              # configuration files eg: cahe, email, upload etc ...
│   ├── modules
│   │   ├── appointments              
|   |   |    ├── dtos                       # data object transporter files
|   |   |    ├── infra                      # domain infrastructure layer
|   |   |    |    ├── http
|   |   |    |    |    ├── controllers
|   |   |    |    |    └── routes
|   |   |    |    ├── typeorm
|   |   |    |    |    ├── entities
|   |   |    |    |    └── respositories
|   |   |    ├── repositories
|   |   |    |    └── fakes
|   |   |    └── services
│   │   ├── notifications
|   |   |    ├── dtos                        # data object transporter files
|   |   |    ├── infra                       # domain infrastructure layer
|   |   |    |    ├── http                   
|   |   |    |    |    ├── controllers
|   |   |    |    |    └── routes
|   |   |    |    ├── typeorm
|   |   |    |    |    ├── respositories
|   |   |    |    |    └── schemas
|   |   |    ├── repositories
|   |   |    |    └── fakes
|   |   |    └── services
│   │   └── users
|   |        ├── dtos                        # data object transporter files
|   |        ├── infra                       # domain infrastructure layer
|   |        |    ├── http
|   |        |    |    ├── controllers
|   |        |    |    └── routes
|   |        |    ├── typeorm
|   |        |    |    ├── entities
|   |        |    |    └── respositories
|   |        ├── repositories
|   |        |    └── fakes
|   |        └── services
│   └── shared
|        ├── container                        # responsible for the inversion of dependency
|        |    └── providers                   # external integration providers
|        |         ├── CacheProvider
|        |         |    ├── fakes
|        |         |    ├── implementations
|        |         |    ├── models
|        |         ├── MailProvider
|        |         |    ├── dtos
|        |         |    ├── fakes
|        |         |    ├── implementations
|        |         |    ├── models
|        |         ├── MailTemplateProvider
|        |         |    ├── dtos
|        |         |    ├── fakes
|        |         |    ├── implementations
|        |         |    ├── models
|        |         └── StorageProvider
|        |              ├── fakes
|        |              ├── implementations
|        |              └── models
|        ├── errors
|        └── infra
|             ├── http
|             |    ├── middlewares
|             |    └── routes
|             └── typeorm
|                  └── migrations
└── tmp

```


## Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)
Install [yarn] (https://classic.yarnpkg.com/en/docs/install/#debian-stable)
Install [docker] (https://docs.docker.com/get-docker/)

### Install

- Install all dependencies with `yarn install or npm install`

### Running in dev mode

- Run `yarn dev:server` 
### Running test
- Test Unit `yarn test`
### Running docker DB container
- Docker postgres container `yarn docker:postgres`
- Docker mongo container `yarn docker:mongo`
- Docker redis container `yarn docker:redis`

- The server address will be displayed to you as `🚀 Runing service in route: http://localhost:3333`



