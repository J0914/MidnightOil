import React from 'react';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Slideshow = ({cards, isDark, setIsDark, isYoutube, currentCards, deckId, userId}) => {

    const [currentItems, setCurrentItems] = React.useState(null);    
    
    React.useEffect(() => {
        const vids = [
            <iframe key ='1' width="100" height="150" src="https://www.youtube-nocookie.com/embed/5qap5aO4i9A" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
            <iframe key ='2' width="100" height="150" src="https://www.youtube-nocookie.com/embed/M5QY2_8704o" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
            <iframe key ='3' width="100" height="150" src="https://www.youtube-nocookie.com/embed/bLNzGxcY658" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
            <iframe key ='4' width="100" height="150" src="https://www.youtube-nocookie.com/embed/MtT5_PgLJlY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
            <iframe key ='5' width="100" height="150" src="https://www.youtube-nocookie.com/embed/Aey2EfrpvzQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
            <iframe key ='6' width="100" height="150" src="https://www.youtube-nocookie.com/embed/ZVb_yKMivqo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
        ]
    
        if (isYoutube === true) {
            setCurrentItems(vids)
        } else {
            setCurrentItems(cards)
        }
    }, [isYoutube, cards, isDark])

    return (
        <Carousel 
        animationHandler={'fade'}
        showThumbs={false} 
        showArrows={true} 
        infiniteLoop={true}
        useKeyboardArrows={true}
        autoFocus={true}
        >
            {currentItems}
        </Carousel>
    )
}

export default Slideshow;