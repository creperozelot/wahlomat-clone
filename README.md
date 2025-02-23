# FlamesOMat

[![Build and Push Docker Image](https://github.com/creperozelot/wahlomat-clone/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/creperozelot/wahlomat-clone/actions/workflows/docker-publish.yml)

FlamesOMat is a custom Wahl-O-Mat-style application built with **Next.js**, **React**, **TypeScript**, and **MUI**. The application allows users to compare their opinions with different parties based on a customizable question and party system.

## Features

- 🔥 **Custom Questions & Parties**: Easily modify `questions.json` and `party.json` to tailor the questionnaire.
- ⚡ **Next.js & React**: Optimized performance with server-side rendering and static generation.
- 🎨 **MUI Integration**: Sleek and modern UI components.
- 📦 **Docker Support**: Easily deploy using the provided Docker image.

## Installation & Development

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Docker](https://www.docker.com/) (if using containerized deployment)

### Clone the Repository
```sh
git clone https://github.com/creperozelot/wahlomat-clone.git
cd FlamesOMat
```

### Install Dependencies
```sh
npm install
```

### Copy .env.example to .env and Modify
```sh
cp .env.example .env
```

### Run in Development Mode
```sh
npm run dev
```
The app will be available at `http://localhost:3000`

## Customization

### Modify Questions & Parties
The questions and parties are stored in JSON files for easy modification.
- **`questions.json`** – Defines the questionnaire.
- **`party.json`** – Stores party information and their stance on issues.

To update them, edit the respective JSON files in the `data/` directory.

## Docker Deployment

### Build the Docker Image
```sh
docker build -t flamesomat .
```

### Run the Container
```sh
docker run -p 3000:3000 flamesomat
```
Access the application at `http://localhost:3000`

### Using Docker Compose
Alternatively, you can use Docker Compose:
```sh
docker-compose up --build
```

## Deployment
You can deploy FlamesOMat on **Vercel**, **DigitalOcean**, **AWS**, or any platform that supports Node.js and Docker.

### Deploy to Vercel
If deploying to [Vercel](https://vercel.com/), run:
```sh
npm install -g vercel
vercel
```
Follow the CLI instructions to deploy.

## License
MIT License - Feel free to modify and use the project!

---
🔥 Developed with passion by **creperozelot**

