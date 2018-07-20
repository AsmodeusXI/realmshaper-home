import * as React from "react";

import { About } from "./tabs/about/about";
import { Twitch } from "./tabs/twitch/twitch";
import { NameGen } from "./tabs/namegen/namegen";
import { FLCCombat } from "./tabs/combat/flc-combat";
import { CRCalculator } from "./tabs/crcalc/cr-calculator";
import { NavSection } from "./../nav/nav";
import { PokemonGen } from "./tabs/pokemongen/pokemongen";

import { GeneratorMain } from "name-maker";

import './content.scss';

interface ContentProps {
  tab: NavSection
}

export class Content extends React.Component<{}, {}> {
  props: ContentProps;

  renderTab(tab: NavSection): JSX.Element {
    switch (tab) {
      case NavSection.about:
        return <About />;
      case NavSection.twitch:
        return <Twitch />;
      case NavSection.nameGen:
        return <NameGen cultures={GeneratorMain.getAvailableCultures()}/>;
      case NavSection.flcCombat:
        return <FLCCombat />;
      case NavSection.crCalculator:
        return <CRCalculator />;
      case NavSection.pokemonGen:
        return <PokemonGen />
      default:
        throw new Error("Tab ID missing.");
    }
  }

  render() {
    return <main> {this.renderTab(this.props.tab)}</main>;
  }
}
