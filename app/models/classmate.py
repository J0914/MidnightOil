from .db import db
import datetime

class Classmate(db.Model):
    __tablename__ = 'classmates'

    id = db.Column(db.Integer, primary_key=True)
    user1 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user2 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    accepted = db.Column(db.Boolean, default=False, nullable=False)
    requestor = db.Column(db.Boolean, default=False, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user1': self.user1,
            'user2': self.user2,
            'accepted': self.accepted,
            'requestor': self.requestor,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }