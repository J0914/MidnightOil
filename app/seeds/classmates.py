from app.models import db, Classmate


def seed_Classmates():
    one = Classmate(
        user1=1, user2=2, accepted=True, requestor=True)
    two = Classmate(
        user1=2, user2=1, accepted=True, requestor=False)

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