class ItemView {
  constructor(className) {
    this.itemBody = this.createItemBody();
    this.itemBone = this.createBoneContainer();
    this.dolphinContainer = this.createItemView();
    this.gameItem = this.createImage(className);
    this.elementAnimation = this.createAnimation(this.itemBody);
    this.elementAnimation.finished.then(() => {
      this.gameItem.remove();
      this.itemBody.removeEventListener('transitionend', this.resumeAnimation.bind(this));
    });
    this.isCatched = false;
  }

  getHtml() {
    return this.gameItem;
  }

  playAnimation() {
    this.elementAnimation.ready.then(() => this.elementAnimation.play());
  }

  createItemBody() {
    const itemBody = document.createElement('div');
    itemBody.classList.add('dolphin__body');
    return itemBody;
  }

  createBoneContainer() {
    const boneContainer = document.createElement('div');
    boneContainer.classList.add('dolphin__bone');
    return boneContainer;
  }

  createItemView() {
    const dolphinContainer = document.createElement('div');
    dolphinContainer.classList.add('dolphin');

    const itemHead = document.createElement('div');
    itemHead.classList.add('dolphin__image');
    itemHead.classList.add('dolphin__head');
    itemHead.classList.add('js-gtm-event');
    itemHead.setAttribute('data-event', 'game-dolphin');
    itemHead.setAttribute('data-section', 'section-game');
    itemHead.addEventListener('click', this.pauseAnimation.bind(this, itemHead));

    const itemTail = document.createElement('div');
    itemTail.classList.add('dolphin__image');
    itemTail.classList.add('dolphin__tail');
    itemTail.classList.add('js-gtm-event');
    itemTail.setAttribute('data-event', 'game-dolphin');
    itemTail.setAttribute('data-section', 'section-game');
    itemTail.addEventListener('click', this.pauseAnimation.bind(this, itemTail));

    this.itemBone.append(itemHead, itemTail);
    this.itemBody.append(this.itemBone);
    dolphinContainer.append(this.itemBody);
    return dolphinContainer;
  }

  /**
 * @param {string} className
 * @returns
 */
  createImage(className) {
    const gameItem = document.createElement('div');
    gameItem.classList.add('game__item');
    gameItem.classList.add(className);
    gameItem.append(this.dolphinContainer);

    return gameItem;
  }

  createAnimation(element) {
    const animation = new KeyframeEffect(
      element,
      [
        { transform: 'translateX(0%) translateY(-20%) rotate(-40deg)', opacity: 1, offset: 0 },

        { transform: 'translateX(40%) translateY(-40%) rotate(-10deg)', opacity: 1, offset: 0.4 },
        {
          transform: 'translateX(55%) translateY(-25%) rotate(50deg)', opacity: 1, offset: 0.8,
        },
        {
          transform: 'translateX(70%) translateY(0) rotate(70deg)', offset: 0.98,
        },
        {
          transform: ' translateX(80%) translateY(20%) rotate(70deg)', opacity: 0, offset: 1,
        },
      ],
      {
        duration: 1500,
        // delay: Math.floor(Math.random() * 3) * 1000,
        fill: 'forwards',
        easing: 'linear',
        iterations: 1,
        direction: 'normal',
      }, // keyframe options
    );
    return new Animation(animation, document.timeline);
  }

  pauseAnimation(element) {
    if (this.isCatched === false) {
      this.elementAnimation.pause();

      this.itemBody.addEventListener('transitionend', this.resumeAnimation.bind(this));
      this.dolphinContainer.classList.add('ss');
      document.dispatchEvent(new CustomEvent('catch', {
        detail: {
          isCatched: true,
          target: element,
        },
      }));
      this.isCatched = true;
    }
  }

  resumeAnimation() {
    this.dolphinContainer.classList.remove('ss');
    this.elementAnimation.play();
    // this.gameItem.remove();
  }
}
export default ItemView;
