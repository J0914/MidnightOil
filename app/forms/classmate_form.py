from flask_wtf import FlaskForm
from wtforms import IntegerField, BooleanField
from wtforms.validators import DataRequired
from app.models import Classmate

class ClassmateForm(FlaskForm):
    user1 = IntegerField('user1', validators=[DataRequired()], )
    user2 = IntegerField('user2', validators=[DataRequired()], )
    accepted = IntegerField('accepted', default=False)
    requestor = BooleanField('requestor', default=False)

    def friendship_exists(self):
        user1 = self.user1.data
        user2 = self.user2.data
        friendship = Classmate.query.filter_by(user1=user1, user2=user2).first()
        if friendship:
            self.unique.errors.append('This classmate is already on your list!')
            return False
        else:
            return True