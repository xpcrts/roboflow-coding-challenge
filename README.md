# Roboflow Coding Challenge

This repository contains solutions to a take-home coding challenge for Roboflow. The challenge involves writing two functions that interact with Roboflow's backend inference data by parsing the manifest and extracting block descriptions and input properties.

## Features

- **`getBlockDescription(blockIdentifier)`**: 
  - Fetches and returns the human-readable description of a block given its identifier.
  
- **`getInputPropertiesOfKind(blockType, kind)`**: 
  - Returns an array of input properties for a given block type that are compatible with a specified kind (e.g., `"image"`, `"string"`).


## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/xpcrts/roboflow-coding-challenge.git
    ```

2. Navigate into the project directory:

    ```bash
    cd roboflow-coding-challenge
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

## How to Run the Project

You can run the project with the following command:

```bash
npm run dev
```