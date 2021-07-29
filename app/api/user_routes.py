from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Notebook, Note, Deck, Card, Classmate
from app.forms import NotebookForm, NoteForm, DeckForm, CardForm, ClassmateForm

user_routes = Blueprint('users', __name__)

# <<<<< User Specific >>>>>

# get all users
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# get current user
@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# <<<<< User Notebooks >>>>>

# get current user notebooks
@user_routes.route('/<int:userId>/notebooks')
# @login_required
def get_notebooks(userId):
    notebooks = Notebook.query.filter_by(userId=userId).all()
    return {'notebooks': [notebook.to_dict() for notebook in notebooks]}

# create a new notebook
@user_routes.route('/<int:userId>/notebooks', methods=['POST'])
# @login_required
def post_notebooks(userId):
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['userId'].data = userId
    if form.validate_on_submit() and form.title_exists() and form.validate_title():
        data = request.get_json()
        notebook = Notebook(userId=userId, title=data['title'])
        db.session.add(notebook)
        db.session.commit()
        notebooks = Notebook.query.filter_by(userId=userId).all()
        return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
    else: 
        return jsonify({'errors': form.errors})


# edit or delete a notebook
@user_routes.route('/<int:userId>/notebooks/<int:notebookId>', methods=['PATCH', 'DELETE'])
# @login_required
def patch_and_delete_notebooks(userId, notebookId):
    if request.method == 'PATCH':
        data = request.get_json()
        notebook = Notebook.query.get(notebookId)
        if 'title' in data.keys() and data['title'] != '':
            notebook.title = data['title']
        elif 'title' in data.keys() and data['title'] == '':
            return {'errors': 'Title cannot be blank'}
        db.session.commit()
        notebooks = Notebook.query.filter_by(userId=userId).all()
        return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
    elif request.method == 'DELETE':
        notebook = Notebook.query.get(notebookId)
        db.session.delete(notebook)
        db.session.commit()
        notebooks = Notebook.query.filter_by(userId=userId).all()
        return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
    else:
        raise Exception('Invalid request method, try a different route')

# <<<<< User Notes >>>>>

# get current notebooks notes
@user_routes.route('/<int:userId>/notebooks/<int:notebookId>/notes')
# @login_required
def get_notes(userId,notebookId):
    notes = Note.query.filter_by(userId=userId, notebookId=notebookId).all()
    return {'notes': [note.to_dict() for note in notes]}

# create a new note
@user_routes.route('/<int:userId>/notebooks/<int:notebookId>/notes', methods=['POST'])
# @login_required
def post_notes(userId, notebookId):
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['userId'].data = userId
    if form.validate_on_submit() and form.title_exists() and form.validate_title_and_body():
        data = request.get_json()
        note = Note(userId=userId, title=data['title'], body=data['body'], notebookId=notebookId, share=data['share'])
        db.session.add(note)
        db.session.commit()
        notes = Note.query.filter_by(userId=userId, notebookId=notebookId).all()
        return {'notes': [note.to_dict() for note in notes]}
    else: 
        return jsonify({'errors': form.errors})

# edit or delete a note
@user_routes.route('/<int:userId>/notebooks/<int:notebookId>/notes/<int:noteId>', methods=['PATCH', 'DELETE'])
# @login_required
def patch_and_delete_notes(userId, notebookId, noteId):
    if request.method == 'PATCH':
        data = request.get_json()
        note = Note.query.get(noteId)
        if 'title' in data.keys() and data['title'] != '':
            note.title = data['title']
        elif 'title' in data.keys() and data['title'] == '':
            return {'errors': 'Title cannot be blank'}
        if 'body' in data.keys() and data['body'] != '':
            note.body = data['body']
        elif 'body' in data.keys() and data['body'] == '':
            return {'errors': 'Body cannot be blank'}
        if 'share' in data.keys():
            note.share = data['share']
        db.session.commit()
        notes = Note.query.filter_by(userId=userId, notebookId=notebookId).all()
        return {'notes': [note.to_dict() for note in notes]}
    elif request.method == 'DELETE':
        note = Note.query.get(noteId)
        db.session.delete(note)
        db.session.commit()
        notes = Note.query.filter_by(userId=userId, notebookId=notebookId).all()
        return {'notes': [note.to_dict() for note in notes]}
    else:
        raise Exception('Invalid request method, try a different route')

# <<<<< User Decks >>>>>

# get current user decks
@user_routes.route('/<int:userId>/decks')
# @login_required
def get_decks(userId):
    decks = Deck.query.filter_by(userId=userId).all()
    return {'decks': [deck.to_dict() for deck in decks]}

# create a new deck
@user_routes.route('/<int:userId>/decks', methods=['POST'])
# @login_required
def post_decks(userId):
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['userId'].data = userId
    if form.validate_on_submit() and form.title_exists() and form.validate_title():
        data = request.get_json()
        deck = Deck(userId=userId, title=data['title'], share=data['share'])
        db.session.add(deck)
        db.session.commit()
        decks = Deck.query.filter_by(userId=userId).all()
        return {'decks': [deck.to_dict() for deck in decks]}
    else: 
        return jsonify({'errors': form.errors})

# edit or delete a deck
@user_routes.route('/<int:userId>/decks/<int:deckId>', methods=['PATCH', 'DELETE'])
# @login_required
def patch_and_delete_decks(userId, deckId):
    if request.method == 'PATCH':
        data = request.get_json()
        deck = Deck.query.get(deckId)
        if 'title' in data.keys() and data['title'] != '':
            deck.title = data['title']
        elif 'title' in data.keys() and data['title'] == '':
            return jsonify({'errors': 'title of deck cannot be blank'})
        if 'share' in data.keys() and data['share'] != '':
            deck.share = data['share']
        db.session.commit()
        decks = Deck.query.filter_by(userId=userId).all()
        return {'decks': [deck.to_dict() for deck in decks]}
    elif request.method == 'DELETE':
        deck = Deck.query.get(deckId)
        db.session.delete(deck)
        db.session.commit()
        decks = Deck.query.filter_by(userId=userId).all()
        return {'decks': [deck.to_dict() for deck in decks]}
    else:
        raise Exception('Invalid request method, try a different route')


# <<<<< User Cards >>>>>

# get current decks cards
@user_routes.route('/<int:userId>/decks/<int:deckId>/cards')
# @login_required
def get_cards(userId, deckId):
    cards = Card.query.filter_by(userId=userId, deckId=deckId).all()
    return {'cards': [card.to_dict() for card in cards]}

# create a new card
@user_routes.route('/<int:userId>/decks/<int:deckId>/cards', methods=['POST'])
# @login_required
def post_cards(userId, deckId):
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['userId'].data = userId
    form['deckId'].data = deckId
    if form.validate_on_submit() and form.card_exists() and form.validate_front_and_back():
        data = request.get_json()
        card = Card(front=data['front'], back=data['back'], userId=userId,  deckId=deckId)
        db.session.add(card)
        db.session.commit()
        cards = Card.query.filter_by(userId=userId, deckId=deckId).all()
        return {'cards': [card.to_dict() for card in cards]}
    else: 
        return jsonify({'errors': form.errors})

# edit or delete a card
@user_routes.route('/<int:userId>/decks/<int:deckId>/cards/<int:cardId>', methods=['PATCH', 'DELETE'])
# @login_required
def patch_and_delete_cards(userId, deckId, cardId):
    if request.method == 'PATCH':
        data = request.get_json()
        card = Card.query.get(cardId)
        if 'front' in data.keys() and data['front'] != '':
            card.front = data['front']
        elif 'front' in data.keys() and data['front'] == '':
            return jsonify({'errors': 'front of card cannot be blank'})
        if 'back' in data.keys() and data['back'] != '':
            card.back = data['back']
        elif 'back' in data.keys() and data['back'] == '':
            return jsonify({'errors': 'back of card cannot be blank'})
        db.session.commit()
        cards = Card.query.filter_by(userId=userId, deckId=deckId).all()
        return {'cards': [card.to_dict() for card in cards]}
    elif request.method == 'DELETE':
        card = Card.query.get(cardId)
        db.session.delete(card)
        db.session.commit()
        cards = Card.query.filter_by(userId=userId, deckId=deckId).all()
        return {'cards': [card.to_dict() for card in cards]}
    else:
        raise Exception('Invalid request method, try a different route')


# <<<<< User Classmates >>>>>

# get classmates
@user_routes.route('/<int:userId>/classmates')
# @login_required
def classmate(userId):
    classmates = Classmate.query.filter_by(user1=userId).all()
    return {'classmates': [classmate.to_dict() for classmate in classmates]}

# send a friend request to classmate
@user_routes.route('/<int:userId>/classmates/<int:classmateId>', methods=['POST'])
# @login_required
def post_classmates(userId, classmateId):
    unique = int(str(userId) + str(classmateId))
    form = ClassmateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['user1'].data = userId
    form['user2'].data = classmateId
    form['unique'].data = unique
    if form.validate_on_submit() and form.friendship_exists():
        classmate = Classmate(user1=userId, user2=classmateId, unique=unique, status=False)
        db.session.add(classmate)
        db.session.commit()
        classmates = Classmate.query.filter_by(user1=userId).all()
        return {'classmates': [classmate.to_dict() for classmate in classmates]}
    else:
        return jsonify({'errors': form.errors})

# accept/refuse a friend request or delete a classmate from your list.
@user_routes.route('/<int:userId>/classmates/<int:classmateId>', methods=['PATCH', 'DELETE'])
# @login_required
def patch_and_delete_classmates(userId, classmateId):
    data = request.get_json()
    if request.method == 'PATCH':
        friendship = Classmate.query.filter_by(user1=userId, user2=classmateId).first()
        if data['accept'] == True:
            friendship.status = True
            db.session.commit()
            classmates = Classmate.query.filter_by(user1=userId).all()
            return {'classmates': [classmate.to_dict() for classmate in classmates]}
        else:
            db.session.delete(friendship)
            db.session.commit()
            classmates = Classmate.query.filter_by(user1=userId).all()
            return {'classmates': [classmate.to_dict() for classmate in classmates]}
    elif request.method == 'DELETE':
        friendship = Classmate.query.filter_by(user1=userId, user2=classmateId).first()
        if friendship:
            db.session.delete(friendship)
            db.session.commit()
            classmates = Classmate.query.filter_by(user1=userId).all()
            return {'classmates': [classmate.to_dict() for classmate in classmates]}
        else:
            raise Exception('Friendship does not exist')
    else:
        raise Exception('Invalid request method, try a different route')