# Welcome to the Midnight Oil ReadMe!


## Summary
Midnight Oil is an online learning companion app that allows you to create and organize notes as well as create custom flashcard decks to help you study! It was built using Python/Flask for the backend and React/Redux for the frontend.

- Create an account
- Log in and Log out
- Log in as a guest via Demo User option
- [Create, edit or delete notebooks and notes](#notebooks)
- [Create, edit or delete decks and flashcards](#decks)
- [Utilize study mode to test yourself with a time limit!](#study)

## Structure Overview

- Backend
  - The backend of this app was built using Python and Flask utilizing SqlAlchemy to interact with a PostgreSQL database. The ReSTful convention was followed in all backend API routes.

- Frontend
  - The frontend of this app was built using React and Redux, utilizing CSS for styling.

## Landing Page

On the Landing page you have the option to login or sign up for a new account.
There is also a demo user account if you'd like to test the site without entering any personal information.

![splash](https://i.ibb.co/DW9tx87/splash.png)

# Dashboard

Once logged in, you are redirected to the dashboard. The dashboard holds the most recent notes from your most recently created notebook and your most recently created decks. If you scroll to the bottom of the page there is a study beats button and you can listen to some of the developers favorite study music! (future features include embedding your own youtube videos to create your own playlist)

![login to dashboard](https://user-images.githubusercontent.com/72579895/128644422-516d7449-d728-4eb6-b889-2ad5e4718e9f.gif)

# Notebooks

If you click on the notebooks dropdown, you can see a list of the notebooks you've created and all notes inside of them. You can create a new notebook, edit a notebooks title, or delete a notebook from this location as well. If you create a new notebook, it takes you to a page with a new note. You can then edit the title or body of that note using MarkDown syntax. The rich-markdown-editor has a lot of great features. Check them out!

![dashboard to notes](https://user-images.githubusercontent.com/72579895/128644649-76ec1588-3d65-4967-be3a-efa3d3de9346.gif)


# Decks

If you click on the decks dropdown menu, you can see a list of the decks you have created. You can create a new deck from here which will take you to the deck page and prompt you to create your first card! Once cards are created you can edit and delete them.

![dashboard to decks](https://user-images.githubusercontent.com/72579895/128644663-79aefd28-7e26-4752-96df-c1ef71085534.gif)

# Study

Once your deck is full of cards and you are ready to study, just select an interval at which you'd like the cards to change and start study mode. The cards will automatically flip for you before moving to the next card! 

![study mode](https://user-images.githubusercontent.com/72579895/128644672-25ebdcdf-f189-446d-89a4-45c3d303064f.gif)


Thank you for checking out my app! If you have any further questions please check out the [Wiki](https://github.com/J0914/MidnightOil/wiki) for more in-depth information, or ask [Me](https://www.linkedin.com/in/jordyn-sechrist-87710b207/) directly!

