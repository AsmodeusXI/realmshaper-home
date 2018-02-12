import * as React from "react";

interface CardProps {
  id?: string,
  name?: string,
  className?: string,
  handleNav?: Function
}

export class Card extends React.Component<{}, {}> {
  props: CardProps;

  constructor(props: CardProps) {
    super(props);
  }

  render() {
    return <div id={this.props.id} className={this.props.className} onClick={() => this.props.handleNav(this.props.id)}>
      {this.props.name}
    </div>;
  }
}
