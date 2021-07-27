from flask.cli import AppGroup
from .users import seed_Users, undo_Users
from .notebooks import seed_Notebooks, undo_Notebooks
from .notes import seed_Notes, undo_Notes
from .decks import seed_Decks, undo_Decks
from .cards import seed_Cards, undo_Cards
from .classmates import seed_Classmates, undo_Classmates


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_Users()
    seed_Notebooks()
    seed_Notes()
    seed_Decks()
    seed_Cards()
    seed_Classmates()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_Users()
    undo_Notebooks()
    undo_Notes()
    undo_Decks()
    undo_Cards()
    undo_Classmates()

