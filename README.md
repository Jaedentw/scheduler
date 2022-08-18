# Interview Scheduler

This website was created to work as an interview scheduler for the Lighthouse Labs mentors and students. When creating an appointment you may enter a student's name and select an interviewer from the list provided. The days are locked to 5 slots with an ending time of 5pm. Though limited in its capacity at the moment this app can be easily be altered to take in more data. 

Testing is done through Jest and Cypress.

## Setup

Install dependencies with `npm install`.

Fork and clone [this repository](https://github.com/Jaedentw/scheduler-api) and follow the instructions in the README.md to get a sample data server set up.

## Screenshots
  *Inital page
  ![Default main page](https://github.com/Jaedentw/scheduler/blob/master/docs/Default.png)

  *Creating a new appointment
  ![Form to add new appointment](https://github.com/Jaedentw/scheduler/blob/master/docs/Form.png)

  *Confirm delete and Error message
  ![Error page and confirm delete](https://github.com/Jaedentw/scheduler/blob/master/docs/Error.png)

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Core dependencies
* axios
* @testing-library/react-hooks
* react-test-renderer
* jest
* cypress

