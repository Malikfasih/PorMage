# ProMage Backend

ProMage is a project management system backend built with the MERN stack. It provides APIs for managing projects, tasks, and project managers.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- Allows users to view, create, and edit projects.
- Provides endpoints for managing project tasks.
- Supports assigning and changing project managers.

## Setup

To set up the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Malikfasih/PorMage.git`
2. Navigate to the project directory: `cd ProMage-backend`
3. Install dependencies: `npm install`
4. Set up environment variables by creating a `.env` file.
5. Start the server: `npm start`

## API Endpoints

The backend provides the following API endpoints:

- `GET /projects`: Get all projects
- `GET /projects/:id`: Get project by ID
- `POST /projects`: Create a new project
- `PATCH /projects/:id`: Update a project
- `DELETE /projects/:id`: Delete a project

For more detailed documentation on API endpoints, refer to the API documentation.

## Dependencies

The project uses the following dependencies:

- Express: Fast, unopinionated, minimalist web framework for Node.js
- Mongoose: Elegant MongoDB object modeling for Node.js
- Nodemailer: Module for sending emails
- dotenv: Loads environment variables from a .env file into process.env

## Future Enhancements

While the current version of ProMage includes core functionality for project management, there are several features and enhancements that I plan to implement in future iterations:

- **Interconnect Interfaces:** Integrate ProMage with other systems through interconnect interfaces to enable seamless communication and data exchange.

- **Notifications:** Implement a notification system to send notifications to users or external systems on project events, such as project creation, updates, or completion.

- **Change Logging:** Implement logging functionality to track and log changes happening on projects, including modifications, deletions, and other relevant actions.
  .

## Testing

Testing functionality has not been implemented yet, but it is planned for future iterations of the project. I aim to include comprehensive unit tests to ensure the reliability and stability of the application. Stay tuned for updates!
