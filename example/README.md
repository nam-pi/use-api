# NAMPI useApi example app

## Prerequisites

A running instance of a NAMPI Api with Api and Auth endpoint is required. Please take a look at the [backend repository](https://github.com/nam-pi/backend) to learn how to achieve this. The NAMPI useApi needs to be built in the `dist` folder. This can be done by using `yarn watch` in the root directory.

## Installation

The dependencies of the app need to be installed using `npm install` or `yarn install`.

## Environment

The app needs several environment parameters to be set:

| Name             | Example                    | Description                                   |
| ---------------- | -------------------------- | --------------------------------------------- |
| REACT_APP_API    | http://localhost:4000      | The API endpoint                              |
| REACT_APP_AUTH   | http://localhost:8080/auth | The authentication endpoint                   |
| REACT_APP_CLIENT | nampi-website              | The client id configured in the auth endpoint |
| REACT_APP_REALM  | nampi                      | The realm configured in the auth endpoint     |

## Startup

The app can be started with `npm start` or `yarn start`.
