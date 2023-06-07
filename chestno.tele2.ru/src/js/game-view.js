/* eslint-disable no-return-assign */
/* eslint-disable class-methods-use-this */
/* eslint-disable global-require */
import ItemView from './item-view';
import { html } from './utils';

class GameView extends ItemView {
  createSmallImage() {
    return new ItemView('game__item_top');
  }

  createMiddleImage() {
    return new ItemView('game__item_middle');
  }

  createLargeImage() {
    return new ItemView('game__item_bottom');
  }

  createFirstScreen() {
    const src = require('../img/page/swim_ring.png');
    return html`
      <div class="section-layer section-layer_initial">
        <div class="game__screen game__screen_initial">
          <div class="box-content">
            <div class="box-content__disclaimer">По всей России</div>
            <h2 class="box-content__title">Отдохните с&nbsp;Tele2</h2>
            <div class="box-content__text">
              <p>
                Абоненты Tele2 отдыхают спокойно: они знают, что у&nbsp;нас
                минуты не&nbsp;расходуются на&nbsp;звонки внутри сети.
              </p>
              <p>
                Отдохните и&nbsp;вы! Сыграйте в&nbsp;игру про море, солнце
                и&nbsp;дельфинов и&nbsp;отвлекитесь от&nbsp;суеты, пока
                мы&nbsp;спасаем вас от&nbsp;лишних&nbsp;трат.
              </p>
            </div>
            <button type="button"
            class="btn btn-primary start-game js-gtm-event"
            data-event="game_start" data-section="section-game-start">
              Играть
            </button>
            <div class="box-content__link modal__link subtitle js-gtm-event">
              Некогда играть, дайте позвонить
            </div>
          </div>
          <div class="box-pic">
            <div class="pic-layer">
              <picture class="picture">
                <img src=${src} alt="" />
              </picture>
            </div>
          </div>
        </div>
      </div>
      <div class="section-layer__info info modal hidden">
      <div class="modal__wrapper info__wrapper ">
        <div class="info__title modal__title">
          Звоните сколько угодно, если вы&nbsp;в&nbsp;Tele2
        </div>
        <p class="subtitle">
          Подключайтесь, чтобы получить безлимит на&nbsp;звонки в&nbsp;сети
          Tele2 и&nbsp;отдыхать спокойно
        </p>
        <a
          class="btn btn-primary js-gtm-event"
          href="https://tele2.ru/tariffs"
          data-event="conv_connect-game"
          data-section="section-game-start"
          target="_blank"
        >
          Подключиться
        </a>
        <div class="modal__close-icon">
          <span class="modal__close"></span>
        </div>
      </div>
    </div>
    `;
  }

  createGameScreen(seconds) {
    const clocksSrc = require('../img/icons/clock.png');
    const waveImg1 = require('../img/page/wave1.png');
    const waveImg2 = require('../img/page/wave2.png');
    const waveImg3 = require('../img/page/wave3.png');
    const waveImg4 = require('../img/page/wave4.png');
    const waveImg5 = require('../img/page/wave5.png');
    const waveImg6 = require('../img/page/wave6.png');
    const waveImg7 = require('../img/page/wave7.png');
    return html`
      <div class="section-layer section-layer_main">
        <div class="game__screen game__screen_main">
          <div class="game__text">
            <p class="subtitle">
              Не важно, что вы делаете: ловите дельфинов или звоните – ваши
              минуты внутри сети Tele2 не потратятся
            </p>
            <div class="stats">
              <div class="stats__timer">
                <img src=${clocksSrc} alt="" />
                <div class="stats__time">
                  00:<span class="stats__seconds">${seconds}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="game__field game-field">
            <div class="game-field__start-screen start-screen">
              <p class="subtitle">Ловите дельфинов</p>
            </div>
            <div class="game-field__area game__field_top">
              <img
                src=${waveImg6}
                alt=""
                class="game-field__wave game-field__wave_5"
              />
              <img
              src=${waveImg6}
                alt=""
                class="game-field__wave game-field__wave_6"
              />
              <img
              src=${waveImg6}
                alt=""
                class="game-field__wave game-field__wave_7"
              />
            </div>
            <div class="game-field__area game__field_middle">
              <img
              src=${waveImg6}
                alt=""
                class="game-field__wave game-field__wave_3"
              />
              <img
              src=${waveImg6}
                alt=""
                class="game-field__wave game-field__wave_4"
              />
            </div>
            <div class="game-field__area game__field_bottom">
              <img
              src=${waveImg6}
                alt=""
                class="game-field__wave game-field__wave_1"
              />
              <img
              src=${waveImg6}
                alt=""
                class="game-field__wave game-field__wave_2"
              />
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // shareWithSocialMedia() {
  //   const vkShareBtn = document.querySelector('.share__icon_vk');
  //   const okShareBtn = document.querySelector('.share__icon_ok');
  //   const score = game.getScore();
  //   const shareOptions = {
  //     url: 'url',
  //     title: `Я поймал ${score} дельфинов, а ты?`,
  //   };
  //   vkShareBtn.addEventListener('click', () => {
  //     vkShareBtn.href = `http://vk.com/share.php?url=${shareOptions.url}&title=${shareOptions.title}`;
  //   });
  //   okShareBtn.addEventListener('click', () => {
  //     okShareBtn.href = `https://connect.ok.ru/offer?url=${shareOptions.url}&title=${shareOptions.title}`;
  //   });
  // }

  // openShareModal() {
  //   const shareLink = document.querySelector('.share');
  //   shareLink.addEventListener('click', () => {
  //     shareLink.classList.remove('hidden');
  //   });
  // }

  // closeShareModal() {
  //   const shareLink = document.querySelector('.share');
  //   const closeIcon = document.querySelector('.share__close-icon');
  //   closeIcon.addEventListener('click', () => {
  //     shareLink.classList.add('hidden');
  //   });
  // }

  createScoreScreen(score) {
    const waveImg3 = require('../img/page/final-wave.png');
    const okIcon = require('../img/icons/ok.svg');
    const vkIcon = require('../img/icons/vk.svg');
    const tgIcon = require('../img/icons/tg.svg');
    return html`
      <div class="section-layer section-layer_final shown">
        <div class="result">
          <div class="result__statistics">
          <span class="result__score">Ваш счет</span>
          <span class="result__number">${score}</span>
          <span class="result__play js-gtm-event"
            data-event="game_play-again"
            data-section="section-game-score">
            Еще раз?</span>
          </div>
          <span class="result__share modal__link js-gtm-event"
              data-event="btn-share"
              data-section="section-game-score">
          Поделиться</span>
          <div class="result__waves">
            <img
            src=${waveImg3}
              alt=""
              class="result__wave result__wave_1"
            />
            <img
            src=${waveImg3}
              alt=""
              class="result__wave result__wave_2"
            />
            <img
            src=${waveImg3}
              alt=""
              class="result__wave result__wave_3"
            />
          </div>
        </div>
        <div class="game__screen game__screen_final">
          <div class="box-content">
            <h2 class="box-content__title">Продолжайте отдыхать</h2>
            <div class="box-content__text">
              <p>
                С&nbsp;Tele2 можно ни&nbsp;о&nbsp;чем
                не&nbsp;переживать&nbsp;&mdash; ваши минуты не&nbsp;потратятся
                при звонках внутри сети по&nbsp;<a
                class="js-gtm-event"
                data-event="text-link_rissia"
                data-section="section-game-score"
                href="https://tele2.ru/promotions/article/spisok-regionov"
                target="_blank" >всей России</a>
              </p>
              <p>Хотите так&nbsp;же? Подключайтесь!</p>
            </div>
            <a
            class="btn btn-primary js-gtm-event"
            href="https://tele2.ru/tariffs"
            data-event="conv_connect-game"
            data-section="section-game-score"
            target="_blank"
            > Подключиться </a>
            <button
              class="btn js-gtm-event js-go-next"
              data-event="what-else"
              data-section="section-game-score"
            >
              Что еще у вас есть?
            </button>
          </div>
        </div>
        <div class="section-layer__waves">
        <img
        src=${waveImg3}
          alt=""
          class="section-layer__wave section-layer__wave_1"
        />
        <img
        src=${waveImg3}
          alt=""
          class="section-layer__wave section-layer__wave_2"
        />
        <img
        src=${waveImg3}
          alt=""
          class="section-layer__wave section-layer__wave_3"
        />
      </div>
      </div>
      <div class="section-layer__share share modal hidden">
      <div class="modal__wrapper share__wrapper">
        <div class="modal__title share__title">Поделиться результатом</div>
        <div class="share__icons">
          <a
            href=""
            class="share__icon share__icon_vk js-gtm-event"
            target="_blank"
            data-event="share-vk"
            data-section="section-game-score"
          >
            <img src=${vkIcon} alt="" />
          </a>
          <a
            href=""
            class="share__icon share__icon_ok js-gtm-event"
            target="_blank"
            data-event="share-ok"
            data-section="section-game-score"
          >
            <img src=${okIcon} alt="" />
          </a>
          <a
            href=""
            class="share__icon share__icon_tg js-gtm-event"
            target="_blank"
            data-event="share-tg"
            data-section="section-game-score"
          >
            <img src=${tgIcon} alt="" />
          </a>
        </div>
        <span
          class="share__copy-link js-gtm-event"
          data-event="share-link"
          data-section="section-game-score"
          >Скопировать ссылку</span
        >
        <div class="share__close-icon modal__close-icon">
          <span class="modal__close share__close"></span>
        </div>
      </div>
    </div>
    `;
  }
}
export default GameView;
