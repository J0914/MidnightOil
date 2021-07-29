from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def username_length(form, field):
    username = field.data
    # checking if username is less than 3 or more than 40 chars.
    if len(username) < 3:
        raise ValidationError('Username must be between 3 and 40 characters.')

def fName_lName_length(form, field):
    fName = form.fName.data
    lName = form.lName.data
    # checking if fName and lName are more than 3 and less than 50 chars.
    if len(fName) < 3 or len(lName) < 3:
        raise ValidationError('First and Last Name must be between 3 and 50 characters.')
    elif len(fName) > 50 or len(lName) > 50:
        raise ValidationError('First and Last Name must be between 3 and 50 characters.')

def email_length(form, field):
    email = form.email.data
    # checking if email and password are more than 3 and less than 255 chars.
    if len(email) < 3 or len(email) > 255:
        raise ValidationError('Email be between 3 and 255 characters.')

def password_length(form, field):
    password = field.data
    # checking if password is more than 3 and less than 255 chars.
    if len(password) < 3 or len(password) > 255:
        raise ValidationError('Password must be between 3 and 255 characters.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), user_exists, email_length])
    fName = StringField('fName', validators=[DataRequired(), fName_lName_length])
    lName = StringField('lName', validators=[DataRequired(), fName_lName_length])
    password = StringField('password', validators=[DataRequired(), password_length])
