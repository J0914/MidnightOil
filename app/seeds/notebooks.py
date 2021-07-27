from app.models import db, Notebook


# Adds a demo user, you can add other users here if you want
def seed_Notebooks():
    one = Notebook(
        title='Python', userId='1')
    two = Notebook(
        title='Redux', userId='1')
    three = Notebook(
        title='React', userId='1')
    four = Notebook(
        title='ajax', userId='2')
    five = Notebook(
        title='websockets', userId='2')
    six = Notebook(
        title='codeRef', userId='2')
    ten = Notebook(
        title='DSA', userId='2')
    seven = Notebook(
        title='mod1', userId='3')
    eight = Notebook(
        title='mod2', userId='3')
    nine = Notebook(
        title='mod6', userId='3')

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.add(five)
    db.session.add(six)
    db.session.add(seven)
    db.session.add(eight)
    db.session.add(nine)
    db.session.add(ten)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_Notebooks():
    db.session.execute('TRUNCATE Notebooks RESTART IDENTITY CASCADE;')
    db.session.commit()