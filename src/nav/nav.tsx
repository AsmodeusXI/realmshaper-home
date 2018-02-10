import * as React from "react";

import { Card } from "./card";

import "./nav.scss";

export class Nav extends React.Component<{}, {}> {
  render() {
    return <nav>
      <Card id='about' name='About'/>
      <Card id='twitch' name='Twitch'/>
      <Card id='name-gen' name='Name Generator'/>
    </nav>;
  }
}
