import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";

class Main1Page extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
    this.signUpWarning_clickHandler =
      this.signUpWarning_clickHandler.bind(this);
  }

  startButton_clickHandler(event) {
    this.store.dispatch(
      setStoreData({
        currentPage: "game",
      }),
    );
  }

  signUpWarning_clickHandler(event) {
    if (this.state.signUpHandler) {
      this.state.signUpHandler();
    }
  }

  render() {
    let children = [];
    children.push(this.props.children);

    return (
      <div className="mainPage g1">
        <div className="plate appear-top delay500ms">
          <div className="animations-container delay2s floating">
            <div className="plate-items appear-zoom delay1s"></div>
          </div>
          <div className="logo logo-pulsing"></div>
          <p>
            Нажимай на кнопку и играй. Если выпадет три одинаковых карточки,
            твои шансы в розыгрыше главного приза удваиваются.
          </p>
          <div
            className="primary-button large appear-bottom delay1s"
            onClick={this.startButton_clickHandler}
          >
            Играть
          </div>
          {this.state.userNotAuthorized && !this.state.activityIsOver && <></>}
        </div>
      </div>
    );
  }
}

export default Main1Page;
