import * as React from "react";

import { Card } from "./card";

import "./nav.scss";

interface NavProps {
  tab?: string,
  handleNav?: Function
}

export class Nav extends React.Component<{}, {}> {
  props: NavProps;

  getSelected(tab: string): string {
    let className = 'nav-card';
    if (tab === this.props.tab) {
      className = `${className} selected`;
    }
    return className;
  }

  render() {
    return <nav>
      <Card id='about' name='About' className={this.getSelected('about')} handleNav={this.props.handleNav} />
      <Card id='twitch' name='Twitch' className={this.getSelected('twitch')} handleNav={this.props.handleNav} />
      <Card id='name-gen' name='Name Generator' className={this.getSelected('name-gen')} handleNav={this.props.handleNav} />
    </nav>;
  }
}
