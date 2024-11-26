# Rocket.Chat with MongoDB in Docker

This project provides all necessary configurations to run Rocket.Chat with MongoDB in Docker, restore data from a dump, and execute tests.
After the tests, an Allure report is generated, and optional steps include cleaning the report and shutting down Docker.

## Requirements

To run this project, make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)


## Steps to Run the Project

### 1. Clone the Repository

Clone this repository to your machine:

```bash
git clone https://github.com/SilenceStark/AQA_test_chat.git
cd chat_bdd
```

### 2. Initialize Node.js Packages

Before running Docker, install the required dependencies for testing:
```bash
npm install
```
### 3. Run Docker
Start the Docker containers using docker-compose:

```bash
docker-compose up --build
```

This command:
    Pulls the Docker images.
    Launches the MongoDB and Rocket.Chat containers.
    Restores the MongoDB database from the dump.
    Connects Rocket.Chat to MongoDB and makes it available at http://localhost:3000.

### 4. Run Tests
Once Docker containers are running, execute the tests:

```bash
npm run test:report
```
The test system will run all configured tests and generate an Allure report based on the results.

### 5. View Allure Report
After the tests have run if you want manually open the Allure report in your browser:

```bash
npm run allure:generate
npm run allure:serve
```
### 6. Clean Allure Report and Shut Down Docker
After reviewing the report, you can clean it up with the following command:

```bash
npm run allure:clean
```
Then shut down the Docker containers:

```bash
docker-compose down
```
This stops and removes all containers, networks, and volumes created for the project.

### 7. (Optional) Create a New Database Dump
If you need to update the database dump, use the following command to create a new one:

```bash
docker exec mongo_chat mongodump --archive=/dump/dump.archive --gzip
```

The new dump will be saved in the ./chat_test/dump.archive file for future use.

```
Project Structure
│
├── docker-compose.yml        # Configuration for running MongoDB and Rocket.Chat in Docker.
│
├── chat_test/
│   └── dump.archive          # MongoDB database dump for restoring during startup.
│
├── tests/                    # Test scripts for automated Rocket.Chat testing.
│
└── allure_report/
```

### Additional Configuration
If you need to modify MongoDB or Rocket.Chat configurations, update the variables in docker-compose.yml.
