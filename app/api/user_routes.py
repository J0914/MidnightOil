from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Notebook, Note, Deck, Card, Classmate
from app.forms import NotebookForm, NoteForm, DeckForm

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

# create a new notebook
@user_routes.route('/<int:userId>/notebooks', methods=['POST'])
# @login_required
def post_notebooks(userId):
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['userId'].data = userId
    if form.validate_on_submit() and form.title_exists():
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
        form = NotebookForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            data = request.get_json()
            notebook = Notebook.query.get(notebookId)
            notebook.title = data['title']
            db.session.commit()
            notebooks = Notebook.query.filter_by(userId=userId).all()
            return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
        else:
            return jsonify({'errors': form.errors})
    elif request.method == 'DELETE':
        notebook = Notebook.query.get(notebookId)
        db.session.delete(notebook)
        db.session.commit()
        notebooks = Notebook.query.filter_by(userId=userId).all()
        return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
    else:
        raise ValueError('Invalid request method, try a different route')

# <<<<< User Notes >>>>>

# create a new note
@user_routes.route('/<int:userId>/notebooks/<int:notebookId>/notes', methods=['POST'])
# @login_required
def post_notes(userId, notebookId):
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['userId'].data = userId
    if form.validate_on_submit() and form.title_exists():
        data = request.get_json()
        note = Note(userId=userId, title=data['title'], body=data['body'], notebookId=notebookId, share=data['share'])
        db.session.add(note)
        db.session.commit()
        notebooks = Notebook.query.filter_by(userId=userId).all()
        return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
    else: 
        return jsonify({'errors': form.errors})

# edit or delete a note
@user_routes.route('/<int:userId>/notebooks/<int:notebookId>/notes/<int:noteId>', methods=['PATCH', 'DELETE'])
# @login_required
def patch_and_delete_notes(userId, notebookId, noteId):
    if request.method == 'PATCH':
        form = NoteForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['userId'].data = userId
        if form.validate_on_submit():
            data = request.get_json()
            note = Note.query.get(noteId)
            note.title = data['title']
            note.body = data['body']
            note.share = data['share']
            db.session.commit()
            notebooks = Notebook.query.filter_by(userId=userId).all()
            return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
        else:
            return jsonify({'errors': form.errors})
    elif request.method == 'DELETE':
        note = Note.query.get(noteId)
        db.session.delete(note)
        db.session.commit()
        notebooks = Notebook.query.filter_by(userId=userId).all()
        return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
    else:
        raise ValueError('Invalid request method, try a different route')

# <<<<< User Decks >>>>>

# create a new deck
@user_routes.route('/<int:userId>/decks', methods=['POST'])
# @login_required
def post_decks(userId):
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['userId'].data = userId
    if form.validate_on_submit() and form.title_exists():
        data = request.get_json()
        deck = Deck(userId=userId, title=data['title'], share=data['share'])
        db.session.add(deck)
        db.session.commit()
        decks = Deck.query.filter_by(userId=userId).all()
        return {'decks': [deck.to_dict() for deck in decks]}
    else: 
        return jsonify({'errors': form.errors})

# edit or delete a note
@user_routes.route('/<int:userId>/decks/<int:deckId>', methods=['PATCH', 'DELETE'])
# @login_required
def patch_and_delete_decks(userId, deckId):
    if request.method == 'PATCH':
        form = DeckForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['userId'].data = userId
        if form.validate_on_submit():
            data = request.get_json()
            deck = Deck.query.get(deckId)
            deck.title = data['title']
            deck.share = data['share']
            db.session.commit()
            decks = Deck.query.filter_by(userId=userId).all()
            return {'decks': [deck.to_dict() for deck in decks]}
        else:
            return jsonify({'errors': form.errors})
    elif request.method == 'DELETE':
        deck = Deck.query.get(deckId)
        db.session.delete(deck)
        db.session.commit()
        decks = Deck.query.filter_by(userId=userId).all()
        return {'decks': [deck.to_dict() for deck in decks]}
    else:
        raise ValueError('Invalid request method, try a different route')


# <<<<< User Cards >>>>>

# # create a new note
# @user_routes.route('/<int:userId>/decks/<int:deckId>/cards', methods=['POST'])
# # @login_required
# def post_cards(userId, notebookId):
#     form = NoteForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     form['userId'].data = userId
#     if form.validate_on_submit() and form.title_exists():
#         data = request.get_json()
#         note = Note(userId=userId, title=data['title'], body=data['body'], notebookId=notebookId, share=data['share'])
#         db.session.add(note)
#         db.session.commit()
#         notebooks = Notebook.query.filter_by(userId=userId).all()
#         return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
#     else: 
#         return jsonify({'errors': form.errors})
