<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> Alex is a machine learning game, ideal for both kids and adults to build, test, and use their own custom models seamlessly in Scratch 3.0, all without writing a single line of code.
> At Alex, users select a mission and construct an AI model using Alex's user-friendly interface to meet the game's requirements.
> Once the model is built, users can test and deploy it to Scratch. With Alex's extension, they can play with their model and complete the game! Completing a game unlocks the next one, keeping the learning journey engaging and progressive.

### User Stories

## As a user:
- I'm interested in machine learning but want to learn it in a fun and challenging way.
- I don't want to learn machine learning through courses since I can't code. I want to build my model using no-code tools.
- I want to use my model in Scratch to create a character that represents my model and play with it.
## As a content creator:
- I aim to invent new game ideas and create step-by-step tutorials for solving them.
- I plan to post these games and their solutions on the website after getting admin approval.
- I want to track user progress to see if they enjoy my games

<br><br>

<!-- Tech stack -->
<img src="./readme/title3.svg"/>

### Alex is built using the following technologies:

- This project uses the [React.js Library](https://react.dev/). React.js is a JavaScript library for building user interfaces, especially single-page web applications.
- For persistent storage (database), the app uses the [MongoDB](https://www.mongodb.com/) NoSQL database that uses a document-oriented data model, making it easy to store and retrieve data in a flexible JSON-like format.
- For the backend, [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/) is utilized, providing a robust framework for building scalable and efficient server-side logic
- For Machine Learning, [Brain.js](https://brain.js.org/) is used to allow users to create their custom text-recognition models. Brain.js is a JavaScript library for building and training neural networks, useful for tasks like data analysis and pattern recognition.

<br><br>

<!-- UI UX -->
<img src="./readme/title4.svg"/>

> We designed Alex using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

- Project Figma design [figma](https://www.figma.com/design/41Kg9ShobHU55JVHjJ78N4/Alex-final-project?node-id=0%3A1&t=yzxGdm3vbknwdD81-1)

### Mockups

| Home screen                             | Login Screen                          | Games Screen                          |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/figma/landing.png) | ![Login](./readme/figma/login.png) | ![Games](./readme/figma/games.png) |

<br><br>

<!-- Database Design -->
<img src="./readme/title5.svg"/>

### Architecting Data Excellence: Innovative Database Design Strategies:

![ERD](./readme/ERD/schema.png)

<br><br>

<!-- Implementation -->
<img src="./readme/title6.svg"/>

### User Screens 

| Landing Screen                              | Login screen                            |
| -----------------------------------------   | --------------------------------------- |
| ![Landing](./readme/screens/landing.gif)    | ![Login](./readme/screens/login.gif)    |

| Profile screen                              | Games Screen                            |
| -----------------------------------------   | --------------------------------------- |
| ![Profile](./readme/screens/profile.gif)    | ![Games](./readme/screens/games.gif)    |
 
| Single Game Screen                          | Labels screen                           |
| -----------------------------------------   | --------------------------------------- |
| ![Landing](./readme/screens/single-game.gif)| ![Labels](./readme/screens/labels.gif)  |

| Examples screen                             | Training Screen                         |
| -----------------------------------------   | --------------------------------------- |
| ![examples](./readme/screens/examples.gif)  | ![Training](./readme/screens/training.gif)|

| Testing screen                              | Playing Screen                         |
| -----------------------------------------   | --------------------------------------- |
| ![testing](./readme/screens/testing.gif)    | ![playing](./readme/screens/complete.gif)|

| Scratch Extension screen                    | Scratch game Example                    |
| -----------------------------------------   | --------------------------------------- |
| ![scratch-extension](./readme/screens/scratch-block.gif)  | ![scratch game](./readme/screens/scratc-game.gif)|


### Creator Screens 

| Dashboard screen                        | Games screen                          | 
| --------------------------------------- | ------------------------------------- |
| ![dashboard](./readme/screens/creator-dashboard.gif) | ![games](./readme/screens/creator-games.gif) |

### Admin Screens 

| Dashboard screen                        | Users Screen                          | Games Screen           |               
| --------------------------------------- | ------------------------------------- |------------------------------------- |
| ![Landing](./readme/screens/admin-dashboard.gif) | ![fsdaf](./readme/screens/users-admin.gif) | ![games](./readme/screens/admin-games.gif) | 


### Videos

<table>
  <tr>
    <td align="center">
      
https://github.com/ali-chamas/Alex-ML-game/assets/130770529/fb00118d-4ee2-4b8c-8143-0b4aad7723ec 

</td>
    <td align="center">
      
https://github.com/ali-chamas/Alex-ML-game/assets/130770529/e59a9a8e-06ed-49ff-89d2-8cfc05f53e5c
</td>
   
</table>



<br><br>

<!-- Prompt Engineering -->
<img src="./readme/title7.svg"/>

### Mastering AI Interaction: Unveiling the Power of Prompt Engineering:

This project uses advanced prompt engineering techniques to optimize the interaction with natural language processing models. In Alex, we used openAI's chat-gpt-3.5 model to generate examples based on the label created by users, for a faster way of creating ML models.
  
| OpenAi prompt                       |
| ------------------------------------|
|![prompt](./readme/prompt/prompt.PNG)|




<!-- Unit Testing -->
<img src="./readme/title9.svg"/>

### Precision in Development: Harnessing the Power of Unit Testing:

At alex, we implemented unit testing to ensure our APIs function correctly and reliably, catching bugs early and improving overall code quality.

| Unit Testing                        |
| ------------------------------------|
|![unit](./readme/unit-test/unit-test.PNG)|

<br><br>

<br><br>

<!-- AWS Deployment -->
<img src="./readme/title8.svg"/>

## Unleashing the Potential with AWS Integration:

### This project leverages AWS deployment, below we will discuss the steps of starting a Node.js Express server on AWS EC2:
#### Sign in to AWS Management Console and navigate to the EC2 Dashboard, then launch a new instance.
#### Connect to the EC2 Instance Using PuTTY:
- Convert .pem to .ppk Using PuTTYgen.
- Connect Using PuTTY by Entering the public IPv4 address of the EC2 instance with the ppk in the credentials section.
#### Update and Upgrade Packages:
 ```sh
   sudo apt update
   sudo apt upgrade
   ```
#### Install Node.js and NPM:
 ```sh
   sudo apt-get install -y nodejs npm
   ```
#### Install git and clone the repo:
 ```sh
   sudo apt-get install git
   git clone https://github.com/ali-chamas/Alex-ML-game.git
   cd Alex-ML-game/server/
   ```
#### Create .env file :
 ```sh
   nano .env
  # Add your environment variables:
  # MONGODB_URI= your_uri
  # PORT= your_port
  # JWT_SECRET= your-secret
  # OPENAI_API_KEY= your_key
   ```
#### Install dependencies:
 ```sh
   npm install
   ```
#### Start the server:
 ```sh
   npm start
   ```

| Working Server Exmple                   | Fetching From Server                     |
| --------------------------------------- | ---------------------------------------  |
|![server](./readme/aws/server.PNG)       | ![fetch](./readme/aws/fetch.PNG)          |

<br><br>

<!-- How to run -->
<img src="./readme/title10.svg"/>

> To set up Alex locally, follow these steps:

### Prerequisites

- Node.js : Ensure you have Node.js installed. You can download and install it from [the official Node.js website](https://nodejs.org).
  
- npm: Node.js comes with npm (Node Package Manager), which you'll use to install dependencies.
  
- MongoDB : You can install MongoDB locally by downloading it from the official [MongoDB website](https://www.mongodb.com/) or use MongoDB Atlas, a cloud-hosted MongoDB service, then Obtain the MongoDB connection URI for your local or cloud database.
  
- Open AI API key : Sign up for an API key at [OpenAI](https://platform.openai.com/signup/)
  
- Add you `.env` file in the server directory and fill your data using this format
   ```js
   MONGODB_URI= your_uri
   PORT= your_port
   JWT_SECRET= your-secret
   OPENAI_API_KEY= your_key
   
   ```

### Installation


1. Clone the repo
   git clone [github](https://github.com/ali-chamas/Alex-ML-game)

2. install NPM packages in the client directory
   ```sh
   cd  ./client
   npm install
   ```
3. Install NPM packages in the server directory
   ```sh
   cd ../server
   npm install
   ```
4. Run the server
   ```sh
   npm start
   ```
5. Run the client
   ```sh
   cd ../client
   npm run dev
   ```
   

Now, you should be able to run Alex locally and explore its features.
