import React, {Component} from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      h: undefined,
      l: undefined,
      b: undefined,
      size: 30
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  generateBoxes = x => {
    const cellStyles = {
      height: this.state.size,
      width: this.state.size
    };
    return Array.from(new Array(x)).map((_, i) => (
      <div className="cell" style={cellStyles} key={i} />
    ));
  };

  render() {
    const { l, b, h, size } = this.state;

    const triangleContainerStyles = {
      height: b * size + "px",
      width: l * size + "px",
      position: "relative"
    };

    const triangleStyles = {
      height: b * size + "px",
      width: l * size + "px"
    };

    const rightStyles = {
      height: b * size + "px",
      width: b * size + "px",
      gridTemplateColumns: `repeat( ${b}, 1fr)`
    };

    const topStyles = {
      height: h * size + "px",
      width: h * size + "px",
      transform: `rotate(-${Math.asin(b / h)}rad)`,
      gridTemplateColumns: `repeat( ${h}, 1fr)`
    };

    const bottomStyles = {
      height: l * size + "px",
      width: l * size + "px",
      gridTemplateColumns: `repeat( ${l}, 1fr)`
    };

    return (
      <div className="App">
        <h2>Pythagorean Triplets Vizualization</h2>

        <form>
          <label>
            Length &nbsp;
            <input
              type="text"
              value={this.state.l}
              name="l"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Breath &nbsp;
            <input
              type="text"
              value={this.state.b}
              name="b"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Height &nbsp;
            <input
              type="text"
              value={this.state.h}
              name="h"
              onChange={this.handleChange}
            />
          </label>
        </form>

        <div className="canvas">
          {!l || !b || !h ? (
            <h3>Provide all the values.</h3>
          ) : l * l + b * b !== h * h ? (
            <h3>Not a Pythagorean Triplet.</h3>
          ) : (
            <div className="triangleContainer" style={triangleContainerStyles}>
              <div className="posAbs triangle" style={triangleStyles}>
                <span className={"posAbs span-l"}>{l}</span>
                <span className={"posAbs span-b"}>{b}</span>
                <span className={"posAbs span-h"}>{h}</span>
              </div>
              <div className="posAbs gridBox right" style={rightStyles}>
                {this.generateBoxes(b * b)}
              </div>
              <div className="posAbs gridBox top" style={topStyles}>
                {this.generateBoxes(h * h)}
              </div>
              <div className="posAbs gridBox bottom" style={bottomStyles}>
                {this.generateBoxes(l * l)}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
