import * as React from "react";

export class Card extends React.Component<{}, {}> {
  props: {
    id?: string,
    name?: string
  }
  
  render() {
    return <div id={this.props.id}>
      {this.props.name}
    </div>;
  }
}
