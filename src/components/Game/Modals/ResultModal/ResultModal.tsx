import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  generateRightLowerCard,
  generateRightUpperCard,
  resetLeftLowerCards,
  resetLeftUpperCards,
} from "../../../../redux/cells/slice";
import {
  lockDrawMore,
  lockEnough,
  unlockPlay,
} from "../../../../redux/buttons/slice";
import { setChipsBalance } from "../../../../redux/chipsBalance/slice";
import { setDeck } from "../../../../redux/deck/slice";
import freshDeck from "../../../../utils/deck";
import { setPossibleBlackjack } from "../../../../redux/possibleBlackjack/slice";
import "./ResultModal.scss";
import { showResultModal } from "../../../../redux/modals/slice";

const ResultModal = () => {
  const resultModal = useAppSelector((state) => state.modal.resultModal);

  const dispatch = useAppDispatch();

  const resetTable = () => {
    dispatch(resetLeftLowerCards());
    dispatch(resetLeftUpperCards());
    dispatch(generateRightLowerCard(null));
    dispatch(generateRightUpperCard(null));
  };

  const { fiftyStatus, hundredStatus } = useAppSelector(
    (state) => state.bettingOptions
  );

  const chipsBalance = useAppSelector((state) => state.chipsBalance);

  let chosenBetOption: number;
  if (fiftyStatus) {
    chosenBetOption = 50;
  } else if (hundredStatus) {
    chosenBetOption = 100;
  } else {
    chosenBetOption = 250;
  }

  const result = useAppSelector((state) => state.result);

  let resultText;

  if (result === "WIN") resultText = `YOU WIN ${chosenBetOption * 2}`;
  else if (result === "LOSE") resultText = "YOU LOSE";
  else if (result === "DRAW") resultText = "DRAW";
  else if (result === "WIN-BLACKJACK")
    resultText = `BLACKJACK! YOU WIN ${chosenBetOption * 3}`;
  else resultText = "BLACKJACK! YOU LOSE";
  useEffect(() => {
    if (resultModal === true) {
      if (result === "WIN") {
        dispatch(setChipsBalance(chipsBalance + chosenBetOption * 2));
      } else if (result === "WIN-BLACKJACK") {
        dispatch(setChipsBalance(chipsBalance + chosenBetOption * 3));
      } else if (result === "DRAW") {
        dispatch(setChipsBalance(chipsBalance + chosenBetOption));
      }
    }
  }, [resultModal]);
  return (
    <div
      className={`overlay ${resultModal ? "show" : ""}`}
      onClick={() => {
        dispatch(showResultModal(false));
        resetTable();
        dispatch(unlockPlay());
        dispatch(lockDrawMore());
        dispatch(lockEnough());
        dispatch(setDeck(freshDeck()));
      }}
    >
      <div
        className={`modal-v2 ${resultModal ? "show" : ""}`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="modal__text">
          <h1>
            {resultText}
            {(resultText === `YOU WIN ${chosenBetOption * 2}` ||
              resultText === `BLACKJACK! YOU WIN ${chosenBetOption * 3}`) && (
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 36 36"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>chip</title>
                <desc>Created with Sketch.</desc>
                <defs>
                  <linearGradient
                    x1="50%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                    id="linearGradient-1"
                  >
                    <stop stopColor="#7AA0FA" offset="0%"></stop>
                    <stop stopColor="#4466F3" offset="100%"></stop>
                  </linearGradient>
                  <linearGradient
                    x1="50%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                    id="linearGradient-2"
                  >
                    <stop stopColor="#2F6DC8" offset="0%"></stop>
                    <stop stopColor="#153B97" offset="100%"></stop>
                  </linearGradient>
                  <linearGradient
                    x1="50%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                    id="linearGradient-3"
                  >
                    <stop stopColor="#F1F1F5" offset="0%"></stop>
                    <stop stopColor="#DEDEE7" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g
                  id="icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="ui-gambling-website-lined-icnos-casinoshunter"
                    transform="translate(-212.000000, -2034.000000)"
                    fillRule="nonzero"
                  >
                    <g id="4" transform="translate(50.000000, 1871.000000)">
                      <g
                        id="chip"
                        transform="translate(162.000000, 163.000000)"
                      >
                        <path
                          d="M18,0 C27.9411255,0 36,8.0588745 36,18 C36,27.9411255 27.9411255,36 18,36 C8.0588745,36 0,27.9411255 0,18 C0,8.0588745 8.0588745,0 18,0 Z"
                          fill="url(#linearGradient-1)"
                        ></path>
                        <path
                          d="M18,0 C27.9411255,0 36,8.0588745 36,18 C36,27.9411255 27.9411255,36 18,36 C8.0588745,36 0,27.9411255 0,18 C0,8.0588745 8.0588745,0 18,0 Z M11.4154881,25.5264157 L11.363961,25.5857864 L11.363961,25.5857864 L7.17099661,29.7786028 C9.79140625,32.1890051 13.2182878,33.7362173 17.0007031,33.9693014 L16.9998991,27.9506147 C14.87132,27.7392548 12.9390968,26.8604356 11.4154881,25.5264157 Z M19.0010997,27.9505155 L19.0002994,33.9692396 C22.925065,33.7271385 26.4669767,32.0701301 29.1222185,29.5020305 C29.0608822,29.4632983 29.0030543,29.4172679 28.9497475,29.363961 L24.8611693,25.2749494 C23.2982607,26.7495002 21.2603027,27.725957 19.0010997,27.9505155 Z M8.04918711,18.9981033 L8,19 L8,19 L2.03076045,19.0002994 C2.24970242,22.5496273 3.62580276,25.7858445 5.78643882,28.3363285 L9.94974747,24.1715729 C9.98450001,24.1368203 10.021174,24.1051604 10.0594276,24.0765931 C8.95753652,22.6417122 8.23746562,20.8980959 8.04918711,18.9981033 Z M26.1748157,23.760984 L30.363961,27.9497475 C30.3954739,27.9812604 30.4244439,28.0143532 30.450871,28.048771 C32.4750842,25.5443773 33.758451,22.4174506 33.9692396,19.0002994 L28,19 L27.9508129,18.9981033 C27.7761783,20.7604098 27.1440331,22.3881828 26.1748157,23.760984 Z M18,10 C13.581722,10 10,13.581722 10,18 C10,22.418278 13.581722,26 18,26 C22.418278,26 26,22.418278 26,18 C26,13.581722 22.418278,10 18,10 Z M2.03069864,17.0007031 L8,17 L8.04908817,17.0028956 C8.23721326,15.1025152 8.95734359,13.3585395 10.0584695,11.9219783 C10.021174,11.8948396 9.98450001,11.8631797 9.94974747,11.8284271 L9.94974747,11.8284271 L5.78643882,7.66367152 C3.62559935,10.2143956 2.24944332,13.4509821 2.03069864,17.0007031 Z M30.0317159,7.45274452 L25.7753575,11.7110832 C26.9701153,13.1863978 27.7534815,15.0085168 27.9509118,17.0028956 L28,17 L28,17 L33.9693014,17.0007031 C33.7444815,13.3523965 32.2970686,10.0348592 30.0317159,7.45274452 Z M7.17099661,6.22139717 L11.363961,10.4142136 C11.3828161,10.4330687 11.4007609,10.4524894 11.4177953,10.4724211 C12.9398117,9.13893841 14.8731334,8.25992054 17.0028956,8.04908817 C17.0004244,8.03390856 17,8.01700384 17,8 L17.0007031,2.03069864 C13.2182878,2.26378265 9.79140625,3.81099485 7.17099661,6.22139717 Z M19.0002994,2.03076045 L19,8 L18.9981033,8.04918711 C21.0277704,8.25031562 22.8789873,9.0583033 24.3677637,10.2891597 L28.6230253,6.03518112 C26.0304264,3.73165284 22.6839962,2.25799103 19.0002994,2.03076045 Z"
                          fill="url(#linearGradient-2)"
                        ></path>
                        <path
                          d="M18.6783702,17.0942656 C17.665674,16.713159 17.3240644,16.4829779 17.3240644,16.1817907 C17.3240644,15.8298793 17.6451509,15.6362777 18.2288531,15.6362777 C18.5961972,15.6362777 18.9403622,15.6870221 19.2806841,15.7910664 C19.4784909,15.8520523 19.6993561,15.8286117 19.8804427,15.7274849 C20.0622133,15.6253924 20.1963984,15.4513682 20.2484306,15.2490543 L20.2593561,15.2060362 C20.3710664,14.7716499 20.1090543,14.3250101 19.6750101,14.2100604 C19.3770221,14.1316901 19.0450302,14.0803622 18.6867404,14.0580483 L18.6867404,13.7087324 C18.6867606,13.318008 18.3685915,13 17.9777867,13 C17.5867606,13 17.2688934,13.318008 17.2688934,13.7087324 L17.2688934,14.1584306 C16.0205433,14.43833 15.25,15.2844064 15.25,16.3850302 C15.25,17.7602213 16.4440443,18.3384507 17.484004,18.6883903 C18.3354728,18.9761167 18.6671831,19.2348893 18.6671831,19.611167 C18.6671831,19.9980885 18.2844266,20.2289135 17.6432797,20.2289135 C17.2110664,20.2289135 16.7698994,20.1492958 16.3313682,19.9926559 C16.1361167,19.9226559 15.9133199,19.9386922 15.7303018,20.0356539 C15.5450704,20.1338833 15.4092153,20.3066398 15.3572233,20.5089135 L15.3334809,20.6026761 C15.2232998,21.0316097 15.4680282,21.4733803 15.8902213,21.6088934 C16.2954125,21.7386318 16.7593159,21.8247082 17.2088531,21.854507 L17.2088531,22.2879879 C17.2088531,22.6787123 17.5270221,22.9965996 17.9174849,22.9965996 C18.3085513,22.9965996 18.6263783,22.6787123 18.6263783,22.287666 L18.6263783,21.7566398 C19.9222334,21.494004 20.753501,20.5952918 20.753501,19.4436016 C20.753501,18.3101811 20.1322133,17.6070221 18.6783702,17.0942656 Z"
                          id="Path"
                          fill="url(#linearGradient-3)"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            )}
          </h1>
        </div>
        <button
          className="button modal__button"
          onClick={() => {
            dispatch(showResultModal(false));
            resetTable();
            dispatch(unlockPlay());
            dispatch(lockDrawMore());
            dispatch(lockEnough());
            dispatch(setDeck(freshDeck()));
            dispatch(setPossibleBlackjack(false));
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
