import React from "react";
import { ICard } from "../../../classes/CardClass";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { addLeftUpperCard } from "../../../redux/cells/slice";
import { CounterAction } from "../../../redux/counters/slice";
import { setDeck } from "../../../redux/deck/slice";
import { setResult } from "../../../redux/result/slice";
import { showErrorModal, showResultModal } from "../../../redux/modals/slice";
import { setTextError } from "../../../redux/errorText/slice";
import "./Button.scss";

const EnoughButton = () => {
  const dispatch = useAppDispatch();

  const enoughState = useAppSelector(
    (state) => state.unlockButtons.unlockEnough
  );

  const { counterUpper, counterLower } = useAppSelector(
    (state) => state.counter
  );

  const { leftUpperCards, rightUpperCard } = useAppSelector(
    (state) => state.cells
  );

  const deck = useAppSelector((state) => state.deck);
  const drawRandomCard = (deck: ICard[]) => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const randomCard = deck[randomIndex];
    dispatch(
      setDeck(
        deck.filter((el) => {
          return el !== randomCard;
        })
      )
    );
    return randomCard;
  };

  let deckRef = deck;

  const possibleBlackjack = useAppSelector((state) => state.possibleBlackjack);

  const onClickEnough = () => {
    let counterUpperRef = 0;
    let leftUpperCardRandom: ICard;
    let leftUpperCardsRef: ICard[] = [];
    let rightUpperCardRef: ICard = { value: 10, suit: "spade" };
    if (leftUpperCards) {
      leftUpperCardsRef = [...leftUpperCards];
    }
    if (rightUpperCard) {
      rightUpperCardRef = rightUpperCard;
    }
    const setCounterUpperRef = (arg: CounterAction) => {
      arg.forEach((el) => {
        if (Array.isArray(el)) {
          el.forEach((card) => {
            if (card.value === 11 && counterUpperRef >= 11) {
              counterUpperRef++;
            } else {
              counterUpperRef += card.value > 11 ? 10 : card.value;
            }
          });
        } else {
          if (el !== null) {
            if (el.value === 11 && counterUpperRef >= 11) {
              counterUpperRef++;
            } else {
              counterUpperRef += el.value > 11 ? 10 : el.value;
            }
          }
        }
      });
    };
    if (enoughState) {
      if (counterUpper < 17) {
        while (counterUpperRef < 17) {
          counterUpperRef = 0;
          leftUpperCardRandom = drawRandomCard(deckRef);
          deckRef = deckRef.filter(
            (card: ICard) => card !== leftUpperCardRandom
          );
          dispatch(addLeftUpperCard(leftUpperCardRandom));
          setCounterUpperRef([
            rightUpperCardRef,
            [...leftUpperCardsRef, leftUpperCardRandom],
          ]);
          leftUpperCardsRef = [...leftUpperCardsRef, leftUpperCardRandom];
          if (possibleBlackjack) {
            if (
              (leftUpperCardsRef[0].value === 11 ||
                rightUpperCardRef.value === 11) &&
              (leftUpperCardsRef[0].value > 11 ||
                leftUpperCardsRef[0].value === 10 ||
                rightUpperCardRef.value > 11 ||
                rightUpperCardRef.value === 10)
            ) {
              dispatch(setResult("DRAW"));
              dispatch(showResultModal(true));
              return;
            } else {
              dispatch(setResult("WIN-BLACKJACK"));
              dispatch(showResultModal(true));
              return;
            }
          } else if (
            (leftUpperCardsRef[0].value === 11 ||
              rightUpperCardRef.value === 11) &&
            (leftUpperCardsRef[0].value > 11 ||
              leftUpperCardsRef[0].value === 10 ||
              rightUpperCardRef.value > 11 ||
              rightUpperCardRef.value === 10)
          ) {
            dispatch(setResult("LOSE-BLACKJACK"));
            dispatch(showResultModal(true));
            return;
          }
        }
        if (counterUpperRef <= 21) {
          if (counterUpperRef > counterLower) {
            dispatch(setResult("LOSE"));
          } else if (counterUpperRef < counterLower) {
            dispatch(setResult("WIN"));
          } else if (counterUpperRef === counterLower) {
            dispatch(setResult("DRAW"));
          }
          dispatch(showResultModal(true));
        }
      } else {
        dispatch(showResultModal(true));
        if (counterUpper > counterLower) {
          dispatch(setResult("LOSE"));
        } else if (counterUpper < counterLower) {
          dispatch(setResult("WIN"));
        } else {
          dispatch(setResult("DRAW"));
        }
      }
    } else {
      dispatch(setTextError("Enough button is locked."));
      dispatch(showErrorModal(true));
    }
  };
  return (
    <button
      className="button"
      onClick={() => {
        onClickEnough();
      }}
    >
      Enough
    </button>
  );
};

export default EnoughButton;
