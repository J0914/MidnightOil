from .db import db
import datetime

class Card(db.Model):
    __tablename__ = 'Cards'

    id = db.Column(db.Integer, primary_key=True)
    front = db.Column(db.String, nullable=False)
    back = db.Column(db.String, nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    deckId = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.datetime, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.datetime, nullable=False)

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