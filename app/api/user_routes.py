from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Notebook, Note, Deck, Card, Classmate

user_routes = Blueprint('users', __name__)

# User Specific

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# User Notebooks

@user_routes.route('/<int:userId>/notebooks')
@login_required
def notebooks(userId):
    notebooks = Notebook.query.where(userId=userId).all()
    return {'notebooks': [notebooks.to_dict() for notebook in notebooks]}