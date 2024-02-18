class CreateCard extends React.Component {
  constructor() {
    super();
    this.state = {
      word: "",
      description: "",
      showError: false };

  }

  hideError() {
    this.setState({ showError: !this.state.showError });
  }

  render() {
    const errorMessage = this.state.showError ?
    "Fill in the word and description!" :
    "";
    return /*#__PURE__*/(
      React.createElement("div", { className: "create-card" }, /*#__PURE__*/
      React.createElement("div", {
        className: "create-card__shadow",
        onClick: () => {
          this.props.onShadowClick();
        } }), /*#__PURE__*/

      React.createElement("div", { className: "create-card__body" }, /*#__PURE__*/
      React.createElement("h1", null, "Create New Card"), /*#__PURE__*/
      React.createElement("div", { className: "create-card__input-wrapper" }, /*#__PURE__*/
      React.createElement("input", {
        id: "word",
        placeholder: "Term",
        value: this.state.word,
        onChange: e => this.setState({ word: e.target.value }) }), /*#__PURE__*/

      React.createElement("input", {
        id: "description",
        placeholder: "Description",
        value: this.state.description,
        onChange: e => this.setState({ description: e.target.value }) }), /*#__PURE__*/

      React.createElement("br", null), /*#__PURE__*/
      React.createElement("button", {
        id: "create-card__button",
        onClick: () => {
          if (
          this.state.word.length === 0 ||
          this.state.description.length === 0)
          {
            this.setState({ showError: !this.state.showError });
            setTimeout(() => this.hideError(), 2000);
          } else {
            this.props.onShadowClick();
            const word = new Immutable.Map({
              word: this.state.word,
              description: this.state.description });

            this.props.onCreateCard(word);
          }
        } }, "Create!"), /*#__PURE__*/



      React.createElement("div", { className: "create-card__error" }, errorMessage)))));




  }}


class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false };

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "header" }, /*#__PURE__*/
      React.createElement("div", { className: "header-content header-content__left" }), /*#__PURE__*/
      React.createElement("div", { className: "header-content header-content__middle" }, "My Cards"), /*#__PURE__*/
      React.createElement("div", { className: "header-content header-content__right" })));


  }}

class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      showAnswer: false };

  }

  render() {
    const content = this.state.showAnswer ?
    this.props.backContent :
    this.props.frontContent;
    const iconClass = this.state.showAnswer ? "reply" : "share";
    const cardClass = this.state.showAnswer ? "back" : "";
    const contentClass = this.state.showAnswer ? "back" : "front";
    const actionClass = this.state.showAnswer ? "active" : "";

    return /*#__PURE__*/(
      React.createElement("div", {
        className: `card ${cardClass}`,
        onClick: () => this.setState({ showAnswer: !this.state.showAnswer }) }, /*#__PURE__*/

      React.createElement("span", { className: "card__counter" }, this.props.cardNumber + 1), /*#__PURE__*/
      React.createElement("div", {
        className: "card__flip-card",
        onClick: () => {
          this.setState({ showAnswer: !this.state.showAnswer });
        } }, /*#__PURE__*/
        React.createElement("div", {
          className: "card_delete-button",
          onClick: () => {
            function deleteItem(e){
              console.log("Button element", e)
              e.parentElement.remove()
            }
            deleteItem(this);
          } 
        }, "Delete"),

      React.createElement("span", { className: `fa fa-${iconClass}` })), /*#__PURE__*/
      

      React.createElement("div", { className: `card__content--${contentClass}` }, content), /*#__PURE__*/
      React.createElement("div", { className: `card__actions ${actionClass}` }, /*#__PURE__*/
      React.createElement("div", {
        className: "card__prev-button",
        onClick: () => {
          this.props.showPrevCard();
          this.setState({ showAnswer: false });
        } }, "Previous"), /*#__PURE__*/



      React.createElement("div", {
        className: "card__next-button",
        onClick: () => {
          this.props.showNextCard();
          this.setState({ showAnswer: false });
        } }, "Next"))));



  }}


class CardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: Immutable.fromJS([
      {
        word: "Jazz",
        description:
        "Jazzy" },

      {
        word: "Country",
        description: "yeehaw" },

      {
        word: "Folk",
        description: "strum strum - banjo" }]),


      cardNumber: 0 };

    this.boundCallback = this.hideCreateCard.bind(this);
    this.boundCreateCard = this.setCard.bind(this);
    this.boundShowPrevCard = this.showPrevCard.bind(this);
    this.boundShowNextCard = this.showNextCard.bind(this);
  }

  hideCreateCard() {
    this.setState({ showModal: false });
  }

  showNextCard() {
    if (this.state.cardNumber + 1 !== this.state.cards.size) {
      this.setState({ cardNumber: this.state.cardNumber += 1 });
    }
  }

  showPrevCard() {
    if (this.state.cardNumber !== 0) {
      this.setState({ cardNumber: this.state.cardNumber -= 1 });
    }
  }

  setCard(card) {
    const newCards = this.state.cards.push(card);
    this.setState({ cards: newCards });
  }

  generateDots() {
    const times = this.state.cards.size;
    let arr = [];
    _.times(times).forEach(num => {
      const dotClass = num === this.state.cardNumber ? "active" : "";
      arr.push( /*#__PURE__*/
      React.createElement("span", {
        className: `card-container__dot fa fa-circle ${dotClass}`,
        onClick: () => this.setState({ cardNumber: num }) }));

    });
    return arr;
  }

  generateCards() {
    const cards = this.state.cards;
    const cardsList = cards.map(card => {
      return /*#__PURE__*/(
        React.createElement(Card, {
          frontContent: card.get("word"),
          backContent: card.get("description"),
          showNextCard: this.boundShowNextCard,
          showPrevCard: this.boundShowPrevCard,
          cardNumber: this.state.cardNumber }));

    });
    return cardsList.toJS()[this.state.cardNumber];
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("span", {
        className: "card-container__icon  fa fa-plus",
        onClick: () => {
          this.setState({ showModal: !this.state.showModal });
        } }),

      this.state.showModal ? /*#__PURE__*/
      React.createElement(CreateCard, {
        onShadowClick: this.boundCallback,
        onCreateCard: this.boundCreateCard }) :

      "",

      this.generateCards(), /*#__PURE__*/
      React.createElement("div", { className: "card-container__dots-wrapper" },
      this.generateDots())));

  }}


class Main extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "wrapper" }, 
      React.createElement(Header, null), 
      React.createElement("div", { className: "content-wrapper" },
      React.createElement(CardContainer, null))));



  }}


ReactDOM.render(React.createElement(Main, null), document.getElementById("app"));