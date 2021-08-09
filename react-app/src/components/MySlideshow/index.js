import React, {useState, useEffect} from 'react';
import styles from './myslideshow.module.css';
import {BsSkipForwardFill, BsSkipBackwardFill} from 'react-icons/bs'

const MySlideshow = ({slideInterval, studyMode, cards}) => {

	const [currentCards, setCurrentCards] = useState([]);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [currentCard, setCurrentCard] = useState(cards[0]);
	// const [previousCard, setPreviousCard] = useState(null);
	// const [nextCard, setNextCard] = useState(null);

	useEffect(()=>{
		setCurrentCards(cards);
		setCurrentCard(currentCards[currentSlide]);

		// if(currentSlide>0){
		// 	setPreviousCard(currentCards[currentSlide-1]);
		// }else{
		// 		setPreviousCard(currentCards[currentCards.length-1]);
		// }

		// if(currentSlide === currentCards.length-1){
		// 		setNextCard(currentCards[0]);
		// }else{
		// 		setNextCard(currentCards[currentSlide+1]);
		// } 

	}, [cards, currentCards, currentSlide]);

	useEffect(() => {
		let loop;
		if (studyMode) {
			loop = setInterval(()=>{
				if(currentSlide === currentCards.length-1){
						setCurrentSlide(0);
				}else{
						setCurrentSlide(currentSlide+1);
				}
			}, slideInterval);
	
			return () => clearInterval(loop); 
		} else {
			loop = null;
		}
	}, [studyMode, currentCards, currentSlide, slideInterval]);

	useEffect(() => {
		setCurrentSlide(0);
	}, [currentCards])

	function previous(){
		if(currentSlide>0){
				setCurrentSlide(currentSlide-1);
		}else{
				setCurrentSlide(currentCards.length-1);
		}
	}

	function next(){
			if(currentSlide === currentCards.length-1){
					setCurrentSlide(0);
			}else{
					setCurrentSlide(currentSlide+1);
			}
	}

    return (
			<div className={styles.myslideshow_wrapper}>
				<div className={styles.slide_holder}>
					<span onClick={previous} className={styles.btns}><BsSkipBackwardFill /></span>
					<section className={`${styles.slide} ${styles.current_slide}`}>
							<div className={styles.slide_thumbnail}>
								{currentCard}
							</div>
					</section>
						<span onClick={next} className={styles.btns}><BsSkipForwardFill /></span>
				</div>          
			</div>
    );
}

export default MySlideshow;