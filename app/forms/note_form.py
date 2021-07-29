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