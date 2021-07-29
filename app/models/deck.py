from .db import db
import datetime

class Deck(db.Model):
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    share = db.Column(db.Boolean, default=False, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.now())
    cards = db.relationship('Card', backref='deck', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'userId': self.userId,
            'share': self.share,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'cards': {card.id: card.to_dict() for card in self.cards}
        }