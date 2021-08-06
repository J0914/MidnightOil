<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import Slideshow from './Slideshow'
import * as deckActions from '../../store/decks'
import {BsPlusCircle, BsDashCircle, BsPencil, BsTrash} from 'react-icons/bs'
import EditDeckForm from './EditDeckForm'
import {Prompt} from 'react-router'
import Card from '../Card'

import styles from '../../css-modules/deckpage.module.css'

const DeckPage = () => {
    const [isDark, setIsDark] = useState(false);
    const [currentCards, setCurrentCards] = useState(null);
    const [currentDeck, setCurrentDeck] = useState(null);
    const [currentTitle, setCurrentTitle] = useState(null);
    const [showCreateCardForm, setShowCreateCardForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const cards = useSelector(state => state.decks.cards);
    const { deckId } = useParams();
    const userId = user?.id


    useEffect(() => {
        if (cards) {
            setCurrentCards(cards.reverse());
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
            history.push('/profile')
        }
    
    }

    const theCards = currentCards?.map((card, i) => (
        (<div key={card.id}>
            <Card isDark={isDark} setIsDark={setIsDark} i={i} deckId={deckId} userId={userId} card={card}/>
        </div>)
    ))

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
                {currentTitle}
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
<<<<<<< HEAD
            <div className={styles.under_header}>
                <p className={styles.hint}>(hint: if you click on a card, you can use your keyboard arrows to change cards!)</p>
                <div id={styles.share_wrapper}>
                    <label htmlFor='public' className={styles.radio_label}>Public</label>
                    <input type="radio" id='public' name="share-btn" checked={currentDeck?.share} value={true} onChange={editShareTrue}></input>
                    <label htmlFor='private' className={styles.radio_label}>Private</label>
                    <input type="radio" id='private' name="share-btn" checked={!currentDeck?.share} value={false} onChange={editShareFalse}></input>
                </div>
=======
            <div>
                <p>(hint: you can use your keyboard arrows to change cards!)</p>
>>>>>>> parent of c8ad10d... bug fixes and style fixes
            </div>
            </div>
            {currentCards?.length ?
            <div id={styles.body}>
            <div id={styles.above_card}>
                <div id={styles.create_btn__wrapper}>
                    <button id='create-card' className={styles.add_card} onClick={createCard}>Create Card   {!showCreateCardForm ? <BsPlusCircle /> : <BsDashCircle />}</button>
                </div>
                <h5 id={styles.card_count}>
                    {currentCards?.length} cards
                </h5>
                <div id={styles.theme_wrapper}>
                    <label htmlFor='light' className={styles.radio_label}>Light Theme</label>
                    <input type="radio" id='light' name="theme" checked={isDark === false} onChange={()=> setIsDark(false)}></input>
                    <label htmlFor='dark' className={styles.radio_label}>Dark Theme</label>
                    <input type="radio" id='dark' name="theme" checked={isDark === true} onChange={()=> setIsDark(true)}></input>
                </div>
            </div>
            <div className={styles.slideshow}>
                <div id={styles.shader}>
                <Slideshow  
                infiniteLoop={true} 
                centerMode={true} 
                centerSlidePercentage={80} 
                showArrows={true}
                currentCards={currentCards}
                setShowCreateCardForm={setShowCreateCardForm}
                deckId={deckId}
                userId={user?.id}
                isYoutube={false}
                isDark={isDark}
                setIsDark={setIsDark}
                cards={theCards}
                />
                </div>
                </div>
            </div>
            :
            <button onClick={createCard} className={styles.create_btn}>Create Your First Card! <BsPlusCircle /></button>
            }
        </div>
        </>
    )
}

=======
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import Slideshow from './Slideshow'
import * as deckActions from '../../store/decks'
import {BsPlusCircle, BsDashCircle, BsPencil, BsTrash} from 'react-icons/bs'
import EditDeckForm from './EditDeckForm'
import {Prompt} from 'react-router'
import Card from '../Card'

import styles from '../../css-modules/deckpage.module.css'

const DeckPage = () => {
    const [isDark, setIsDark] = useState(false);
    const [currentCards, setCurrentCards] = useState(null);
    const [currentDeck, setCurrentDeck] = useState(null);
    const [currentTitle, setCurrentTitle] = useState(null);
    const [showCreateCardForm, setShowCreateCardForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const cards = useSelector(state => state.decks.cards);
    const { deckId } = useParams();
    const userId = user?.id


    useEffect(() => {
        if (cards) {
            setCurrentCards(cards.reverse());
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
            history.push('/profile')
        }
    
    }

    const theCards = currentCards?.map((card, i) => (
        (<div key={card.id}>
            <Card isDark={isDark} setIsDark={setIsDark} i={i} deckId={deckId} userId={userId} card={card}/>
        </div>)
    ))

    const editShareTrue = async (e) => {
        e.preventDefault();
        const deckVals = {
            title: currentTitle,
            share: true,
            onlyShare: true
        }
        const deck = await dispatch(deckActions.editDeck(userId, deckId, deckVals));
        setCurrentDeck(deck)
        setCurrentTitle(currentTitle); 
    }

    const editShareFalse = async (e) => {
        e.preventDefault();
        const deckVals = {
            title: currentTitle,
            share: false,
            onlyShare: true
        }
        const deck = await dispatch(deckActions.editDeck(userId, deckId, deckVals));
        setCurrentDeck(deck)
    }

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
                {currentTitle}
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
                <p className={styles.hint}>(hint: if you click on a card, you can use your keyboard arrows to change cards!)</p>
                <div id={styles.share_wrapper}>
                    <label for='public' className={styles.radio_label}>Public</label>
                    <input type="radio" id='public' name="share-btn" checked={currentDeck?.share} value={true} onChange={editShareTrue}></input>
                    <label for='private' className={styles.radio_label}>Private</label>
                    <input type="radio" id='private' name="share-btn" checked={!currentDeck?.share} value={false} onChange={editShareFalse}></input>
                </div>
            </div>
            </div>
            {currentCards?.length ?
            <div id={styles.body}>
            <div id={styles.above_card}>
                <div id={styles.create_btn__wrapper}>
                    <button id='create-card' className={styles.add_card} onClick={createCard}>Create Card   {!showCreateCardForm ? <BsPlusCircle /> : <BsDashCircle />}</button>
                </div>
                <h5 id={styles.card_count}>
                    {currentCards?.length} cards
                </h5>
                <div id={styles.theme_wrapper}>
                    <label for='light' className={styles.radio_label}>Light Theme</label>
                    <input type="radio" id='light' name="theme" checked={isDark === false} onChange={()=> setIsDark(false)}></input>
                    <label for='dark' className={styles.radio_label}>Dark Theme</label>
                    <input type="radio" id='dark' name="theme" checked={isDark === true} onChange={()=> setIsDark(true)}></input>
                </div>
            </div>
            <div className={styles.slideshow}>
                <div id={styles.shader}>
                <Slideshow  
                infiniteLoop={true} 
                centerMode={true} 
                centerSlidePercentage={80} 
                showArrows={true}
                currentCards={currentCards}
                setShowCreateCardForm={setShowCreateCardForm}
                deckId={deckId}
                userId={user?.id}
                isYoutube={false}
                isDark={isDark}
                setIsDark={setIsDark}
                cards={theCards}
                />
                </div>
                </div>
            </div>
            :
            <button onClick={createCard} className={styles.create_btn}>Create Your First Card! <BsPlusCircle /></button>
            }
            <div className={styles.hint_wrapper}>
            <p className={styles.hint}>(new cards go to the front of the deck!)</p>
            </div>
        </div>
        </>
    )
}

>>>>>>> parent of f1895e1... not finished, reverting main
export default DeckPage;