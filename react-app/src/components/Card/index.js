import React, {useState} from 'react';
import ReactCardFlip from 'react-card-flip';
import CardFront from './CardFront';
import CardBack from './CardBack';

const Card = ({card, isDark, deckId, userId, i}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }

    return (
        <ReactCardFlip flipSpeedFrontToBack={0.6} flipSpeedBackToFront={0.6} infinite={true} isFlipped={isFlipped} flipDirection='vertical'>
            <CardFront i={i} isDark={isDark} cardId={card.id} deckId={deckId} userId={userId} back={card.back} body={card.front} isDark={isDark} handleClick={handleClick}>
            
            </CardFront>
            <CardBack i={i} isDark={isDark} cardId={card.id} deckId={deckId} userId={userId} front={card.front} body={card.back} isDark={isDark} handleClick={handleClick}>
            
            </CardBack>
        </ReactCardFlip>
    )
}

export default Card;