from re import I
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Note

class NoteForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()], )
    body = TextAreaField('body', validators=[DataRequired()])
    notebookId = IntegerField('notebookId', validators=[DataRequired()])
    share = BooleanField('share', default=False)
    userId = IntegerField('userId')

    def title_exists(self):
        title = self.title.data
        notebookId = self.notebookId.data
        notebook = Note.query.filter_by(notebookId=notebookId, title=title).first()
        if notebook:
            self.title.errors.append('Note with that title already exists.')
            return False
        else:
            return True

    def validate_title_only(self):
        title = self.title.data
        if title == '':
            self.title.errors.append('Please enter a value for the title of this note.')
            return False
        else:
            return True
