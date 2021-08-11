from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import desc
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
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# <<<<< User Notebooks >>>>>

# get current user notebooks
@user_routes.route('/<int:userId>/notebooks')
@login_required
def get_notebooks(userId):
    notebooks = Notebook.query.order_by(desc(Notebook.id)).filter_by(userId=userId).all()
    return {'notebooks': [notebook.to_dict() for notebook in notebooks]}

# get current user notebook
@user_routes.route('/<int:userId>/notebooks/<int:notebookId>')
@login_required
def get_notebook(userId, notebookId):
    notebook = Notebook.query.order_by(desc(Notebook.id)).filter_by(userId=userId, id=notebookId).first()
    notes = Note.query.order_by(desc(Note.id)).filter_by(notebookId=notebookId).all()
    return {'notebook': notebook.to_dict(), 'notes': [note.to_dict() for note in notes]}

# create a new notebook
@user_routes.route('/<int:userId>/notebooks', methods=['POST'])
@login_required
def post_notebooks(userId):
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['userId'].data = userId
    if form.validate_on_submit() and form.title_exists():
        data = request.get_json()
        notebook = Notebook(userId=userId, title=data['title'])
        db.session.add(notebook)
        db.session.commit()
        notebooks = Notebook.query.order_by(desc(Notebook.id)).filter_by(userId=userId).all()
        return {'notebook': notebook.to_dict(), 'notebooks': [notebook.to_dict() for notebook in notebooks]}
    else: 
        return jsonify({'errors': form.errors})


# edit or delete a notebook
@user_routes.route('/<int:userId>/notebooks/<int:notebookId>', methods=['PATCH', 'DELETE'])
@login_required
def patch_and_delete_notebooks(userId, notebookId):
    
    if request.method == 'PATCH':
        form = NotebookForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['userId'].data = userId
        if form.validate_on_submit() and form.title_exists():
            data = request.get_json()
            notebook = Notebook.query.get(notebookId)
            if 'title' in data.keys() and data['title'] != '':
                notebook.title = data['title']
            db.session.commit()
            notebooks = Notebook.query.order_by(desc(Notebook.id)).filter_by(userId=userId).all()
            return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
        else:
            return jsonify({'errors': form.errors})
    elif request.method == 'DELETE':
        notebook = Notebook.query.order_by(desc(Notebook.id)).filter_by(id=notebookId).first()
        db.session.delete(notebook)
        db.session.commit()
        notebooks = Notebook.query.order_by(desc(Notebook.id)).filter_by(userId=userId).all()
        return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
    else:
        raise Exception('Invalid request method, try a different route')

# <<<<< User Notes >>>>>

# get current notebooks notes
@user_routes.route('/<int:userId>/notebooks/<int:notebookId>/notes')
@login_required
def get_notes(userId,notebookId):
    notes = Note.query.order_by(desc(Note.id)).filter_by(userId=userId, notebookId=notebookId).all()
    return {'notes': [note.to_dict() for note in notes]}

# get current note
@user_routes.route('/<int:userId>/notebooks/<int:notebookId>/notes/<int:noteId>')
@login_required
def get_note(userId, notebookId, noteId):
    note = Note.query.order_by(desc(Note.id)).filter_by(id=noteId).first()
    return note.to_dict()

# create a new note
@user_routes.route('/<int:userId>/notebooks/<int:notebookId>/notes', methods=['POST'])
@login_required
def post_notes(userId, notebookId):
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['userId'].data = userId
    form['notebookId'].data = notebookId
    if form.validate_on_submit() and form.title_exists() and form.validate_title_only():
        data = request.get_json()
        note = Note(userId=userId, title=data['title'], body=data['body'], notebookId=notebookId)
        db.session.add(note)
        db.session.commit()
        notes = Note.query.order_by(desc(Note.id)).filter_by(userId=userId, notebookId=notebookId).all()
        notebooks = Notebook.query.order_by(desc(Notebook.id)).filter_by(userId=userId).all()
        return {'note': note.to_dict(),'notebooks': [notebook.to_dict() for notebook in notebooks],'notes': [note.to_dict() for note in notes]}
    else: 
        return jsonify({'errors': form.errors})

# edit or delete a note
@user_routes.route('/<int:userId>/notebooks/<int:notebookId>/notes/<int:noteId>', methods=['PATCH', 'DELETE'])
@login_required
def patch_and_delete_notes(userId, notebookId, noteId):

    if request.method == 'PATCH':
        form = NoteForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['userId'].data = userId
        form['notebookId'].data = notebookId
        data = request.get_json()

        if data['editTitle'] == True:
            if form.validate_on_submit() and form.title_exists() and form.validate_title_only():
                note = Note.query.get(noteId)
                note.title = data['title']
                db.session.commit()
                notes = Note.query.order_by(desc(Note.id)).filter_by(userId=userId, notebookId=notebookId).all()
                notebooks = Notebook.query.order_by(desc(Notebook.id)).filter_by(userId=userId).all()
                return {'note': note.to_dict(), 'notebooks': [notebook.to_dict() for notebook in notebooks],'notes': [note.to_dict() for note in notes]}
            else: 
                return jsonify({'errors': form.errors})

        elif data['editBody'] == True:

            if form.validate_on_submit():
                note = Note.query.get(noteId)
                note.body = data['body']
                note.share = data['share']
                db.session.commit()
                notes = Note.query.order_by(desc(Note.id)).filter_by(userId=userId, notebookId=notebookId).all()
                notebooks = Notebook.query.order_by(desc(Notebook.id)).filter_by(userId=userId).all()
                return {'note': note.to_dict(), 'notebooks': [notebook.to_dict() for notebook in notebooks],'notes': [note.to_dict() for note in notes]}
            else: 
                return jsonify({'errors': form.errors})

    elif request.method == 'DELETE':
        note = Note.query.get(noteId)
        db.session.delete(note)
        db.session.commit()
        notes = Note.query.order_by(desc(Note.id)).filter_by(userId=userId, notebookId=notebookId).all()
        notebooks = Notebook.query.order_by(desc(Notebook.id)).filter_by(userId=userId).all()
        return {'notebooks': [notebook.to_dict() for notebook in notebooks],'notes': [note.to_dict() for note in notes]}
    
    else:
        raise Exception('Invalid request method, try a different route')

# <<<<< User Decks >>>>>

# get current user decks
@user_routes.route('/<int:userId>/decks')
@login_required
def get_decks(userId):
    decks = Deck.query.order_by(desc(Deck.id)).filter_by(userId=userId).all()
    return {'decks': [deck.to_dict() for deck in decks]}

# get single deck
@user_routes.route('/<int:userId>/decks/<int:deckId>')
@login_required
def get_deck(userId, deckId):
    deck = Deck.query.order_by(desc(Deck.id)).filter_by(userId=userId, id=deckId).first()
    return {'deck': deck.to_dict()}

# create a new deck
@user_routes.route('/<int:userId>/decks', methods=['POST'])
@login_required
def post_decks(userId):
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['userId'].data = userId
    if form.validate_on_submit() and form.title_exists():
        data = request.get_json()
        deck = Deck(userId=userId, title=data['title'])
        db.session.add(deck)
        db.session.commit()
        decks = Deck.query.order_by(desc(Deck.id)).filter_by(userId=userId).all()
        deck = Deck.query.order_by(desc(Deck.id)).filter_by(userId=userId, title=data['title']).first()
        return {'deck': deck.to_dict(), 'decks': [deck.to_dict() for deck in decks]}
    else: 
        return jsonify({'errors': form.errors})

# edit or delete a deck
@user_routes.route('/<int:userId>/decks/<int:deckId>', methods=['PATCH', 'DELETE'])
@login_required
def patch_and_delete_decks(userId, deckId):

    if request.method == 'PATCH':
        form = DeckForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['userId'].data = userId
        data = request.get_json()
        if data['onlyShare'] == False:
            if form.validate_on_submit() and form.title_exists():
                deck = Deck.query.get(deckId)
                if 'title' in data.keys():
                    deck.title = data['title']
                if 'share' in data.keys():
                    deck.share = data['share']
                db.session.commit()
                decks = Deck.query.order_by(desc(Deck.id)).filter_by(userId=userId).all()
                return {'deck': deck.to_dict(), 'decks': [deck.to_dict() for deck in decks]}
            else: 
                return jsonify({'errors': form.errors}) 
        else:
            deck = Deck.query.get(deckId)
            if 'share' in data.keys():
                deck.share = data['share']
            db.session.commit()
            decks = Deck.query.order_by(desc(Deck.id)).filter_by(userId=userId).all()
            return {'deck': deck.to_dict(), 'decks': [deck.to_dict() for deck in decks]}
              
    elif request.method == 'DELETE':
        deck = Deck.query.get(deckId)
        db.session.delete(deck)
        db.session.commit()
        decks = Deck.query.order_by(desc(Deck.id)).filter_by(userId=userId).all()
        return {'decks': [deck.to_dict() for deck in decks]}
    else:
        raise Exception('Invalid request method, try a different route')


# <<<<< User Cards >>>>>

# get current decks cards
@user_routes.route('/<int:userId>/decks/<int:deckId>/cards')
@login_required
def get_cards(userId, deckId):
    cards = Card.query.order_by(desc(Card.id)).filter_by(userId=userId, deckId=deckId).all()
    return {'cards': [card.to_dict() for card in cards]}

# create a new card
@user_routes.route('/<int:userId>/decks/<int:deckId>/cards', methods=['POST'])
@login_required
def post_cards(userId, deckId):
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['userId'].data = userId
    form['deckId'].data = deckId
    if form.validate_on_submit() and form.validate_front_and_back():
        data = request.get_json()
        card = Card(front=data['front'], back=data['back'], userId=userId,  deckId=deckId)
        db.session.add(card)
        db.session.commit()
        cards = Card.query.order_by(desc(Card.id)).filter_by(userId=userId, deckId=deckId).all()
        return {'cards': [card.to_dict() for card in cards]}
    else: 
        return jsonify({'errors': form.errors})

# edit or delete a card
@user_routes.route('/<int:userId>/decks/<int:deckId>/cards/<int:cardId>', methods=['PATCH', 'DELETE'])
@login_required
def patch_and_delete_cards(userId, deckId, cardId):

    if request.method == 'PATCH':
        form = CardForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['userId'].data = userId
        form['deckId'].data = deckId
        data = request.get_json()

        if data['editFront'] == True:
            if form.validate_on_submit() and form.validate_front_and_back():
                card = Card.query.get(cardId)
                if 'front' in data.keys():
                    card.front = data['front']
                db.session.commit()
                cards = Card.query.order_by(desc(Card.id)).filter_by(userId=userId, deckId=deckId).all()
                return {'cards': [card.to_dict() for card in cards]}
            else: 
                return jsonify({'errors': form.errors})

        elif data['editBack'] == True:
            if form.validate_on_submit() and form.back_exists():
                card = Card.query.get(cardId)
                if 'back' in data.keys():
                    card.back = data['back']
                db.session.commit()
                cards = Card.query.order_by(desc(Card.id)).filter_by(userId=userId, deckId=deckId).all()
                return {'cards': [card.to_dict() for card in cards]}
            else: 
                return jsonify({'errors': form.errors})

    elif request.method == 'DELETE':
        card = Card.query.get(cardId)
        db.session.delete(card)
        db.session.commit()
        cards = Card.query.order_by(desc(Card.id)).filter_by(userId=userId, deckId=deckId).all()
        return {'cards': [card.to_dict() for card in cards]}
    else:
        raise Exception('Invalid request method, try a different route')


# <<<<< User Classmates >>>>>

# get all classmates
@user_routes.route('/<int:userId>/classmates')
@login_required
def get_classmates(userId):
    classmates = Classmate.query.filter_by(user1=userId).all()
    return {'classmates': [classmate.to_dict() for classmate in classmates]}


# get single classmate
@user_routes.route('/classmates/<int:classmateId>')
@login_required
def get_classmate(classmateId):
    classmate = User.query.filter_by(id=classmateId).first()
    return classmate.to_dict()


# send a friend request to classmate, accept/refuse friend request, remove a classmate from list.
@user_routes.route('/<int:userId>/classmates/<int:classmateId>', methods=['POST', 'PATCH', 'DELETE'])
@login_required
def post_patch_delete_classmates(userId, classmateId):
    data = request.get_json()

    if request.method == 'POST':
        form = ClassmateForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['user1'].data = userId
        form['user2'].data = classmateId
        if form.validate_on_submit() and form.friendship_exists():
            classmate1 = Classmate(user1=userId, user2=classmateId, requestor=True)
            classmate2 = Classmate(user1=classmateId, user2=userId)
            db.session.add(classmate1)
            db.session.add(classmate2)
            db.session.commit()
            classmates = Classmate.query.filter_by(user1=userId).all()
            return {'classmates': [classmate.to_dict() for classmate in classmates]}
        else:
            return jsonify({'errors': form.errors})

    elif request.method == 'PATCH':
        friendship1 = Classmate.query.filter_by(user1=userId, user2=classmateId).first()
        friendship2 = Classmate.query.filter_by(user1=classmateId, user2=userId).first()
        if 'accept' in data.keys() and data['accept'] == True and friendship1.requestor == False:
            friendship1.accepted = True
            friendship2.accepted = True
            db.session.commit()
            classmates = Classmate.query.filter_by(user1=userId).all()
            return {'classmates': [classmate.to_dict() for classmate in classmates]}
        elif 'accept' in data.keys() and data['accept'] == False:
            db.session.delete(friendship1)
            db.session.delete(friendship2)
            db.session.commit()
            classmates = Classmate.query.filter_by(user1=userId).all()
            return {'classmates': [classmate.to_dict() for classmate in classmates]}
        else:
            raise Exception('Did not include "accept" in data obj')

    elif request.method == 'DELETE':
        friendship1 = Classmate.query.filter_by(user1=userId, user2=classmateId).first()
        friendship2 = Classmate.query.filter_by(user1=classmateId, user2=userId).first()
        if friendship1 and friendship2:
            db.session.delete(friendship1)
            db.session.delete(friendship2)
            db.session.commit()
            classmates = Classmate.query.filter_by(user1=userId).all()
            return {'classmates': [classmate.to_dict() for classmate in classmates]}
        else:
            raise Exception('Friendship does not exist')
    else:
        raise Exception('Invalid request method, try a different route')

        