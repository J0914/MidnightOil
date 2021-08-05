import React, {useState} from 'react';
import ReactCardFlip from 'react-card-flip';
import CardFront from './CardFront';
import CardBack from './CardBack';

const Card = ({isDark, setIsDark, card, deckId, userId, i}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }

    return (
        <ReactCardFlip flipSpeedFrontToBack={0.6} flipSpeedBackToFront={0.6} infinite={true} isFlipped={isFlipped} flipDirection='vertical'>
            <CardFront isDark={isDark} setIsDark={setIsDark} i={i} cardId={card.id} deckId={deckId} userId={userId} back={card.back} body={card.front} handleClick={handleClick}>
            </CardFront>
            <CardBack isDark={isDark} setIsDark={setIsDark} i={i} cardId={card.id} deckId={deckId} userId={userId} front={card.front} body={card.back} handleClick={handleClick}>
            </CardBack>
        </ReactCardFlip>
    )
}

export default Card;