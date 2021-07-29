from .db import db
import datetime

class Classmate(db.Model):
    __tablename__ = 'classmates'

    id = db.Column(db.Integer, primary_key=True)
    user1 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user2 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.Boolean, default=False, nullable=False)
    unique = db.Column(db.Integer, nullable=False, unique=True)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user1': self.user1,
            'user2': self.user2,
            'status': self.status,
            'unique': self.uniqueCheck,
            'createdAt': self.createdAt,
        }