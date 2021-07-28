from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Notebook

class NotebookForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    userId = IntegerField('userId')

    def title_exists(self):
        title = self.title.data
        userId = self.userId.data
        notebook = Notebook.query.filter_by(userId=userId, title=title).first()
        if notebook:
            self.title.errors.append('Notebook with that title already exists.')
            return False
        else:
            return True