from .db import db
import datetime

the_time = datetime.datetime.now()
class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    front = db.Column(db.String, nullable=False)
    back = db.Column(db.String, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    deckId = db.Column(db.Integer, db.ForeignKey('decks.id'), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'front': self.front,
            'back': self.back,
            'userId': self.userId,
            'deckId': self.deckId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }