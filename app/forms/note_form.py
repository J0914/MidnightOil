from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Note

# def user_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError('Email address is already in use.')

def title_exists(form, field):
    title = field.data
    note = Note.query.filter_by(title=title).first()
    if note:
         raise ValidationError('A note with that title already exists.')

class NoteForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), title_exists], )
    body = TextAreaField('body', validators=[DataRequired()])
    share = BooleanField('share', validators=[DataRequired()])