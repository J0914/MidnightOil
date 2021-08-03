import React from 'react';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Card from '../Card'

const Slideshow = ({currentCards, isDark, deckId, userId}) => {

    const cards = currentCards?.map(card => (
        (<div key={card.id}>
            <Card deckId={deckId} userId={userId} isDark={isDark} card={card}/>
        </div>)
    ))

    return (
        <Carousel showThumbs={false} showArrows={true} >
            {cards}
        </Carousel>
    )
}

export default Slideshow;