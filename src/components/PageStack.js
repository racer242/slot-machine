import React, { Component } from "react";
import MainPage from "../content/MainPage";
import ScoresPage from "../content/ScoresPage";
import Game1Page from "../content/Game1Page";
import Main1Page from "../content/Main1Page";
import Finish1Page from "../content/Finish1Page";
import WinPage from "../content/WinPage";

class PageStack extends Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    if (this.store) {
      this.state = {
        ...this.store.getState(),
      };
    } else this.state = { currentPage: "main" };
  }

  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() => {
      this.onStoreChange();
    });
    this.mounted = true;
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.mounted = false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  onStoreChange() {
    if (this.mounted) {
      let state = this.store.getState();
      this.setState({
        ...this.state,
        ...state,
      });
    }
  }

  render() {
    return (
      <div className="pageContainer">
        <div className="pageBg slow-pulsing"></div>
        {(this.state.currentPage === "main" ||
          this.state.currentPage === "game") && (
          <div className="head start appear-zoom">
            <h1 className="caps">Ипотечное бинго</h1>
          </div>
        )}
        {this.state.currentPage === "main" &&
          ((this.state.gameIndex == 1 && (
            <Main1Page bounds={this.props.bounds} store={this.store} />
          )) || <MainPage bounds={this.props.bounds} store={this.store} />)}

        {this.state.currentPage === "game" && this.state.gameIndex == 1 && (
          <Game1Page bounds={this.props.bounds} store={this.store} />
        )}
        {this.state.currentPage === "win" && (
          <WinPage bounds={this.props.bounds} store={this.store} />
        )}
        {this.state.currentPage === "fail" && (
          <Finish1Page bounds={this.props.bounds} store={this.store} />
        )}
      </div>
    );
  }
}

export default PageStack;
