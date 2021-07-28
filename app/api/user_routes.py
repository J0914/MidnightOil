from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Notebook, Note, Deck, Card, Classmate
from app.forms import NotebookForm

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

def get_all_notebooks(userId):
    return Notebook.query.where(Notebook.userId == userId).all()

# get all notebooks or post a new one
@user_routes.route('/<int:userId>/notebooks', methods=['GET', 'POST'])
# @login_required
def get_and_post_notebooks(userId):
    if request.method == 'GET':
        notebooks = get_all_notebooks(userId)
        return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
    elif request.method == 'POST':
        form = NotebookForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            print('validated!!!!!!!!!!!!!!!!!!!')
            data = request.get_json()
            print('THE DATA!!!!!!!!!!!!!!!!!!!', data)
            notebook = Notebook(userId=userId, title=data['title'])
            db.session.add(notebook)
            db.session.commit()
            notebooks = get_all_notebooks(userId)
            return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
        else: 
            return jsonify({'errors': form.errors})
    else:
        raise ValueError('Invalid request method, try a different route')

# Edit or Delete a notebook
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
            notebooks = get_all_notebooks(userId)
            return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
    elif request.method == 'DELETE':
        notebook = Notebook.query.get(notebookId)
        db.session.delete(notebook)
        db.session.commit()
        notebooks = get_all_notebooks(userId)
        return {'notebooks': [notebook.to_dict() for notebook in notebooks]}
    else:
        raise ValueError('Invalid request method, try a different route')

    


