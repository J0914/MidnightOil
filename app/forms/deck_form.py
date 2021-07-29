from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired
from app.models import Deck

class DeckForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    userId = IntegerField('userId')
    share = BooleanField('share')

    def title_exists(self):
        title = self.title.data
        userId = self.userId.data
        deck = Deck.query.filter_by(userId=userId, title=title).first()
        if deck:
            self.title.errors.append('Deck with that title already exists.')
            return False
        else:
            return True