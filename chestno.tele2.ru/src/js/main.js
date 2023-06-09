/* eslint-disable no-use-before-define */
// import 'babel-polyfill'
import $, { event } from 'jquery';
import { WOW } from './vendor/wow.min';
import { gtmSet, gaPush } from './gtm-events';
import { fadeInAnimation, fadeOutAnimation, hideStartScreen } from './constants';
import GameView from './game-view';
import Game from './game';

window.jQuery = window.$ = $;
require('waypoints/lib/jquery.waypoints.js');
require('jquery.easing');

const game = new Game();
let screensAnimation;
/// /////// DocReady //////////
window.addEventListener('load', () => {
  const sectionGame = document.querySelector('.section__game');
  sectionGame.innerHTML = String(game.createFirstScreen());
  game.openModal();
  game.handleClosingModal();
  startGame();

  document.addEventListener('endGame', () => {
    endGame();
    goNextSection();
    openShareModal();
    closeShareModal();
    playAgain();
  });
  document.addEventListener('click', (event) => {
    const modalBody = event.target.closest('.modal');
    const modal = event.target.closest('.modal__wrapper');
    if (modalBody && !modal) {
      game.closeModal();
    }
  });
  goNextSection();
  detectDevice();
  // video
  videoTeaser();
  new WOW().init();
  gtmSet();
});

// end DocReady
/// ///////////////////////////
/**
 *
 * @param {Game} gameObject
 */
function showPreGameScreen(gameObject) {
  const sectionGame = document.querySelector('.section__game');
  sectionGame.innerHTML = String(game.createGameScreen(gameObject.seconds));
  const firstScreen = document.querySelector('.start-screen');
  firstScreen.style.animation = hideStartScreen;
  firstScreen.addEventListener('animationend', () => {
    firstScreen.style.display = 'none';
    gameObject.init();
  });
}
function startGame() {
  const startButton = document.querySelector('.start-game');
  const initialScreen = document.querySelector('.section-layer_initial');
  if (startButton) {
    startButton.addEventListener('click', () => {
      initialScreen.style.animation = fadeInAnimation;
      screensAnimation = setTimeout(() => {
        initialScreen.style.display = 'none';
        // gtmSet();
        showPreGameScreen(game);
      }, 1000);
    });
  }
}

function playAgain() {
  const playAgainButton = document.querySelector('.result__play');
  if (playAgainButton) {
    playAgainButton.addEventListener('click', () => {
      game.resetGame();
      showPreGameScreen(game);
    });
  }
}
function openShareModal() {
  const shareLink = document.querySelector('.share');
  shareLink.addEventListener('click', () => {
    shareLink.classList.remove('hidden');
  });
}

function closeShareModal() {
  const shareLink = document.querySelector('.share');
  const closeIcon = document.querySelector('.share__close-icon');
  closeIcon.addEventListener('click', () => {
    shareLink.classList.add('hidden');
  });
}

function showHiddenBlocks() {
  const newBlocks = document.querySelectorAll('.section_hidden');
  newBlocks.forEach((block) => {
    block.style.display = 'block';
    block.style.animation = fadeOutAnimation;
  });
}

function endGame() {
  clearTimeout(screensAnimation);
  endGameEventPush();
  showHiddenBlocks();
}

function endGameEventPush() {
  const endGameData = {
    eventAction: 'endGame',
    eventLabel: 'game_finish',
    eventLocation: 'section-game-final',
    eventCategory: 'Interactions',
  };
  gaPush(endGameData);
}

function videoTeaser() {
  const startedClass = 'is_started';
  const savingClass = 'device-suspended-mode';
  const offsetPause = 400;
  const selectorVideo = '.video-teaser';

  const vd = document.querySelector(selectorVideo);

  // change video source on HD
  // let hdVideoUrl = './video/video.h264.mp4'; ($(window).width() >=960)? vd.src = hdVideoUrl : null;

  function playPause() {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop; const
      state = vd.paused;
    if (+scrolled >= offsetPause && !state) {
      vd.pause();
    } else if (+scrolled < offsetPause && state) {
      vd.play();
    }
  }

  const readyPlay = vd.play();
  if (readyPlay !== undefined) {
    readyPlay.then(() => {
      window.addEventListener('scroll', playPause);
      vd.classList.add(startedClass);
    }).catch((err) => { // console.warn('Automatic playback failed.');
      vd.classList.add(savingClass);
      $('.teaser,body').on('touchstart', () => {
        if (!vd.playing) { vd.play(); vd.classList.add(startedClass); }
      });
    });
  }
}

// Удалить или порефакторить
function updateVideoSource() {
  const videoSourceMob = document.querySelector('.link-video-mobile').href;
  console.log(videoSourceMob);
  const videoSourceDesk = document.querySelector('.link-video-desktop').href;
  const source = document.querySelector('.video-source');
  const width = window.innerWidth;
  if (width > 600) {
    console.log('hey');
    source.setAttribute('src', videoSourceDesk);
  } else {
    source.setAttribute('src', videoSourceMob);
  }
}

// scroll-to
function goNextSection() {
  const goNextBtns = document.querySelectorAll('.js-go-next');
  const sectionsList = document.querySelectorAll('section');

  goNextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const btnParentNode = btn.closest('section');
      let sectionToScrollTo;
      sectionsList.forEach((el, index) => {
        if (el === btnParentNode) {
          sectionToScrollTo = sectionsList[index + 1];
          scrollToElement(sectionToScrollTo);
        }
      });
    });
  });
}

function scrollToElement(el) {
  const offs = 0;
  const y = el.getBoundingClientRect().top + window.pageYOffset + offs;
  window.scrollTo({ top: y, behavior: 'smooth' }); // element.scrollIntoView();
}

/// Detect device
function detectDevice() {
  const deviceOs = getMobileOs();
  document.querySelector('body').classList.add(`platform_${deviceOs}`);
}
function getMobileOs() {
  const uA = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(uA)) { return 'android'; }
  if (/iPad|iPhone|iPod/.test(uA) && !window.MSStream) { return 'ios'; }
  return 'unknown';
}

function handleFooter() {
  const screenWidth = window.innerWidth;
  const footer = document.querySelector('.section--footer');
  const endScreen = document.querySelector('.section-layer_final');
  if (game.gameIsOn === false) {
    if (screenWidth < 600 && footer.classList.contains('footer_upper')) {
      footer.classList.remove('footer_upper');
    } else if (screenWidth > 600) {
      footer.classList.add('footer_upper');
    }
  }
}
