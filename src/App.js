import { Component } from "react";
import Button from "./components/Button";
import "./css/style.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "0",
      prev: [],
      nextIsReset: false,
    };
  }
  reset = () => {
    this.setState({ current: "0", prev: [], nextIsReset: false });
  };

  addToCurrent = (symbol) => {
    console.log("symbol");
    if (["+", "-", "*", "/"].indexOf(symbol) > -1) {
      let { prev } = this.state;
      prev.push(this.state.current + symbol);
      this.setState({ prev, nextIsReset: true });
    } else {
      if (
        (this.state.current === "0" && this.state.current !== ".") ||
        this.state.nextIsReset
      ) {
        this.setState({ current: symbol, nextIsReset: false });
      } else {
        this.setState({ current: this.state.current + symbol });
      }
    }
  };

  calculate = (symbol) => {
    console.log("equal")
    let { current, prev, nextIsReset } = this.state;
    if (prev.length > 0) {
      current = eval(String(prev[prev.length - 1] + current));
      this.setState({ current, prev:[], nextIsReset: true });
    }
  };
  render() {
    const buttons = [
      { symbol: "C", cols: 3, action: this.reset },
      { symbol: "/", cols: 1, action: this.addToCurrent },
      { symbol: "7", cols: 1, action: this.addToCurrent },
      { symbol: "8", cols: 1, action: this.addToCurrent },
      { symbol: "9", cols: 1, action: this.addToCurrent },
      { symbol: "*", cols: 1, action: this.addToCurrent },
      { symbol: "4", cols: 1, action: this.addToCurrent },
      { symbol: "5", cols: 1, action: this.addToCurrent },
      { symbol: "6", cols: 1, action: this.addToCurrent },
      { symbol: "-", cols: 1, action: this.addToCurrent },
      { symbol: "1", cols: 1, action: this.addToCurrent },
      { symbol: "2", cols: 1, action: this.addToCurrent },
      { symbol: "3", cols: 1, action: this.addToCurrent },
      { symbol: "+", cols: 1, action: this.addToCurrent },
      { symbol: "0", cols: 2, action: this.addToCurrent },
      { symbol: ".", cols: 1, action: this.addToCurrent },
      { symbol: "=", cols: 1, action: this.calculate },
    ];
    return (
      <div className="App">
        {this.state.prev.length > 0 ? (
          <div className="floaty-last">
            {this.state.prev[this.state.prev.length - 1]}
          </div>
        ) : null}
        <input type="text" className="result" value={this.state.current} />
        {buttons.map((btn, i) => {
          return (
            <Button
              key={i}
              symbol={btn.symbol}
              cols={btn.cols}
              action={(symbol) => btn.action(symbol)}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
