---
layout: post
title: How to architecture and implement Integration Tests for GraphQL BFF API using docker
language: English
permalink: integration-tests-bff-graphql
id: 907
categories:
  - Investigation
  - Workflow Performance
tags:
  - NodeJS
  - BFF Layer
  - GraphQL
date: 2018-07-18 18:00:24
featuredImage: 
  url: featured.png
  width: auto
  height: auto
---

## Introduction
I've been tasked with an interesting one this time. I've to create a **BFF (Backend For Frontends) API**. In this post, I'll go through the **BFF concept**, **BFF technical stack** and also I'll explain in detail how to create integration tests for that **BFF API**.

## BFF (Backend for Frontends)
In a nutshell, **BFF** is built to allow client apps to have **more friendly**, **flexible** and **manageable** API to act as a proxy for the **backend services**.
In a __microservices architecture__ that's quite important as it is also used as a scoped schema for different devices or platforms. For example, we could create a BFF API for `Web`, `Mobile` and `Voice` because each of these need different data and combinations of queries from the microservices.

For example, an App could need interaction with different type of connectors (database, microservices, REST endpoints, external APIs, and so on)

```
App 
 |
 |-> BFF Service 
       |
       |-> Custom Database
       |-> User Account Microservice
       |-> External Weather API
```
                      

## Technical Stack
A **BFF service** can be done in hundred different ways, in my case I chose:
- `NodeJS`
- `babel` as ES6 compiler
- `express` as a webserver
- `morgan` and `winston` as a logger tools
- `helmet` as a Security middleware for express
- `graphql` as SDL (Schema Definition Language)
- `apollo-server-express` as a GraphQL Server middleware for express
- `nodemon` as a dev server reload tool
- `husky` and `lint-staged` as a git hook tool
- `eslint` as a linter tool
- `jest` as a testing framework
- `circleci` as CI tool


## Integration Tests
Integration Tests are really important for the QA of an API. Also, when working on microservices architecture, it is is even more necessary. Normally, when developing big applications it turns out we have 50 different microservices connected between them. As a Integration Test developers we have to make sure we only test our scope of the app (which is our current service). 

In a nutshell, we have inputs and outputs in our BFF layer as well:
> Inputs --> Service --> Outputs

Let's ask some questions I had when started building the Integration Testing Workflow:

- How can we test our API in a **isolated way**?
  - Using `docker`, we can create isolated environment for our API under test and also for the test framework itself.
- How can we test our API using **production-like environment**?
  - Using `docker`, we can create a container with the same configuration as production using `NODE_ENV=production`.
- How can we provide an **easy** and **automated way** to run **our integration tests**?
  - Using `docker-compose`, we can easily create a definition for our docker containers and run our integration tests quickly.
- How can we improve the **manageability and speed** on developing integration tests?
  - Using `jest` snapshots to store the expected result (we save some time writing stubs here). So, we choose `jest` as a testing framework. 
- How can we **mock HTTP responses** for the **external services** that our API calls?
  - Using `mockttp` we can easily mock external services within our tests.
- When mocking external services HTTP responses, **should we mock changing the behavior on the code** or **should we intercept HTTP responses from the external APIs**?
  - Intercept HTTP responses with `mockttp`. Then we run the integration tests in a more similar to production environment. That means we test the whole workflow: graphql server, resolvers and data sources.
- Are we going to use **Cucumber** and **Gherkin**?
  - `Gherkin` is high level language used on BDD (Behavior Driven Development) helping other stakeholders to define requirements. That is more used for end to end tests than integration tests.
- **How many integration tests** should we write when testing GraphQL Server?
  - I'm still working on the best approach here, but some ideas:
    - Create one file for each query defined on Query schema.
    - Write tests for queries on all levels of the GraphQL Schema.
    - Write tests for error queries which will result on a GraphQL Schema error.
- How can we mock the behavior of a **Custom Database**?
  - If you require database queries, use `docker-compose` to run your local database with `seeds`.


### Integration Test Stack
- `NodeJS`
- `docker` as container service
- `docker-compose` as a admin tool for docker
- `mockttp` as HTTP mock server and proxy  
- `jest` as testing framework (snapshots included)
- `apollo-boost` as apollo client


### Requirements
- NodeJS **version ^8.11.3**
- `docker`
- `docker-compose` **schema version 3.6**

### Architecture
Integration Tests are going to run in `docker` containers in order to have similar to production environment in which to run tests.
```
my-bff-service (container)
    - API under test
    - Listening on 5555

integration-tester (container)
    - Call voice-bff API
    - Use `mockttp` to mock external services calls
        - Listening on 8888
```

### Structure
```
my-bff-service
├── test
│   └── integration                         # Integration Test folder for BFF
│       ├── endpoints                       # Tests folder for endpoints (GraphQL methods)
│       │   ├── __snapshots__               # jest snapshots folder (API output snapshots)
│       │   │      └── <name>.test.js.snap  # One snapshot file for each test file
│       │   └── <name>.test.js              # Test files written in JS (jest)
│       ├── queries                         # GraphQL queries to import in our tests
│       │   └── <method>.<param>.gql        # Name queries files with name of the query + params
│       ├── stubs                           # Stubs for external services called in our API under test (mockttp)
│       │   └── <external-API-Name>         # Create a folder for each API to mock
│       │       └── <path>.json             # Create a mock for each path or different query
│       ├── .babelrc                        # jest is using babel behind scenes
│       ├── .dockerignore                   # files to be ignored by docker
│       ├── docker-compose.yml              # docker-compose file where containers will be defined
│       ├── Dockerfile                      # Dockerfile definition for integration-tester container
│       ├── integration.env                 # environment variables used for integration testing
│       ├── package.json                    # integration-tester is a separate project to run in docker 
│       └── test.sh                         # script to automate docker containers creation and execution
├── .dockerignore                           # files to be ignored by docker 
├── Dockerfile                              # Dockerfile definition for my-bff-service container
└── src                                     # BFF Application (GraphQL Server)
```

## Running Tests: Development Mode
On development mode, we will need `watch` mode for test files and API under test. That means is not ideal to develop tests using the `docker` workflow because it would be so slow. We are going to use our local development server configured for integration tests + running our tests locally. After developing the tests, then we will test using the containers architecture.

There are two steps to run integration tests in development mode:

1. Start BFF on Integration Test mode
```sh
cd <root of the project>
npm run dev:integration-tester
```
> Note: Running using dev config is going to restart the server is we do some changes.

2. Run Integration Tests locally
```sh
cd ./test/integration
npm install
npm run test -- --watch
```
> Note: Running jest on watch mode is going to restart the test result each time we save changes.


## Running Tests: Production-like Mode
That's the moment of the truth. We will be running our tests inside of a docker container against our API under test which also is going to be inside of other docker container. Then we have isolated environments. 

```sh
cd <root of the project>
sudo npm run test:integration
```

OR

```sh
cd ./test/integration
sudo ./test.sh
```
> Note: Run commands with sudo because docker-compose requires it.

## Docker help
- Build and Run docker-compose definition
    ```
    sudo docker-compose up --build
    ```
- Stop and Remove docker-compose containers, images, networks, ...
    ```
    sudo docker-compose down --rmi 'local'
    ```
- Remove non-used docker images
    ```
    sudo docker image prune -fa
    ```
- See all docker images
    ```
    sudo docker images -a
    ```

## TODO
- Use [snapstub](https://github.com/ruyadorno/snapstub) to automate the creation of stubs for external services mocks

