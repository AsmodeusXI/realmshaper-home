import * as React from "react";

import { About } from "./tabs/about/about";
import { Twitch } from "./tabs/twitch/twitch";
import { NameGen } from "./tabs/namegen/namegen";
import { FLCCombat } from "./tabs/combat/flc-combat";

import { GeneratorMain } from "name-maker";

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
        return <NameGen cultures={GeneratorMain.getAvailableCultures()}/>;
      case "flc-combat":
        return <FLCCombat />
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
