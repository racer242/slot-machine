import React, { Component } from "react";
import { setStoreData } from "../actions/appActions";
import { getScoreTitleInGenitive } from "../utils/stringTools";

class WinPage extends Component {
  constructor(props) {
    super(props);

    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = {};

    this.closeButton_clickHandler = this.closeButton_clickHandler.bind(this);
    this.startButton_clickHandler = this.startButton_clickHandler.bind(this);
  }

  startButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "game" }));
  }
  closeButton_clickHandler(event) {
    this.store.dispatch(setStoreData({ currentPage: "main" }));
  }

  render() {
    let giftParticles = [];
    for (let i = 0; i < this.state.game1.giftParticlesCount; i++) {
      giftParticles.push(<div key={"p" + i} className="g1-gift"></div>);
    }
    return (
      <div className={"finishPage common g" + this.state.gameIndex}>
        <div className="pageTitle">
          <h1 className="caps appear-zoom">Бинго!</h1>
        </div>

        <div className="plate appear-bottom">
          <div className="g1-gifting-container">{giftParticles}</div>
          <div className="redStripe appear-expand delay1s"></div>
          <h1 className="appear-zoom-out delay300ms">X2</h1>
          <p className="appear-bottom delay800ms">
            Твои шансы на главный приз удвоены!
          </p>
        </div>

        <div className="button-group">
          <div
            className="secondary-button large appear-bottom delay300ms"
            onClick={this.closeButton_clickHandler}
          >
            Играть позже
          </div>
          {(!this.state.userNotAuthorized || this.state.activityIsOver) && (
            <div
              className="primary-button large inverted appear-bottom"
              onClick={this.startButton_clickHandler}
            >
              Играть еще
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default WinPage;
