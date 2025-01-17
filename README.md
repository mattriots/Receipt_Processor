# Receipt Processor

A simple Node.js service that processes receipts and calculates points based on various criteria.

## Overview

This application exposes two primary endpoints:

1. **POST** `/receipts/process`  
   - Submits a receipt for processing.  
   - Returns an ID representing the stored receipt.

2. **GET** `/receipts/:id/points`  
   - Retrieves the number of points associated with the given receipt ID.

All data is stored **in-memory** and resets when the application restarts.

---

## Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mattriots/Receipt_Processor.git
   cd Receipt_Processor.git
2. **Install Dependecies**:
   ```bash
    npm install
3. **Start the application**:
   ```bash
    npm start
   ```
    The app is available at http://localhost:3000.

## Running with Docker

1. **Build the Docker image**:
    ```bash
    docker build -t receipt-processor .
    
2. **Run the Docker container**:
    ```bash
    docker run -p 3000:3000 receipt-processor
    ```
    The app is available at http://localhost:3000.

## Testing

I used Jest and Supertest for testing. To run tests:
   ```bash
   npm test
   
