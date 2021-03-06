from .db import db
import datetime

class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), nullable=False)
    body = db.Column(db.Text, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    notebookId = db.Column(db.Integer, db.ForeignKey('notebooks.id'), nullable=False)
    share = db.Column(db.Boolean, default=False, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'userId': self.userId,
            'notebookId': self.notebookId,
            'share': self.share,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }