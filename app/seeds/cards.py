from app.models import db, Card


# Adds a demo user, you can add other users here if you want
def seed_Cards():
    one = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='1', deckId='1')
    two = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='1', deckId='1')
    three = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='1', deckId='1')
    four = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='1', deckId='2')
    five = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='1', deckId='2')
    six = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='1', deckId='2')
    ten = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='2', deckId='4')
    seven = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='2', deckId='5')
    eight = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='2', deckId='5')
    nine = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='3', deckId='8')
    eleven = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='3', deckId='8')
    twelve = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='3', deckId='8')
    thirteen = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='3', deckId='8')
    fourteen = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='3', deckId='9')
    fifteen = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='3', deckId='9')
    sixteen = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='3', deckId='9')
    seventeen = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='3', deckId='10')
    eighteen = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='3', deckId='10')
    nineteen = Card(
        front='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie dictum nulla, ut aliquam purus viverra sed.', back='Praesent vitae nisl non neque hendrerit efficitur. Nulla dapibus nec massa at aliquet. Praesent vel nisl non elit facilisis placerat. Nunc ac egestas tellus. Vestibulum in massa purus.', userId='3', deckId='10')

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
    db.session.add(eleven)
    db.session.add(twelve)
    db.session.add(thirteen)
    db.session.add(fourteen)
    db.session.add(fifteen)
    db.session.add(sixteen)
    db.session.add(seventeen)
    db.session.add(eighteen)
    db.session.add(nineteen)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_Cards():
    db.session.execute('TRUNCATE Cards RESTART IDENTITY CASCADE;')
    db.session.commit()