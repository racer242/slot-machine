import React from "react";
import GamePage from "./GamePage";
import { setStoreData } from "../actions/appActions";

class Game1Page extends GamePage {
  constructor(props) {
    super(props);

    let offsets = this.getRandomOffsets();

    this.state = {
      ...this.state,
      objects: [],
      gameDuration: this.state.game1.gameDuration,
      stopDuration: this.state.game1.stopDuration,
      stepDuration: this.state.game1.stepDuration,
      ...offsets,
      offsets: null,
      win: false,
      showWin: false,
      winSlot: -1,
      slot: 0,
      step: "init",
      count: 0,
    };

    this.sequence1 = [0, 1, 2, 3, 4, 5, 6];
    this.sequence2 = [5, 4, 1, 0, 3, 6, 2];
    this.sequence3 = [2, 5, 3, 6, 4, 1, 0];

    this.initialized = false;
  }

  getRandomOffset() {
    return -76 * Math.floor(Math.random() * 7) - 2 * 76;
  }

  getRandomValue() {
    return Math.floor(Math.random() * 7);
  }

  getRelativeOffset(offset, sequence) {
    return -76 * sequence[offset] - 2 * 76;
  }

  getRandomOffsets() {
    let offsets;
    do {
      offsets = {
        offset1: this.getRandomOffset(),
        offset2: this.getRandomOffset(),
        offset3: this.getRandomOffset(),
      };
    } while (
      offsets.offset1 === offsets.offset2 &&
      offsets.offset1 === offsets.offset3 &&
      offsets.offset2 === offsets.offset3
    );
    return offsets;
  }

  doAfterStoreChange(state) {
    if (!this.initialized) {
      if (state?.startRegistered) {
        if (state?.gameCredentials.prize) {
          this.initialized = true;
          let value = this.getRandomValue();
          state = {
            ...state,
            offsets: {
              offset1: this.getRelativeOffset(value, this.sequence1),
              offset2: this.getRelativeOffset(value, this.sequence2),
              offset3: this.getRelativeOffset(value, this.sequence3),
            },
            win: true,
            winSlot: value,
          };
        } else {
          state = {
            ...state,
            offsets: this.getRandomOffsets(),
          };
        }
        state = {
          ...state,
          step: "start",
        };
      }
    }
    return state;
  }

  doStart() {}

  doGame() {
    let state = this.state;
    let step = this.state.step;
    let count = this.state.count;

    if (step === "init") {
      count++;
      if (count > 8) {
        step = this.state.offsets ? "start" : "wait";
        count = 0;
      }
    } else if (step === "start") {
      count++;
      if (count > 4) {
        step = "finish1";
        count = 0;
        state = {
          ...state,
          slot: 1,
          offset1: this.state.offsets.offset1,
        };
      }
    } else if (step === "finish1") {
      count++;
      if (count > 3) {
        step = "finish2";
        count = 0;
        state = {
          ...state,
          slot: 2,
          offset2: this.state.offsets.offset2,
        };
      }
    } else if (step === "finish2") {
      count++;
      if (count > 3) {
        step = "finish3";
        count = 0;
        state = {
          ...state,
          slot: 3,
          offset3: this.state.offsets.offset3,
        };
      }
    } else if (step === "finish3") {
      count++;
      if (count > 3) {
        if (state.win) {
          step = "showWin";
          count = 0;
          state = {
            ...state,
            showWin: true,
          };
        } else {
          step = "showFail";
        }
      }
    } else if (step === "showWin") {
      count++;
      if (count > 7) {
        step = "gameOver";
        count = 0;
        state = {
          ...state,
          finished: true,
        };
        this.stopGame();
        this.finishGame();
      }
    } else if (step === "showFail") {
      count++;
      if (count > 4) {
        step = "gameOver";
        count = 0;
        state = {
          ...state,
          finished: true,
        };
        this.stopGame();
        this.finishGame();
      }
    }

    this.setState({
      ...state,
      step,
      count,
    });

    return true;
  }

  doControl() {
    return true;
  }

  doAfterFinish() {
    if (this.state.win) {
      this.store.dispatch(
        setStoreData({
          currentPage: "win",
          gameScore: 1,
        }),
      );
    } else {
      this.store.dispatch(
        setStoreData({
          currentPage: "fail",
          gameScore: 0,
        }),
      );
    }
  }

  render() {
    // console.log(this.state.step, this.state);
    // console.log(this.state.step);

    let giftParticles = [];
    if (this.state.showWin) {
      for (let i = 0; i < this.state.game1.giftParticlesCount; i++) {
        giftParticles.push(<div key={"p" + i} className="g1-gift"></div>);
      }
    }

    return (
      <div className="gamePage g1">
        <div className="plate appear-bottom">
          <h2
            className="plateTitle"
            style={{
              opacity: this.state.showWin ? 0 : 1,
              transition: "opacity 1s",
            }}
          >
            Если выпадет три одинаковых карточки, твои шансы в розыгрыше
            главного приза удваиваются.
          </h2>
          <div className="animations-container delay2s floating">
            <div className="plate-items appear-zoom delay300ms"></div>
          </div>
          <div className="slotMachineContainer">
            <div className="slotMachineLeverBase"></div>
            <div className="slotMachineLeverContainer">
              <div className="slotMachineLever leverRotate"></div>
            </div>
            <div className="slotMachineHandle handleMotion"></div>
            <div className="slotMachine">
              <div className="appear-visible">
                <div className="slotMachineLights odd lights"></div>
                <div className="slotMachineLights even lights"></div>
              </div>
            </div>
            <div className="slotMachineSlotsContainer">
              <div
                key={this.state.slot > 0 ? "active1" : "waiting1"}
                className={
                  "slotMachineSlots slots1 " +
                  (this.state.slot > 0 ? "slotsMotion" : "slotsWaitingMotion")
                }
                style={{ left: 0, backgroundPositionY: this.state.offset1 }}
              ></div>
              <div
                key={this.state.slot > 1 ? "active2" : "waiting2"}
                className={
                  "slotMachineSlots slots2 " +
                  (this.state.slot > 1 ? "slotsMotion" : "slotsWaitingMotion")
                }
                style={{ left: 79, backgroundPositionY: this.state.offset2 }}
              ></div>
              <div
                key={this.state.slot > 2 ? "active3" : "waiting3"}
                className={
                  "slotMachineSlots slots3 " +
                  (this.state.slot > 2 ? "slotsMotion" : "slotsWaitingMotion")
                }
                style={{
                  left: 79 * 2,
                  backgroundPositionY: this.state.offset3,
                }}
              ></div>
            </div>
            <div className="slotMachineOverlay"></div>

            {this.state.showWin && (
              <div className="g1-gifting-container">{giftParticles}</div>
            )}

            {this.state.showWin && (
              <div
                className={
                  "slotMachineWinSlot winSlotAnimation delay300ms winSlots" +
                  this.state.winSlot
                }
              ></div>
            )}
          </div>
        </div>

        <div
          className="winTitleOverlay"
          style={{
            opacity: this.state.showWin ? 1 : 0,
          }}
        ></div>
        {this.state.showWin && (
          <div className="winTitle appear-zoom">
            <div className="winTitleItem left appear-zoom delay500ms"></div>
            <h1 className="caps">Поздравляем!</h1>
            <div className="winTitleItem right appear-zoom delay500ms"></div>
          </div>
        )}
      </div>
    );
  }
}

export default Game1Page;
