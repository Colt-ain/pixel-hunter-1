var main = (function () {
'use strict';

// get-element-from-template.js

const getElement = (string) => {
  let newDiv = document.createElement(`div`);
  newDiv.innerHTML = string;
  return newDiv;
};

class AbstractView {
  constructor(data, index, timeInit) {
    this.data = data;
    this.index = index;
    this.timeInit = timeInit;
  }
  get template() {
    throw new Error(`You have to define template for view`);
  }
  render() {
    return getElement(this.template);
  }
  bind() {
  }
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
  onStep() {
  }
  onBack() {
  }
}

class IntroView extends AbstractView {
  get template() {
    return `
  <h1 class="intro__asterisk">*</h1>
  <p class="intro__motto"><sup>*</sup><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  `.trim();
  }
  bind() {
    const star = this.element.querySelector(`.intro__asterisk`);
    star.addEventListener(`click`, () => {
      this.onStep();
    });
  }
  onStep() {
  }
}

// show-screen.js
const main = document.querySelector(`main.central`);

const showScreen = (block) => {
  main.innerHTML = ``;
  main.appendChild(block.element);
};

// intro.js

class Intro {
  constructor() {
    this.view = new IntroView();
  }
  init() {
    App$1.showIntro();
    showScreen(this.view);

    this.view.onStep = () => {
      App$1.showGreeting();
    };
  }
}

class GreetingView extends AbstractView {
  get template() {
    return `<div class="greeting central--blur">
    <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
    <h1 class="greeting__asterisk">*</h1>
    <div class="greeting__challenge">
      <h3>Лучшие художники-фотореалисты бросают тебе вызов!</h3>
      <p>Правила игры просты.<br>
        Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
        Задача кажется тривиальной, но не думай, что все так просто.<br>
        Фотореализм обманчив и коварен.<br>
        Помни, главное — смотреть очень внимательно.
      </p>
    </div>
    <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
  </div>
  <footer class="footer">
      <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
      <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
      <div class="footer__social-links">
        <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
        <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
        <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
        <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
      </div>
    </footer>
    `.trim();
  }
  bind() {
    let contArrow = this.element.querySelector(`.greeting__continue`);
    contArrow.addEventListener(`click`, () => {
      this.onStep();
    });
  }
  onStep() {
  }

}

// greeting.js

class Greeting {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    showScreen(this.view);

    this.view.onStep = () => {
      App$1.showRules();
    };

  }
}

// data.js

const initialState = {
  userName: `userName`,
  level: 1,
  lives: 3,
  time: 0
};

const answers = {
  times: [],
  timeInit: [],
  wrongAnswers: 0,
  rightAnswers: 0,
  fastAnswers: 0,
  slowAnswers: 0,
  timer: 0,
  answers: [],
  statsIcons: [`unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`]
};

const statistics = [
];

const question1 = Object.freeze({
  description: `Угадайте для каждого изображения фото или рисунок?`,
  width: ``,
  height: ``
});

const question2 = Object.freeze({
  description: `Угадайте для каждого изображения фото или рисунок?`,
  width: `705`,
  height: `455`
});

const question3 = Object.freeze({
  description: `Найдите рисунок среди изображений`,
  width: ``,
  height: ``
});

const header = {
  timer: `00`,
  textContent() {
    return `
  <header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
    <h1 class="game__timer">${this.timer}</h1>
    <div class="game__lives">
    ${new Array(3 - initialState.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    ${new Array(initialState.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    </div>
  </header>`;
  }
};

class RulesView extends AbstractView {
  get template() {
    return `<header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
  </header>
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
  <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>
    `.trim();
  }
  bind() {
    const rulesButton = this.element.querySelector(`.rules__button`);
    const rulesInput = this.element.querySelector(`.rules__input`);

    rulesInput.addEventListener(`input`, () => {
      const rulesLenth = rulesInput.value.length;
      if (rulesLenth >= 1 && rulesInput.value.trim().length !== 0) {
        rulesButton.removeAttribute(`disabled`);
      } else if (rulesLenth < 1 || rulesInput.value === ` `) {
        rulesButton.setAttribute(`disabled`, `disabled`);
      }
    });
    const backButton = this.element.querySelector(`.header__back`);
    backButton.style.cursor = `pointer`;
    backButton.addEventListener(`click`, () => {
      this.onBack();
    });
    rulesButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      initialState.level = initialState.level + 1;
      initialState.userName = rulesInput.value;
      this.onStep();
    });
  }
  onStep() {
  }
  onBack() {
    App$1.showGreeting();
  }
}

// rules.js

class Rules {
  constructor() {
    this.view = new RulesView();
  }
  init() {
    initialState.level = 0;
    showScreen(this.view);

    this.view.onStep = () => {
      answers.times[0] = new Date();
      App$1.showGameOne();
    };
  }
}

class GameOneView extends AbstractView {
  get template() {
    return `
  ${header.textContent()}
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option" style="overflow: hidden">
        <img src="${window.images[this.index - 1][0].src}" alt="Option 1" width="${this.data[this.index - 1].answers[0].image.width}" height="${this.data[this.index - 1].answers[0].image.width}">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option" style="overflow: hidden">
        <img src="${window.images[this.index - 1][1].src}" alt="Option 1" width="${this.data[this.index - 1].answers[1].image.width}" height="${this.data[this.index - 1].answers[1].image.width}">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--${answers.statsIcons[0]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[1]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[2]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[3]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[4]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[5]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[6]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[7]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[8]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[9]}"></li>
      </ul>
    </div>
  </div>
  <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> © 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>
    `.trim();
  }
  bind() {
    const timer = this.element.querySelector(`.game__timer`);
    let timerInner = (time) => {
      if (time < 10) {
        timer.innerHTML = `0` + time;
      } else {
        timer.innerHTML = `${time}`;
      }
    };
    let tm = 0;
    setInterval(() => {
      tm = tm + 1;
      timerInner(tm);
    }, 1000);

    const leftPhoto = this.element.querySelector(`.game__answer--photo input[name="question1"]`);
    const leftPaint = this.element.querySelector(`.game__answer--paint input[name="question1"]`);
    const rightPhoto = this.element.querySelector(`.game__answer--photo input[name="question2"]`);
    const rightPaint = this.element.querySelector(`.game__answer--paint input[name="question2"]`);

    leftPhoto.addEventListener(`change`, () => {
      if (rightPhoto.checked) {
        let typeLeft = `photo`;
        let typeRight = `photo`;
        this.isRightAnswerOne(typeLeft, typeRight);
        this.onStep();
      } else if (rightPaint.checked) {
        let typeLeft = `photo`;
        let typeRight = `painting`;
        this.isRightAnswerOne(typeLeft, typeRight);
        this.onStep();
      }
    });
    rightPhoto.addEventListener(`change`, () => {
      if (leftPhoto.checked) {
        let typeLeft = `photo`;
        let typeRight = `photo`;
        this.isRightAnswerOne(typeLeft, typeRight);
        this.onStep();
      } else if (leftPaint.checked) {
        let typeLeft = `photo`;
        let typeRight = `painting`;
        this.isRightAnswerOne(typeLeft, typeRight);
        this.onStep();
      }
    });
    leftPaint.addEventListener(`change`, () => {
      if (rightPhoto.checked) {
        let typeLeft = `painting`;
        let typeRight = `photo`;
        this.isRightAnswerOne(typeLeft, typeRight);
        this.onStep();
      } else if (rightPaint.checked) {
        let typeLeft = `painting`;
        let typeRight = `painting`;
        this.isRightAnswerOne(typeLeft, typeRight);
        this.onStep();
      }
    });
    rightPaint.addEventListener(`change`, () => {
      if (leftPhoto.checked) {
        let typeLeft = `painting`;
        let typeRight = `photo`;
        this.isRightAnswerOne(typeLeft, typeRight);
        this.onStep();
      } else if (leftPaint.checked) {
        let typeLeft = `painting`;
        let typeRight = `painting`;
        this.isRightAnswerOne(typeLeft, typeRight);
        this.onStep();
      }
    });
    const backButton = this.element.querySelector(`.header__back`);
    backButton.style.cursor = `pointer`;
    backButton.addEventListener(`click`, () => {
      this.onBack();
    });
  }
  onStep() {
  }
  isRightAnswerOne(typeLeft, typeRight) {
  }
  onBack() {
    if (this.index === 1) {
      App$1.showRules();
    } else {
      switch (this.index) {
        case 2:
          App$1.showGameOne();
          break;
        case 3:
          App$1.showGameTwo(this.data);
          break;
        case 4:
          App$1.showGameThree(this.data);
          break;
        case 5:
          App$1.showGameFour(this.data);
          break;
        case 6:
          App$1.showGameFive(this.data);
          break;
        case 7:
          App$1.showGameSix(this.data);
          break;
        case 8:
          App$1.showGameSeven(this.data);
          break;
        case 9:
          App$1.showGameEight(this.data);
          break;
        case 10:
          App$1.showGameNine(this.data);
          break;
        case 11:
          App$1.showRules();
          break;
      }
    }
  }

  isRightAnswerOne(typeLeft, typeRight) {
    if (typeLeft === this.data[this.index - 1].answers[0].type && typeRight === this.data[this.index - 1].answers[1].type) {
      answers.rightAnswers = answers.rightAnswers + 1;
      answers.times[this.index] = (new Date() - answers.timeInit[this.index]) / 1000;
      if (Math.floor(answers.times[this.index]) < 10) {
        answers.fastAnswers = answers.fastAnswers + 1;
        answers.answers[this.index - 1] = `fast`;
        answers.statsIcons[this.index - 1] = `fast`;
      } else if (answers.times[this.index] > 20) {
        answers.slowAnswers = answers.slowAnswers + 1;
        answers.answers[this.index - 1] = `slow`;
        answers.statsIcons[this.index - 1] = `slow`;
      } else if (answers.times[this.index] <= 20 && answers.times[this.index] >= 10) {
        answers.answers[this.index - 1] = `correct`;
        answers.statsIcons[this.index - 1] = `correct`;
      }
    } else {
      answers.wrongAnswers = answers.wrongAnswers + 1;
      initialState.lives = initialState.lives - 1;
      answers.answers[this.index - 1] = `wrong`;
      answers.statsIcons[this.index - 1] = `wrong`;
    }
  }
}

class GameTwoView extends AbstractView {
  get template() {
    return `
  ${header.textContent()}
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${window.images[this.index - 1][0].src}" alt="Option 1" width="${question2.width}" height="${question2.height}">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--${answers.statsIcons[0]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[1]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[2]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[3]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[4]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[5]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[6]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[7]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[8]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[9]}"></li>
    </ul>
    </div>
  </div>
  <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> © 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>
    `.trim();
  }
  bind() {
    const timer = this.element.querySelector(`.game__timer`);
    let timerInner = (time) => {
      if (time < 10) {
        timer.innerHTML = `0` + time;
      } else {
        timer.innerHTML = `${time}`;
      }
    };
    let tm = 0;
    setInterval(() => {
      tm = tm + 1;
      timerInner(tm);
    }, 1000);


    const backButton = this.element.querySelector(`.header__back`);
    backButton.style.cursor = `pointer`;
    backButton.addEventListener(`click`, () => {
      this.onBack();
    });
    const photo = this.element.querySelector(`.game__answer--photo`);
    const paint = this.element.querySelector(`.game__answer--paint`);

    photo.addEventListener(`change`, () => {
      let type = `photo`;
      this.isRightAnswerTwo(type);
      this.onStep();
    });
    paint.addEventListener(`change`, () => {
      let type = `painting`;
      this.isRightAnswerTwo(type);
      this.onStep();
    });

  }
  onStep() {
  }
  isRightAnswerTwo(type) {
  }
  onBack() {
    if (this.index === 1) {
      App$1.showRules();
    } else {
      location.hash = `game-${this.index - 1}`;
    }
  }
  isRightAnswerTwo(type) {
    if (type === this.data[this.index - 1].answers[0].type) {
      answers.rightAnswers = answers.rightAnswers + 1;
      answers.times[this.index] = (new Date() - answers.timeInit[this.index]) / 1000;
      if (Math.floor(answers.times[this.index]) < 10) {
        answers.fastAnswers = answers.fastAnswers + 1;
        answers.answers[this.index - 1] = `fast`;
        answers.statsIcons[this.index - 1] = `fast`;
      } else if (answers.times[this.index] > 20) {
        answers.slowAnswers = answers.slowAnswers + 1;
        answers.answers[this.index - 1] = `slow`;
        answers.statsIcons[this.index - 1] = `slow`;
      } else if (answers.times[this.index] <= 20 && answers.times[this.index] >= 10) {
        answers.answers[this.index - 1] = `correct`;
        answers.statsIcons[this.index - 1] = `correct`;
      }
    } else {
      answers.wrongAnswers = answers.wrongAnswers + 1;
      initialState.lives = initialState.lives - 1;
      answers.answers[this.index - 1] = `wrong`;
      answers.statsIcons[this.index - 1] = `wrong`;
    }
  }
}

// game-3.js

class GameThreeView extends AbstractView {
  get template() {
    return `
  ${header.textContent()}
  <div class="game">
    <p class="game__task">${this.data[this.index - 1].question}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option" style="overflow: hidden">
        <img src="${window.images[this.index - 1][0].src}" alt="Option 1" width="${question3.width}" height="${question3.height}">
      </div>
      <div class="game__option  game__option--selected" style="overflow: hidden">
        <img src="${window.images[this.index - 1][1].src}" alt="Option 1" width="${question3.width}" height="${question3.height}">
      </div>
      <div class="game__option" style="overflow: hidden">
        <img src="${window.images[this.index - 1][2].src}" alt="Option 1" width="${question3.width}" height="${question3.height}">
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--${answers.statsIcons[0]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[1]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[2]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[3]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[4]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[5]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[6]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[7]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[8]}"></li>
        <li class="stats__result stats__result--${answers.statsIcons[9]}"></li>
      </ul>
    </div>
  </div>
  <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> © 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>
    `.trim();
  }
  bind() {
    const timer = this.element.querySelector(`.game__timer`);
    let timerInner = (time) => {
      if (time < 10) {
        timer.innerHTML = `0` + time;
      } else {
        timer.innerHTML = `${time}`;
      }
    };
    let tm = 0;
    setInterval(() => {
      tm = tm + 1;
      timerInner(tm);
    }, 1000);

    const backButton = this.element.querySelector(`.header__back`);
    const questionImg = this.element.querySelectorAll(`.game__option`);
    backButton.style.cursor = `pointer`;
    backButton.addEventListener(`click`, () => {
      this.onBack();
    });
    let searchType;
    const string = this.data[this.index - 1].question;
    if (string.substr(8, 4) === `рису`) {
      searchType = `painting`;
    } else {
      searchType = `photo`;
    }
    questionImg.forEach((element, ind) => {
      element.addEventListener(`click`, () => {
        this.isRightAnswersThree(searchType, ind);
        this.onStep();
      });
    });
  }
  onStep() {
  }
  onBack() {
    if (this.index === 1) {
      App$1.showRules();
    } else {
      location.hash = `game-${this.index - 1}`;
    }
  }
  isRightAnswersThree(searchType, ind) {
    if (searchType === this.data[this.index - 1].answers[ind].type) {
      answers.rightAnswers = answers.rightAnswers + 1;
      answers.times[this.index] = (new Date() - answers.timeInit[this.index]) / 1000;
      if (Math.floor(answers.times[this.index]) < 10) {
        answers.fastAnswers = answers.fastAnswers + 1;
        answers.answers[this.index - 1] = `fast`;
        answers.statsIcons[this.index - 1] = `fast`;
      } else if (answers.times[this.index] > 20) {
        answers.slowAnswers = answers.slowAnswers + 1;
      } else if (answers.times[this.index] <= 20 && answers.times[this.index] >= 10) {
        answers.answers[this.index - 1] = `correct`;
        answers.statsIcons[this.index - 1] = `correct`;
      }
    } else {
      answers.wrongAnswers = answers.wrongAnswers + 1;
      initialState.lives = initialState.lives - 1;
      answers.answers[this.index - 1] = `wrong`;
      answers.statsIcons[this.index - 1] = `wrong`;
    }
  }

}

class DefaultAdapter {
  constructor() {
    if (new.target === DefaultAdapter) {
      throw new Error();
    }
  }
  preprocess(data) {
    return data;
  }
  toServer(data) {
    return JSON.stringify(data);
  }
}
const defaultAdapter = new class extends DefaultAdapter {}();

class Model {
  get urlRead() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
  }
  get urlWrite() {
    return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/}`;
  }
  load(adapter = defaultAdapter) {
    return fetch(this.urlRead)
      .then((resp) => resp.json());
  }

  send(date, adapter = defaultAdapter) {
    const requestSettings = {
      method: `Post`,
      body: adapter.toServer(date),
      headers: {
        'Content-Type': `application/json`
      }
    };
    return fetch(this.urlWrite, requestSettings);
  }
}

var pixelAdapter = new class extends DefaultAdapter {
  preprocess(data) {
    const preprocessed = {};
    Object.keys(data).forEach((it, i) => {
      preprocessed[`level=${i}`] = {
        text: data[it].text,
        answers: data[it].answers
      };
    });
  }
  toServer(data) {
    return JSON.stringify(data);
  }
}();

class GameStatsView extends AbstractView {
  get template() {
    return `<header class="header">
      <div class="header__back">
        <span class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.png" width="101" height="44">
        </span>
      </div>
    </header>
    <div class="result">
      <h1>Победа!</h1>
      <table class="result__table">
        ${this.allStatsBlock()}
      </table>
    </div>
    <footer class="footer">
      <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
      <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> © 2016</span>
      <div class="footer__social-links">
        <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
        <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
        <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
        <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
      </div>
    </footer>
    `.trim();
  }
  bind() {
    const backButton = this.element.querySelector(`.header__back`);
    backButton.style.cursor = `pointer`;
    backButton.addEventListener(`click`, () => {
      this.onBack();
    });
  }
  onStep() {
  }
  onBack() {
    App$1.showRules();
  }
  allStatsBlock() {
    let blockResult = ``;
    for (let i = allScores.length - 1; i >= 0; i--) {
      let block = `
        <tr>
          <td class="result__number">${i + 1}.</td>
          <td colspan="2">
            <ul class="stats">
              <li class="stats__result stats__result--${allScores[i].statsIcons[0]}"></li>
              <li class="stats__result stats__result--${allScores[i].statsIcons[1]}"></li>
              <li class="stats__result stats__result--${allScores[i].statsIcons[2]}"></li>
              <li class="stats__result stats__result--${allScores[i].statsIcons[3]}"></li>
              <li class="stats__result stats__result--${allScores[i].statsIcons[4]}"></li>
              <li class="stats__result stats__result--${allScores[i].statsIcons[5]}"></li>
              <li class="stats__result stats__result--${allScores[i].statsIcons[6]}"></li>
              <li class="stats__result stats__result--${allScores[i].statsIcons[7]}"></li>
              <li class="stats__result stats__result--${allScores[i].statsIcons[8]}"></li>
              <li class="stats__result stats__result--${allScores[i].statsIcons[9]}"></li>
            </ul>
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${allScores[i].rightAnswersBonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${allScores[i].fast}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${allScores[i].fastAnswersBonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${allScores[i].lives}&nbsp;<span class="stats__result stats__result--heart"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${allScores[i].livesBonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${allScores[i].slow} &nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${allScores[i].slowAnswersPenalty}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${allScores[i].summaryScore}</td>
        </tr>
    `;
      blockResult = blockResult + block;
    }
    return blockResult;
  }
}

// game-1.js
let allScores = [];

class Game {
  constructor(model = initialState, data, index) {
    this.model = model;
    this.data = data;
    this.index = index;
    this.chooseView();
  }
  chooseView() {
    switch (this.data[this.index - 1].type) {
      case `two-of-two`:
        this.view = new GameOneView(this.data, this.index);
        break;
      case `tinder-like`:
        this.view = new GameTwoView(this.data, this.index);
        break;
      case `one-of-three`:
        this.view = new GameThreeView(this.data, this.index);
    }
  }
  init() {
    this.stopTimer();
    this.isDie();
    this.timeInit = answers.timeInit[this.index] = new Date();
    this.onTimer();
    initialState.level = this.index;
    showScreen(this.view);

    this.view.onStep = () => {
      this.stopTimer();
      switch (this.index) {
        case 1:
          App$1.showGameTwo(this.data);
          break;
        case 2:
          App$1.showGameThree(this.data);
          break;
        case 3:
          App$1.showGameFour(this.data);
          break;
        case 4:
          this.win();
          // App.showGameFive(this.data);
          break;
        case 5:
          App$1.showGameSix(this.data);
          break;
        case 6:
          App$1.showGameSeven(this.data);
          break;
        case 7:
          App$1.showGameEight(this.data);
          break;
        case 8:
          App$1.showGameNine(this.data);
          break;
        case 9:
          App$1.showGameTen(this.data);
          break;
        case 10:
          this.win();
          break;
      }
    };
  }
  win() {
    this.isDie();
    App$1.showPreloader();
    this.statsCalc();
    const finalStats = {
      stats: answers.answers,
      statsIcons: answers.statsIcons,
      lives: statistics.lives
    };
    this.model.send(finalStats, pixelAdapter).then(() => {
      this.stopTimer();

      this.getServerStats().then((data) => {
        this.showFinalStats(data);
      })
        .then(() => {
          this.view = new GameStatsView();
          App$1.showStats();
        });
    });
  }

  isDie() {
    if (initialState.lives === 0) {
      App$1.showFail();
    }
  }

  onTimer() {
    this.timeout = setTimeout(() => {
      initialState.lives = initialState.lives - 1;
      this.isDie();
      this.view.onStep();
    }, 30000);
  }
  stopTimer() {
    clearTimeout(this.timeout);
  }
  statsCalc() {
    statistics.stats = answers.answers;
    statistics.lives = initialState.lives;
    statistics.slowAnswers = answers.slowAnswers;
    statistics.rightAnswers = answers.rightAnswers;
    statistics.rightAnswersBonus = statistics.rightAnswers * 100;
    statistics.fastAnswers = answers.fastAnswers;
    statistics.fastAnswersBonus = answers.fastAnswers * 50;
    statistics.slowAnswersPenalty = answers.slowAnswers * 50;
    statistics.livesBonus = initialState.lives * 50;
    statistics.summaryScore = statistics.rightAnswersBonus + statistics.fastAnswersBonus - statistics.slowAnswersPenalty + statistics.livesBonus;
    statistics.statsIcons = answers.statsIcons;
  }

  getServerStats() {
    return fetch(this.model.urlWrite).then((resp) => resp.json());
  }
  showFinalStats(data) {
    for (let j = 0; j < data.length; j++) {
      allScores[j] = {};
      allScores[j].lives = 0;
      allScores[j].fast = 0;
      allScores[j].correct = 0;
      allScores[j].slow = 0;
      allScores[j].slowAnswersPenalty = 0;
      allScores[j].fastAnswersBonus = 0;
      allScores[j].livesBonus = 0;
      allScores[j].rightAnswersBonus = 0;
      for (let i = 0; i < data[j].stats.length; i++) {
        if (data[j].stats[i] === `correct`) {
          allScores[j].correct = allScores[j].correct + 1;
        } else if (data[j].stats[i] === `fast`) {
          allScores[j].fast = allScores[j].fast + 1;
        } else if (data[j].stats[i] === `slow`) {
          allScores[j].slow = allScores[j].slow + 1;
        }
      }
      allScores[j].lives = data[j].lives;
      allScores[j].slowAnswersPenalty = allScores[j].slow * 50;
      allScores[j].fastAnswersBonus = allScores[j].fast * 50;
      allScores[j].livesBonus = allScores[j].lives * 50;
      allScores[j].rightAnswersBonus = (allScores[j].correct + allScores[j].fast) * 100;
      allScores[j].statsIcons = data[j].statsIcons;
      allScores[j].summaryScore = allScores[j].fastAnswersBonus + allScores[j].livesBonus + allScores[j].rightAnswersBonus - allScores[j].slowAnswersPenalty;
    }
  }
}

// stats.js

class Stats {
  constructor() {
    this.view = new GameStatsView();
  }
  init() {
    showScreen(this.view);
    this.view.onBack = () => {
      App$1.showRules();
    };
  }
}

class FailView extends AbstractView {
  get template() {
    return `<header class="header">
      <div class="header__back">
        <span class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.png" width="101" height="44">
        </span>
      </div>
    </header>
    <div class="result">
      <h1>FAIL!!! EPIC FAIL!!!</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            <ul class="stats">
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--correct"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--unknown"></li>
            </ul>
          </td>
          <td class="result__points">FAIL</td>
        </tr>
      </table>
    </div>
    <footer class="footer">
      <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
      <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> © 2016</span>
      <div class="footer__social-links">
        <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
        <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
        <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
        <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
      </div>
    </footer>
    `.trim();
  }
  bind() {
    const backButton = this.element.querySelector(`.header__back`);
    backButton.style.cursor = `pointer`;
    backButton.addEventListener(`click`, () => {
      this.onBack();
    });
  }
  onStep() {
  }
  onBack() {
    App$1.showRules();
  }
}

// fail.js

class Fail {
  constructor() {
    this.view = new FailView();
  }
  init() {
    showScreen(this.view);
  }
}

class PreLoaderView extends AbstractView {
  get template() {
    return `
  <h1><img class="spiral" src="img/refreshing.png" width="50px" height="50px" style="margin-top: 200px;"></h1>
  `.trim();
  }

  start() {
    this.rotate();
  }

  hide() {
    clearTimeout(this.timeout);
  }
  rotate() {
    const image = this.element.querySelector(`.spiral`);
    setTimeout(() => {
      image.style.transform = `rotate(10000deg)`;
      image.style.transition = `50s`;
    }, 1);
  }
}

const ControllerId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`,
  FAIL: `fail`
};

const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);

class App {
  constructor() {
    const preloaderRemove = this.showPreloader();


    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
      }
      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/stats/${initialState.userName}`;
      }
    }();

    this.model.load(pixelAdapter)
      .then((data) => {
        this.setup(data);
        window.data = data;
        this.preload(data);
      })
      .then(preloaderRemove)
      .then(() => this.changeController(getControllerIDFromHash(location.hash)))
      .catch(window.console.error);
  }
  setup(data) {
    this.routes = {
      [ControllerId.INTRO]: new Intro(),
      [ControllerId.GREETING]: new Greeting(),
      [ControllerId.RULES]: new Rules(),
      [ControllerId.GAME]: new Game(this.model, data, 1),
      [ControllerId.STATS]: new Stats(),
      [ControllerId.FAIL]: new Fail()
    };
    window.onhashchange = () => {
      this.changeController(getControllerIDFromHash(location.hash));
    };
  }
  preload(data) {
    let images = [];
    const url = [];
    // пробежим по массиву data все урлы сохраним в массив
    for (let i = 0; i < data.length; i++) {
      url[i] = [];
      images[i] = [];
      for (let j = 0; j < data[i].answers.length; j++) {

        url[i][j] = data[i].answers[j].image.url;
        images[i][j] = new Image();
        images[i][j].src = url[i][j];
      }
    }
    window.images = images;
  }


  showPreloader() {
    const splashScreen = new PreLoaderView();
    showScreen(splashScreen);
    splashScreen.start();

    return () => splashScreen.hide();
  }


  changeController(route = ``) {
    this.routes[route].init();
  }

  showIntro() {
    location.hash = ControllerId.INTRO;
  }

  showGreeting() {
    location.hash = ControllerId.GREETING;
  }

  showRules() {
    location.hash = ControllerId.RULES;
  }

  showGameOne() {
    location.hash = ControllerId.GAME;
  }
  showGameTwo(data) {
    const gameTwoInit = new Game(this.model, data, 2);
    gameTwoInit.init();
  }
  showGameThree(data) {
    const gameThreeInit = new Game(this.model, data, 3);
    gameThreeInit.init();
  }
  showGameFour(data) {
    const gameFourInit = new Game(this.model, data, 4);
    gameFourInit.init();
  }
  showGameFive(data) {
    const gameFiveInit = new Game(this.model, data, 5);
    gameFiveInit.init();
  }
  showGameSix(data) {
    const gameSixInit = new Game(this.model, data, 6);
    gameSixInit.init();
  }
  showGameSeven(data) {
    const gameSevenInit = new Game(this.model, data, 7);
    gameSevenInit.init();
  }
  showGameEight(data) {
    const gameEightInit = new Game(this.model, data, 8);
    gameEightInit.init();
  }
  showGameNine(data) {
    const gameNineInit = new Game(this.model, data, 9);
    gameNineInit.init();
  }
  showGameTen(data) {
    const gameTenInit = new Game(this.model, data, 10);
    gameTenInit.init();
  }

  showStats() {
    location.hash = ControllerId.STATS;
  }
  showFail() {
    location.hash = ControllerId.FAIL;
  }
}


var App$1 = new App();

return App$1;

}());

//# sourceMappingURL=main.js.map
