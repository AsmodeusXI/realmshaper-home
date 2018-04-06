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
    const navClass = `shadow-1 ${this.props.className}`;
    return <div id={this.props.id} className={navClass} onClick={() => this.props.handleNav(this.props.id)}>
      {this.props.name}
    </div>;
  }
}
