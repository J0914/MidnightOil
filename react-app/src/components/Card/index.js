import React, {useState} from 'react';
import ReactCardFlip from 'react-card-flip';
import CardFront from './CardFront';
import CardBack from './CardBack';

import styles from '../../css-modules/card.module.css';

const Card = ({cardInterval, studyMode, isDark, setIsDark, card, deckId, userId, i}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    React.useEffect(() => {
        let loop;
        if (studyMode) {
			loop = setInterval(()=>{
				setIsFlipped(!isFlipped)
			}, cardInterval);
	
			return () => clearInterval(loop); 
		} else {
			loop = null;
		}
    }, [studyMode, cardInterval, isFlipped]);

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }

    return (
        <div className={styles.scene}>
            <div className={styles.card}>
                {!isFlipped && <CardFront isFlipped={isFlipped} isDark={isDark} setIsDark={setIsDark} i={i} cardId={card.id} deckId={deckId} userId={userId} back={card.back} body={card.front} handleClick={handleClick} />}
                {isFlipped && <CardBack isFlipped={isFlipped} isDark={isDark} setIsDark={setIsDark} i={i} cardId={card.id} deckId={deckId} userId={userId} front={card.front} body={card.back} handleClick={handleClick} />}
            </div>
        </div>

        // <ReactCardFlip flipSpeedFrontToBack={0.6} flipSpeedBackToFront={0.6} infinite={true} isFlipped={isFlipped} flipDirection='vertical'>
        //     <CardFront isDark={isDark} setIsDark={setIsDark} i={i} cardId={card.id} deckId={deckId} userId={userId} back={card.back} body={card.front} handleClick={handleClick}>
        //     </CardFront>
        //     <CardBack isDark={isDark} setIsDark={setIsDark} i={i} cardId={card.id} deckId={deckId} userId={userId} front={card.front} body={card.back} handleClick={handleClick}>
        //     </CardBack>
        // </ReactCardFlip>

    )
}

export default Card;