import * as React from "react";
import { About } from "./tabs/about/about";
import { Twitch } from "./tabs/twitch/twitch";
import { NameGen } from "./tabs/namegen/namegen";
import { FLCCombat } from "./tabs/combat/flc-combat";
import { CRCalculator } from "./tabs/crcalc/cr-calculator";
import { NavSection, Nav } from "./../nav/nav";
import { PokemonGen } from "./tabs/pokemongen/pokemongen";
import { HabitGame } from "./tabs/habitgame/habitgame";
import './content.scss';

interface ContentProps {
  tab: NavSection
}

export class Content extends React.Component<ContentProps, {}> {
  renderTab(tab: NavSection): JSX.Element {
    switch (tab) {
      case NavSection.about:
        return <About pageName={Nav.getNavigationName(NavSection.about)}/>;
      case NavSection.twitch:
        return <Twitch pageName={Nav.getNavigationName(NavSection.twitch)}/>;
      case NavSection.nameGen:
        return <NameGen pageName={Nav.getNavigationName(NavSection.nameGen)}/>;
      case NavSection.flcCombat:
        return <FLCCombat pageName={Nav.getNavigationName(NavSection.flcCombat)}/>;
      case NavSection.crCalculator:
        return <CRCalculator pageName={Nav.getNavigationName(NavSection.crCalculator)}/>;
      case NavSection.pokemonGen:
        return <PokemonGen pageName={Nav.getNavigationName(NavSection.pokemonGen)}/>;
			case NavSection.habitGame:
				return <HabitGame pageName={Nav.getNavigationName(NavSection.habitGame)}/>;
      default:
        throw new Error("ERROR: No tab with this ID exists. How did you click this?");
    }
  }

  render(): JSX.Element {
    return (
			<main>{this.renderTab(this.props.tab)}</main>
		);
  }
}
