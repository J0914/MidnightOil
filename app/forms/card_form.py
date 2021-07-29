from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Card

class CardForm(FlaskForm):
    front = TextAreaField('front', validators=[DataRequired()], )
    back = TextAreaField('back', validators=[DataRequired()])
    deckId = IntegerField('deckId')
    userId = IntegerField('userId')

    def card_exists(self):
        front = self.front.data
        back = self.back.data
        deckId = self.deckId.data
        front = Card.query.filter_by(deckId=deckId, front=front).first()
        back = Card.query.filter_by(deckId=deckId, back=back).first()
        if front:
            self.title.errors.append('The front of this card is identical to another card in this deck.')
            return False
        elif back:
            self.title.errors.append('The back of this card is identical to another card in this deck.')
            return False
        else:
            return True