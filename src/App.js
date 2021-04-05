import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import Component from "./Component";

const ReactGridLayout = WidthProvider(RGL);

export default class App extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 5,
    cols: 48,
    rowHeight: 10,
    onLayoutChange: function() {},
    verticalCompact: false,
    preventCollision: true
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i} style={{backgroundColor: "white", color: "black"}}>
          <Component text={i} />
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 8) % p.cols,
        y: Math.floor(i / 6) * y,
        w: 8,
        h: 10,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}
