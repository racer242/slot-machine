import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

class AttemptsOverPage extends Component {
  constructor(props) {
    super(props);

    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
  }

  closeButton_clickHandler(event) {
    // this.store.dispatch(setStoreData({ currentPage: "main" }));
    this.state.closeHandler();
  }

  render() {
    return (
      <div className={"finishPage common g" + this.state.gameIndex}>
        <div className="plate appear-top">
          <div className="attemptsOver appear-zoom"></div>
          <p className="appear-bottom caps delay300ms">
            У тебя 0 попыток, зарегистрируй 4 кода для&nbsp;участия.
          </p>
        </div>

        <div
          className="primary-button large inverted appear-bottom"
          onClick={this.closeButton_clickHandler}
        >
          Закрыть
        </div>
      </div>
    );
  }
}

export default AttemptsOverPage;
