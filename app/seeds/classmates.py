from app.models import db, Classmate


# Adds a demo , you can add other Classmates here if you want
def seed_Classmates():
    one = Classmate(
        user1=1, user2=2, status=True, unique=12)

    db.session.add(one)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the Classmates table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_Classmates():
    db.session.execute('TRUNCATE Classmates RESTART IDENTITY CASCADE;')
    db.session.commit()