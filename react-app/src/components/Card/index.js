import React, {useState, useEffect} from 'react';
// import ReactCardFlip from 'react-card-flip';
import CardFront from './CardFront';
import CardBack from './CardBack';

import styles from '../../css-modules/card.module.css';

const Card = ({cardInterval, studyMode, isDark, setIsDark, card, deckId, userId, i}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [countdown, setCountdown] = useState(cardInterval);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        let loop;

        if (studyMode) {
			loop = setInterval(()=>{
				setIsFlipped(!isFlipped)
			}, cardInterval)
	
			return () => clearInterval(loop); 
		} else {
			loop = null;
		}
    }, [studyMode, cardInterval, isFlipped]);

    const handleClick = (e) => {
        e.preventDefault();
        setAnimate(true);
        setIsFlipped(!isFlipped);
    }

    useEffect(() => {
        if (studyMode) {
            if (isFlipped) setAnimate(true);
            if (!isFlipped) setAnimate(false);
        }
    }, [isFlipped])

    useEffect(() => {
        setCountdown(cardInterval)
    }, [cardInterval, isFlipped, studyMode])

    useEffect(() => {
        
        let interval;
        if (studyMode) {
            interval = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1000)
            }, 1000)

            return () => clearInterval(interval)
        } else {
            interval = null;
        }

    }, [studyMode])

    return (
        <div className={styles.scene}>
            <div className={styles.card}>
                {!isFlipped && <CardFront  animate={animate} countdown={countdown} isFlipped={isFlipped} isDark={isDark} setIsDark={setIsDark} i={i} cardId={card.id} deckId={deckId} userId={userId} back={card.back} body={card.front} handleClick={handleClick} />}
                {isFlipped && <CardBack animate={animate} countdown={countdown} isFlipped={isFlipped} isDark={isDark} setIsDark={setIsDark} i={i} cardId={card.id} deckId={deckId} userId={userId} front={card.front} body={card.back} handleClick={handleClick} />}
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