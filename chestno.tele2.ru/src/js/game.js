/* eslint-disable no-param-reassign */
import { dolphinSaltoMove, fadeInAnimation, fadeOutAnimation } from './constants';
import GameView from './game-view';
import { gtmSet, gaPush } from './gtm-events';

class Game extends GameView {
  CLASS_GAME_ITEM = 'game__item';

  CLASS_GAME_ITEM_CLICK_AREA = 'dolphin__click-area';

  score = 0;

  gameIsOn = null;

  topBlock;

  sectionGame;

  middleBlock;

  bottomBlock;

  closeModalIcon;

  itemScore = 0;

  initFieldInterval = 0;

  createItemTimeout = 0;

  seconds = 30;

  constructor() {
    super();
    document.addEventListener('catch', (event) => {
      const { target } = event.detail;
      if (target.classList.contains('dolphin__head') || target.classList.contains('dolphin__tail')) {
        if (event.detail.isCatched === true) {
          this.setScore();
        }
      }
    });
  }

  setGameStatus(status) {
    this.gameIsOn = status;
  }

  getGameStatus() {
    return this.gameIsOn;
  }

  getScore() {
    return this.score;
  }

  setScore() {
    this.score += 1;
  }

  createRandomPosition(field, item) {
    const fieldWidth = field.clientWidth;
    const fieldHeight = 10;
    const itemWidth = item.clientWidth;
    const gameLeft = fieldWidth / 3;
    const gameRight = fieldWidth - fieldWidth / 3 - itemWidth;

    const bottom = Math.floor(Math.random() * fieldHeight);
    const left = (Math.floor(Math.random() * gameRight - gameLeft + 1) + gameLeft);
    return ({ bottom, left });
  }

  setTimer() {
    const secondsBlock = document.querySelector('.stats__seconds');
    if (secondsBlock && this.gameIsOn === true) {
      const timer = setInterval(() => {
        this.seconds -= 1;
        secondsBlock.innerHTML = `${this.seconds}`;
        if (this.seconds < 10) {
          secondsBlock.innerHTML = `0${this.seconds}`;
        }
        if (this.seconds === 0) {
          clearInterval(timer);
          this.stopGame();
        }
      }, 1000);
    }
  }

  createGameItems(gameArea, gameItem) {
    const gameItemHtml = gameItem.getHtml();
    const coords = this.createRandomPosition(gameArea, gameItemHtml);
    gameItemHtml.style.bottom = `${coords.bottom}px`;
    gameItemHtml.style.left = `${coords.left}px`;
    gameArea.append(gameItemHtml);
    gameItem.playAnimation();
  }

  createField() {
    const randomNumberForSmall = Math.round(Math.random());
    const smallGameItem = this.createSmallImage();

    for (let i = 0; i < randomNumberForSmall; i += 1) {
      this.createGameItems(this.topBlock, smallGameItem);
    }

    const randomNumberForMiddle = Math.floor(Math.random() * 3);
    for (let i = 0; i < randomNumberForMiddle; i += 1) {
      const middleGameItem = this.createMiddleImage();
      this.createGameItems(this.middleBlock, middleGameItem);
    }

    const largeGameItem = this.createLargeImage();
    this.createGameItems(this.bottomBlock, largeGameItem);
  }

  initField() {
    if (this.gameIsOn === true) {
      clearInterval(this.initFieldInterval);
      this.createField();
      this.initFieldInterval = setInterval(() => {
        clearTimeout(this.createItemTimeout);
        this.createField();
      }, 3000);
    }
  }

  init() {
    this.topBlock = document.querySelector('.game__field_top');
    this.sectionGame = document.querySelector('.section__game');
    this.middleBlock = document.querySelector('.game__field_middle');
    this.bottomBlock = document.querySelector('.game__field_bottom');
    this.gameIsOn = true;
    this.initField();
    this.setTimer();
    this.exitGame();
  }

  shareWithSocialMedia() {
    const vkShareBtn = document.querySelector('.share__icon_vk');
    const okShareBtn = document.querySelector('.share__icon_ok');
    const tgShareBtn = document.querySelector('.share__icon_tg');
    const { score } = this;
    const shareOptions = {
      url: 'http://chestno.tele2.ru',
      title: `Я поймал ${score} дельфинов, а ты?`,
    };
    const possibleNumbers = [1, 21, 31, 41];
    if (score) {
      if (possibleNumbers.includes(score) === true) {
        shareOptions.title = `Я поймал ${score} дельфинa, а ты?`;
      }
    }

    vkShareBtn?.addEventListener('click', () => {
      vkShareBtn.href = `http://vk.com/share.php?url=${shareOptions.url}&title=${shareOptions.title}`;
      this.closeModal();
    });
    okShareBtn?.addEventListener('click', () => {
      okShareBtn.href = `https://connect.ok.ru/offer?url=${shareOptions.url}&title=${shareOptions.title}`;
      this.closeModal();
    });
    tgShareBtn?.addEventListener('click', () => {
      tgShareBtn.href = `https://t.me/share/url?url=${shareOptions.url}&text=${shareOptions.title}`;
      this.closeModal();
    });
  }

  openModal() {
    const modalLink = document.querySelector('.modal__link');
    const modalBlock = document.querySelector('.modal');
    const body = document.querySelector('body');
    modalLink?.addEventListener('click', () => {
      modalBlock.style.display = 'flex';
      body.classList.add('noscroll');
      this.resetInnerHtml();
    });
  }

  closeModal() {
    const modalBlock = document.querySelector('.modal');
    const body = document.querySelector('body');
    modalBlock.style.display = 'none';
    body.classList.remove('noscroll');
  }

  handleClosingModal() {
    const closeModalIcon = document.querySelector('.modal__close-icon');
    closeModalIcon.addEventListener('click', () => {
      this.closeModal();
    });
  }

  copyLink() {
    const shareBlock = document.querySelector('.share__copy-link');
    shareBlock.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          shareBlock.innerHTML = 'Скопировано';
        })
        .catch((err) => {
          console.log('Something went wrong', err);
        });
    });
  }

  resetGame() {
    this.seconds = 30;
    this.score = 0;
  }

  resetInnerHtml() {
    const shareBlock = document.querySelector('.share__copy-link');
    if (shareBlock) {
      shareBlock.innerHTML = 'Скопировать ссылку';
    }
  }

  exitGame() {
    const exitButton = document.querySelector('.exit-game');
    exitButton.addEventListener('click', () => {
      this.stopGame();
    });
  }

  stopGame() {
    clearInterval(this.initFieldInterval);
    this.setGameStatus(false);
    const mainScreen = document.querySelector('.section-layer_main');
    mainScreen.style.animation = fadeInAnimation;
    this.sectionGame.innerHTML = this.createScoreScreen(this.score);
    const scoreScreen = document.querySelector('.section-layer_final');
    scoreScreen.style.animation = fadeOutAnimation;

    this.openModal();
    this.shareWithSocialMedia();
    this.handleClosingModal();
    this.copyLink();

    document.dispatchEvent(new CustomEvent('endGame', {
      detail: {
        isEnded: true,
      },
      bubbles: true,
    }));
  }
}

export default Game;
