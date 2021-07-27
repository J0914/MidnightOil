from .db import db
import datetime

class Notebook(db.Model):
    __tablename__ = 'Notebooks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    share = db.Column(db.Boolean, default=False, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.datetime, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.datetime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'userId': self.userId,
            'share': self.share,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }