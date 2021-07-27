from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    Geralt = User(
        username='Witcher', fName='Geralt', lName='Of Rivia', email='demo@aa.io', password='password')
    Yennifer = User(
        username='AretuzasFinest', fName='Yennifer', lName='Of Vengerberg', email='marnie@aa.io', password='password')
    Ciri = User(
        username='PrincessOfCintra', fName='Ciri', lName='Riannon', email='bobbie@aa.io', password='password')

    db.session.add(Geralt)
    db.session.add(Yennifer)
    db.session.add(Ciri)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
