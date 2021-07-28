from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Notebook, Note, Deck, Card, Classmate
from app.forms import NotebookForm, NoteForm

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
    if form.validate_on_submit():
        data = request.get_json()
        if data['share'] == 'False':
            data['share'] = False
        if data['share'] == 'True':
            data['share'] = True
        note = Note(userId=userId, title=data['title'], body=data['body'], notebookId=notebookId, share=data['share'])
        db.session.add(note)
        db.session.commit()
        notebooks = Notebook.query.filter_by(userId=userId).all()
        return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
    else: 
        return jsonify({'errors': form.errors})
