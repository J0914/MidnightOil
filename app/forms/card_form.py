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
            self.front.errors.append('The front of this card is identical to another card in this deck.')
            return False
        elif back:
            self.back.errors.append('The back of this card is identical to another card in this deck.')
            return False
        else:
            return True

    def validate_front_and_back(self):
        front = self.front.data
        back = self.back.data
        if front == back:
            self.back.errors.append('The front and back of this card are identical.')
            return False
        elif front == '':
            self.front.errors.append('Please enter a value for the front of this card.')
            return False
        elif back == '':
            self.back.errors.append('Please enter a value for the back of this card.')
            return False
        else:
            return True
        front = self.front.data