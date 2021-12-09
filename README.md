# Pinterest Front-End
A Pinterest front-end clone using React.js. The back-end project can be found [here](https://github.com/mamume/pinterest-back/).

## Overview
This project is a front-end clone for the Pinterest website. The project contains:
  - **Authentication**: Users can do normal or social login and signup, or reset their password.
  - **Homepage**: List website pins.
  - **Profile**: User profile page that contains user data, pins, and boards.
  - **Settings**: Edit user data.
  - **Board**: Board page that contains its pins.
  - **Navigation Bar**: Which has the Pinterest logo, logged user profile picture, and a search bar to search for pins.
  
## Installation
  - Clone the project repo: 
    - `git clone https://github.com/mamume/pinterest-front.git`
  - In dependencies:
    - First, install [Yarn](https://classic.yarnpkg.com/en/) package manager: 
      - [Yarn Installation](https://classic.yarnpkg.com/lang/en/docs/install)
    - Change directory to the project folder:
      - `cd pinterest-front`
    - Install all dependencies:
      - `yarn` or `yarn install`
      
## Start Project
  - To start the project run:
    - `yarn start`
  - To build the project run:
    - `yarn build`
    
## Specifications
  - **Authentication**: Sends a request to the server with data and receives an access token that is used for each request to the back-end later.
    - **Login**: User can do normal or social login.
      - If the user logged in before, the website will remember their email.
    - **Signup**: Normal or social signup.
  - **Homepage**: 
    - List pins using masonry style.
    - Each pin has:
      - A select menu for the user board that lets the user save the pin in one of their boards.
        - If the user doesn't have a board yet, a create board button will appear.
      - A download button to download the pin.
     - It has a create pin button to create a pin:
      - To create a pin you must select pin source and type its title.
      - There is also an optional description field.
      - After the creating of the pin, it will appear immediately on the top of the homepage.
  - **Profile**: 
    - Display user data: profile picture, full name, username, and bio.
    - **Share**: to share profile on Facebook, Whatsapp, Twitter or copy the profile link.
    - **Edit Profile**: navigate to the settings page.
    - **Boards Section**: List all user boards and shows with a preview of their pins.
      - If the board is private no one can view it or its pins but the owner.
      - If there are no boards a message will be displayed to inform the user there are no boards yet.
      - It has a create board button:
        - To create a board you should specify the board name and share option.
    - **Pins Section**: List all user pins.
      - On each pin, there is a button to delete the pin and a button to download it.
      - If there are no pins a message will be displayed to inform the user there are no pins yet.
      - It has a create pin button to create a pin with the same functionality as create pin button on the homepage.
    - **Board**: List all pins on the board.
      - If the board is private no one can access it but its owner.
      - Each pin has two buttons:
        - Remove pin from the board.
        - Download the pin.
      - It has a delete board button to delete the board.
      - It has an edit board button to edit the board name or share option.
    - **Settings**: Edit user data.
      - To access it click on the **Edit Profile** button on the profile page.
      - Contains three pages:
        1. **Public Profile**: To edit profile picture, first name, last name, website, bio, and username.
        2. **Account Settings**: To edit email address, gender, country, or delete the user account.
        3. **Security**: To change the user password by adding, old, new, and confirm passwords.
          - There are validations to check if the fields are empty or new and confirm passwords aren't the same.
          
## Dependencies
  - This project is built using create-react-app using these packages.
    - Material UI
    - Axios
    - React Router Dom
