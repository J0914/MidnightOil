from app.models import db, Classmate


# Adds a demo , you can add other Classmates here if you want
def seed_Classmates():
    one = Classmate(
        userId=1, classmateId=2, unique=12)
    two = Classmate(
        userId=2, classmateId=1, unique=21)

    db.session.add(one)
    db.session.add(two)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the Classmates table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_Classmates():
    db.session.execute('TRUNCATE Classmates RESTART IDENTITY CASCADE;')
    db.session.commit()