import * as React from "react";

import { Card } from "./card";

import "./nav.scss";

export enum NavSection {
  about = 'about',
  twitch = 'twitch',
  nameGen = 'name-gen',
  flcCombat = 'flc-combat'
}

interface NavProps {
  tab?: string,
  handleNav?: Function
}

export class Nav extends React.Component<{}, {}> {
  props: NavProps;

  getSelected(tab: string): string {
    let className = 'nav-card';
    if (tab === this.props.tab) className = `${className} selected`;
    return className;
  }

  render() {
    return <nav>
      <Card id={NavSection.about}
        name='About' className={this.getSelected(NavSection.about)} handleNav={this.props.handleNav} />
      <Card id={NavSection.twitch}
        name='Twitch' className={this.getSelected(NavSection.twitch)} handleNav={this.props.handleNav} />
      <Card id={NavSection.nameGen}
        name='Name Generator' className={this.getSelected(NavSection.nameGen)} handleNav={this.props.handleNav} />
      <Card id={NavSection.flcCombat}
        name='FLC Combat Tracker' className={this.getSelected(NavSection.flcCombat)} handleNav={this.props.handleNav} />
    </nav>;
  }
}
