# Turner's Car Company Image Recognition Application

## Description

Turner's Car Company Image Recognition Application is a web application that utilizes Azure Computer Vision to analyze images or URLs containing car images. The application identifies relevant cars from a database and presents the results.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Installation](#installation)
  - [Backend Installation](#backend-installation)
  - [Frontend Installation](#frontend-installation)
- [Usage](#usage)
- [Configuration](#configuration)

## Technology Stack

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB

- **Frontend:**
  - React
  - Vite
  - Tailwind CSS

## Installation

### Backend Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mission-Ready-Group-2/Vatthana-mission-2.git
   ```

2. Navigate to the `backend` folder:

   ```bash
   cd turners-car-app/backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the `backend` folder and set the following environment variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   AZURE_COMPUTER_VISION_KEY=your_azure_computer_vision_key
   AZURE_COMPUTER_VISION_ENDPOINT=your_azure_computer_vision_endpoint
   ```

5. Run the backend server:

   ```bash
   npm start
   ```

### Frontend Installation

1. Navigate to the `client` folder:

   ```bash
   cd turners-car-app/client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` folder and set the following environment variables:

   ```env
   VITE_API_KEY=your_azure_computer_vision_key
   VITE_API_ENDPOINT=your_azure_computer_vision_endpoint
   VITE_PATH_BACKEND_IMAGE="http://localhost:5000/analyzeImage"
   VITE_PATH_BACKEND_="http://localhost:5000/analyze"
   ```

4. Run the frontend development server:

   ```bash
   npm start
   ```

## Usage

1. Access the application by opening the provided URL or navigating to `http://localhost:3000` in your web browser.

2. The application allows you to upload an image or enter a URL containing car images.

3. Click the "Recognize Cars" button to trigger the Azure Computer Vision analysis.

4. View the results, which should include relevant information about the identified cars from the database.

## Configuration

## Backend Configuration

- The backend configuration is managed through the `.env` file in the `backend` folder. Ensure the following variables are correctly set:

  - `PORT`: The port on which the backend server runs.
  - `MONGODB_URI`: The MongoDB connection URI.
  - `AZURE_COMPUTER_VISION_KEY`: The Azure Computer Vision API key.
  - `AZURE_COMPUTER_VISION_ENDPOINT`: The Azure Computer Vision API endpoint.

## Frontend Configuration

- The frontend configuration is managed through the `.env` file in the `client` folder. Ensure the following variables are correctly set:

  - `VITE_API_KEY`: Your Azure Computer Vision API key.
  - `VITE_API_ENDPOINT`: Your Azure Computer Vision API endpoint.
  - `VITE_PATH_BACKEND_IMAGE`: The backend endpoint for image analysis, e.g., "http://localhost:5000/analyzeImage".
  - `VITE_PATH_BACKEND_`: The backend endpoint for general analysis, e.g., "http://localhost:5000/analyze".
