import * as React from "react";

import { About } from "./tabs/about";
import { Twitch } from "./tabs/twitch";
import { NameGen } from "./tabs/namegen";

import './content.scss';

interface ContentProps {
  tab?: string
}

export class Content extends React.Component<{}, {}> {
  props: ContentProps;

  renderTab(tab: string): JSX.Element {
    switch (tab) {
      case "about":
        return <About />;
      case "twitch":
        return <Twitch />;
      case "name-gen":
        return <NameGen />;
      default:
        throw new Error("Tab ID missing.");
    }
  }

  render() {
    return <main>
      {this.renderTab(this.props.tab)}
    </main>;
  }
}
