from app.models import db, Deck


# Adds a demo user, you can add other users here if you want
def seed_Decks():
    one = Deck(
        title='week 17', userId='1')
    two = Deck(
        title='binary trees', userId='1')
    three = Deck(
        title='async', userId='1')
    four = Deck(
        title='IIFES', userId='2')
    five = Deck(
        title='Hoisting in JS', userId='2')
    six = Deck(
        title='networkDNS', userId='2')
    ten = Deck(
        title='TDD', userId='2')
    seven = Deck(
        title='Sorting Alogorithms', userId='3')
    eight = Deck(
        title='List, stacks, queues', userId='3')
    nine = Deck(
        title='layout', userId='3')

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
def undo_Decks():
    db.session.execute('TRUNCATE Decks RESTART IDENTITY CASCADE;')
    db.session.commit()