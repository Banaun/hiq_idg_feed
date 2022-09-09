import React, { Component } from "react";

class FlipAnimated extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  getSnapshotBeforeUpdate() {
    if (this.ref.current) {
      // first
      return this.ref.current.getBoundingClientRect();
    }
    return null;
  }

  // below `snapshot` is whatever returned `getSnapshotBeforeUpdate`
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.ref.current) {
      const first = snapshot;
      // last
      const last = this.ref.current.getBoundingClientRect();
      // invert
      const deltaX = last.left - first.left;
      const deltaY = last.top - first.top;

      this.ref.current.animate(
        [
          { transform: `translate(${-deltaX}px, ${-deltaY}px)` },
          // play
          { transform: "translate(0,0)" },
        ],
        {
          duration: 300,
          easing: "ease-out",
        }
      );
    }
  }
  render() {
    return React.cloneElement(this.props.children, { ref: this.ref });
  }
}

export default FlipAnimated;
