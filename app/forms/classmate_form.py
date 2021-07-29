from flask_wtf import FlaskForm
from wtforms import IntegerField, BooleanField
from wtforms.validators import DataRequired
from app.models import Classmate

class ClassmateForm(FlaskForm):
    user1 = IntegerField('user1', validators=[DataRequired()], )
    user2 = IntegerField('user2', validators=[DataRequired()], )
    unique = IntegerField('unique', validators=[DataRequired()])
    status = BooleanField('status', default=False)

    def friendship_exists(self):
        unique = self.unique.data
        friendship = Classmate.query.filter_by(unique=unique).first()
        if friendship:
            self.unique.errors.append('This classmate is already on your list!')
            return False
        else:
            return True