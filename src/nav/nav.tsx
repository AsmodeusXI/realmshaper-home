import * as React from "react";
import { Card } from "./card";
import "./nav.scss";

export enum NavSection {
  about = 'about',
  twitch = 'twitch',
  nameGen = 'name-gen',
  flcCombat = 'flc-combat',
  crCalculator = 'cr',
  pokemonGen = 'pokemon-gen',
}

interface NavProps {
  tab: string,
  handleNav?: Function
}

export class Nav extends React.Component<NavProps, {}> {
	private static navigationName: {[key: string]: string } = {
		[NavSection.about]: 'About',
		[NavSection.twitch]: 'Twitch Viewer',
		[NavSection.flcCombat]: 'FLC Combat Tracker',
		[NavSection.crCalculator]: 'D&D 5e CR Calculator',
		[NavSection.pokemonGen]: 'FLC Pokémon Generator',
		[NavSection.nameGen]: 'Name Generator',
	};

	static getNavigationName(navKey: string): string {
		return Nav.navigationName[navKey];	
	}

  getSelected(tab: string): string {
    return (tab === this.props.tab) ? 'nav-card selected' : 'nav-card';
  }

  render(): JSX.Element {
    return <nav>
				{ 
					Object.values(NavSection).map((tab: string): JSX.Element => {
						return <Card id={tab}
							name={Nav.getNavigationName(tab)}
							className={this.getSelected(tab)}
							handleNav={this.props.handleNav} />
					}) 
				}
			</nav>;
  }
}
