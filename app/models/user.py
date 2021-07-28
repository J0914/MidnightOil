from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    fName = db.Column(db.String(50), nullable=False)
    lName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    notebooks = db.relationship('Notebook', backref='user', lazy=True)
    notes = db.relationship('Note', backref='user', lazy=True)
    decks = db.relationship('Deck', backref='user', lazy=True)
    cards = db.relationship('Card', backref='user', lazy=True)
    
    friends = db.relationship(
        'User',
        secondary='classmates',
        primaryjoin='User.id == Classmate.user1',
        secondaryjoin='User.id == Classmate.user2',
        backref=db.backref('classmates', lazy='dynamic'),
        lazy='dynamic'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'fName': self.fName,
            'lName': self.lName,
            'email': self.email,
            'notebooks': {notebook.id: notebook.to_dict() for notebook in self.notebooks},
            'decks': {deck.id: deck.to_dict() for deck in self.decks},
        }
