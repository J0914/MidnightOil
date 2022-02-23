import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import MySlideshow from '../MySlideshow'
import * as deckActions from '../../store/decks'
import {BsPlusCircle, BsPencil, BsTrash} from 'react-icons/bs'
import EditDeckForm from './EditDeckForm'
import {Prompt} from 'react-router'
import Card from '../Card'
import { BsPauseFill, BsPlayFill} from 'react-icons/bs'
import {AiFillQuestionCircle} from 'react-icons/ai'


import styles from '../../css-modules/deckpage.module.css'

const DeckPage = () => {
    const [isDark, setIsDark] = useState(false);
    const [currentCards, setCurrentCards] = useState(null);
    const [currentDeck, setCurrentDeck] = useState(null);
    const [currentTitle, setCurrentTitle] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [studyMode, setStudyMode] = useState(false);
    const [slideInterval, setSlideInterval] = useState(6000);
    const [cardInterval, setCardInterval] = useState(slideInterval/2);
    const [question, setQuestion] = useState(false)

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const cards = useSelector(state => state.decks.cards);
    const { deckId } = useParams();
    const userId = user?.id

    useEffect(() => {
        setCardInterval(slideInterval/2);
    }, [slideInterval])


    useEffect(() => {
        if (cards) {
            setCurrentCards(cards?.reverse());
        }
    }, [cards])

    useEffect(() => {
        if (currentDeck) {
            setCurrentTitle(currentDeck.title);
        }
    }, [currentDeck, currentTitle])


    useEffect(() => {
        if (user) {

            (async () => {
                const deck = await dispatch(deckActions.getDeck(userId, deckId));
                const cards = await dispatch(deckActions.getCards(userId, deckId));
                setCurrentCards(cards);
                setCurrentDeck(deck)
            })();
        }
    }, [user, dispatch, deckId, userId])

    const createCard = () => {
        const cardVals = {
            front: `Edit me!`,
            back: 'Edit me!'
        }
        dispatch(deckActions.createCard(userId, deckId, cardVals));
    }

    const deleteDeck = () => {
        let answer = window.confirm(`Are you sure you want to delete this deck?`)
        if (answer) {
            dispatch(deckActions.deleteDeck(userId, deckId))
            history.push('/dashboard')
        }
    
    }

    const theCards = currentCards?.map((card, i) => (
        (<div className={styles.card_wrapper} key={card.id}>
            <Card cardInterval={cardInterval} studyMode={studyMode} isDark={isDark} setIsDark={setIsDark} i={i} deckId={deckId} userId={userId} card={card}/>
        </div>)
    ))

    // const editShareTrue = async (e) => {
    //     e.preventDefault();
    //     const deckVals = {
    //         title: currentTitle,
    //         share: true,
    //         onlyShare: true
    //     }
    //     const deck = await dispatch(deckActions.editDeck(userId, deckId, deckVals));
    //     setCurrentDeck(deck)
    //     setCurrentTitle(currentTitle); 
    // }

    // const editShareFalse = async (e) => {
    //     e.preventDefault();
    //     const deckVals = {
    //         title: currentTitle,
    //         share: false,
    //         onlyShare: true
    //     }
    //     const deck = await dispatch(deckActions.editDeck(userId, deckId, deckVals));
    //     setCurrentDeck(deck)
    // }

    return (
        <>
        <Prompt 
        when={isEditing}
        message="Are you sure you want to leave without saving?"
        />
        <div id={styles.deck_wrapper}>
            <div id={styles.deck_header__div}>
            {!isEditing ?
            <h1 id={styles.header}>
                {currentTitle}&nbsp;
            <div className={styles.editing_btns}>
                    <button className={styles.edit_and_delete__btn} onClick={() => setIsEditing(true)}><BsPencil /></button>
                    <button onClick={deleteDeck} className={styles.edit_and_delete__btn}><BsTrash /></button>
                </div>
            </h1>
            :
            <div id={styles.header}>
                <>
                <EditDeckForm currentDeck={currentDeck} deckId={currentDeck?.id} setIsEditing={setIsEditing} currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} setCurrentDeck={setCurrentDeck} />
                </>
            </div>
            }
            <div className={styles.under_header}>
                {currentCards?.length > 0 && 
                <>
                <div id={styles.time_div}>
                    <label className={styles.seconds_label}>Set Study Mode Interval&nbsp;</label>
                    <input onFocus={e => e.target.blur()} step={2} min={6} id={styles.seconds} value={slideInterval/1000} onChange={(e) => setSlideInterval(e.target.value*1000)} type='number' placeholder='seconds' />
                    <label className={styles.seconds_label}>&nbsp;Seconds&nbsp;</label>
                    <div className={styles.question} onMouseEnter={() => setQuestion(true)} onMouseLeave={() => setQuestion(false)}> <AiFillQuestionCircle /></div>
                </div>
                {question && 
                <div className={styles.hint_wrapper}>
                    <label className={styles.seconds_label}>(Card will flip in half as many seconds as the Study Mode Interval)</label>
                </div>}
                </>
                }
                {/* <p className={styles.hint}>(hint: if you click on a card, you can use your keyboard arrows to change cards!)</p>
                <div id={styles.share_wrapper}>
                    <label htmlFor='public' className={styles.radio_label}>Public</label>
                    <input type="radio" id='public' name="share-btn" checked={currentDeck?.share} value={true} onChange={editShareTrue}></input>
                    <label htmlFor='private' className={styles.radio_label}>Private</label>
                    <input type="radio" id='private' name="share-btn" checked={!currentDeck?.share} value={false} onChange={editShareFalse}></input>
                </div> */}
            </div>
            </div>
            {currentCards?.length > 0 ?
            <div id={styles.body}>
            <div id={styles.above_card}>
                <div id={styles.create_btn__wrapper}>
                    <button id='create-card' className={styles.add_card} onClick={createCard}>Create Card&nbsp;<BsPlusCircle /></button>
                </div>
                <h5 id={styles.card_count}>
                    {currentCards?.length} cards
                </h5>
                <div id={styles.theme_wrapper}>
                    <label htmlFor='light' className={styles.radio_label}>Light</label>
                    <input type="radio" id='light' name="theme" checked={isDark === false} onChange={()=> setIsDark(false)}></input>
                    <label htmlFor='dark' className={styles.radio_label}>Dark</label>
                    <input type="radio" id='dark' name="theme" checked={isDark === true} onChange={()=> setIsDark(true)}></input>
                </div>
            </div>
            <div className={styles.slideshow}>
                <div id={styles.shader}>
                <MySlideshow
                cards={theCards}
                studyMode={studyMode}
                setStudyMode={setStudyMode}
                slideInterval={slideInterval}
                setSlideInterval={setSlideInterval}
                />
                </div>
                </div>
            </div>
            :
            <button onClick={createCard} className={styles.create_btn}>Create Your First Card! <BsPlusCircle /></button>
            }
            <div className={styles.study_container}>
                {currentCards?.length > 0 && 
                <div id={styles.study_wrapper}>
                    <label className={styles.study_label}>Study Mode</label>
                    {!studyMode ? 
                    <span onClick={() => setStudyMode(true)} className={styles.btns}><BsPlayFill /></span>
                    :
                    <span onClick={() => setStudyMode(false)} className={styles.btns}><BsPauseFill /></span>
                    }
                </div>}
            </div>
        </div>
        </>
    )
}

export default DeckPage;