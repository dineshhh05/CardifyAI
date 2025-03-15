<img width="1000" alt="Screenshot 2025-03-13 at 11 32 02 PM" src="https://github.com/user-attachments/assets/483d8967-f435-4499-a9d7-c2c7885d3fcf" />


# Cardify-AI

**Cardify-AI** is an intelligent flashcard generation app powered by OpenAI. It allows users to generate flashcards on a wide range of topics, leveraging the capabilities of GPT-4 to create question-and-answer pairs for learning and study purposes.

## Technologies Used

- **Frontend**: React.js + Vite
- **Backend**: Node.js
- **API**: OpenAI 
- **Database**: MongoDB
- **Tech-Stack**: MERN

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (https://nodejs.org/)
- **npm** or **yarn** (package managers for Node.js)
- **Open AI API Key**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dineshhh05/Cardify-AI.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Cardify-AI
   ```

3. Install dependencies:

   ```bash
   npm install
   # or if you're using yarn:
   # yarn install
   ```

### Setup Environment Variables

Before running the app, make sure you set up your environment variables. Add all the required info into the .env sample file and rename it to `.env`

### Running the App

1. Start the backend locally:

```bash
cd backend
npm run dev
```

2. Start the frontend locally:

```bash
cd frontend
npm run dev
```
This will start the app on local-host port given in the `.env` file 

## Usage

1. Click **generate new** from the homepage
2. Enter topic and prompt
3. The app will create the flashcards and return you to the homepage where you can access them

## Contact

For any questions, please reach out to dineshsai841@gmail.com.
