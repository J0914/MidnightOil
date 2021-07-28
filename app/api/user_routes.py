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
    if form.validate_on_submit():
        data = request.get_json()
        notebook = Notebook(userId=userId, title=data['title'])
        db.session.add(notebook)
        db.session.commit()
        user = User.query.get(userId)
        return user.to_dict()
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
            user = User.query.get(userId)
            return user.to_dict()
        else:
            return jsonify({'errors': form.errors})
    elif request.method == 'DELETE':
        notebook = Notebook.query.get(notebookId)
        db.session.delete(notebook)
        db.session.commit()
        user = User.query.get(userId)
        return user.to_dict()
    else:
        raise ValueError('Invalid request method, try a different route')


