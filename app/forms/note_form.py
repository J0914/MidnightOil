from re import I
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Note

class NoteForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()], )
    body = TextAreaField('body', validators=[DataRequired()])
    share = BooleanField('share', default=False)
    userId = IntegerField('userId')

    def title_exists(self):
        title = self.title.data
        userId = self.userId.data
        notebook = Note.query.filter_by(userId=userId, title=title).first()
        if notebook:
            self.title.errors.append('Note with that title already exists.')
            return False
        else:
            return True

    def validate_title_and_body(self):
        title = self.title.data
        body = self.body.data
        if title == '':
            self.title.errors.append('Please enter a value for the title of this note.')
            return False
        elif body == '':
            self.body.errors.append('Please enter a value for the body of this note.')
            return False
        else:
            return True
