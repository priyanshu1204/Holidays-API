# Holidays API

A RESTful API for managing and retrieving public holidays for different countries.

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Jest & Supertest (for testing)
- mongodb-memory-server


## Setup
1. Clone the repository.
2. Install dependencies:
3. Create a `.env` file in the root directory with:
   MONGODB_URI=your-mongodb-connection-string
4. Run `npm install`
5. Run `node index.js`

 ## How to Run Tests
 - To view the HTML report:
 --npm test
  - Then open coverage/lcov-report/index.html in your browser
  - screensort
  -![Screenshot 2025-06-22 143953](https://github.com/user-attachments/assets/40afed57-2dbd-41e7-887c-f62dd5277f93)

## Testing Frameworks/Tools
- Jest
- Supertest
- mongodb-memory-server






- Run all tests:
- Tests include unit, integration, and API endpoint checks using Jest and Supertest.
- An in-memory MongoDB instance is used for safe, isolated testing.
## Test Coverage

- Test coverage is automatically calculated with Jest.

## CI/CD Pipeline Configuration

See the [GitHub Actions workflow file](.github/workflows/ci.yml) used for continuous integration and Keploy API testing.

## Keploy API Testing Dashboard Report

Below is a screenshot of the Keploy API Testing Dashboard showing all test suites passing for this project:

![Keploy Test Report]("C:\Users\KIIT\OneDrive\Pictures\Screenshots\screenshotskeploy-test-report.png")

Note: The Keploy API key is stored securely as a GitHub Actions secret (KEPLOY_API_KEY).
      The MongoDB service is provisioned automatically for the tests.
