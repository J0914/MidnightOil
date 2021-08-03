import React from 'react';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Card from '../../Card'

const Slideshow = ({setShowCreateCardForm, currentCards, isDark, deckId, userId}) => {

    const cards = currentCards?.map((card, i) => (
        (<div key={card.id}>
            <Card i={i} deckId={deckId} userId={userId} isDark={isDark} card={card}/>
        </div>)
    ))

    return (
        <Carousel 
        animationHandler={'fade'}
        showThumbs={false} 
        showArrows={true} 
        infiniteLoop={true}
        useKeyboardArrows={true}
        autoFocus={true}
        >
            {cards}
        </Carousel>
    )
}

export default Slideshow;