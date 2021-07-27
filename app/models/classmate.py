from .db import db
import datetime

class Classmate(db.Model):
    __tablename__ = 'Classmates'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, nullable=False)
    classmateId = db.Column(db.Integer, nullable=False)
    unique = db.Column(db.Integer, nullable=False, unique=True)
    createdAt = db.Column(db.DateTime, default=datetime.datetime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'classmateId': self.classmateId,
            'unique': self.uniqueCheck,
            'createdAt': self.createdAt,
        }