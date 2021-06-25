# PeakonAssignment ( Bonus tasks included )

Build on `Angular` 10.2.5

`No` external libraries used ( no bootstrap or angular flex as they should be used, this is purely to remove all external dependancies for the purpose of the interview )

## Architectural choices

A Manager service has been created, that supplies the data to the view.

1 Component has been created ( `app/live-search` ) that handles the view. Note: unit test files are in .spec.ts

1 Service has been created ( `app/services/manager.service` ) that can supply any view with the Managers data via an Observable

For each "employee" entry from the json data a Managers model has been created.

Each model has 2 additional fields in its attributes, merged from the "accounts" type data:

- `search`: this field is used during the searching part as it consolidates first name and last name without space
- `email`: adds the missing email from `accounts` type data

## Run Development server and build the application

Run `npm install` to install the node dependencies.

Run `npm run ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app should be build and the select menu should be visible on the top left

## Build ( only builds the application )

Run `npm run ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
This will run a test server at http://localhost:9876/

`Notes`: unit test files are with .spec.ts extension. And you might need chrome if you want visual confirmation that they passed
