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
	habitGame = 'habit-game'
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
		[NavSection.habitGame]: 'Habit Game Generator'
	};

	static getNavigationName(navKey: string): string {
		return Nav.navigationName[navKey];
	}

  getSelected(tab: string): string {
    return (tab === this.props.tab) ? 'nav-card selected' : 'nav-card';
	}

	toggleMenu() {
		document.getElementsByTagName('nav')[0].className === 'hide-nav'
			? document.getElementsByTagName('nav')[0].className = 'show-nav'
			: document.getElementsByTagName('nav')[0].className = 'hide-nav';
	}

  render(): JSX.Element {
    return (
			<>
				<section className="nav-display" onClick={() => this.toggleMenu()}>
					<i className="fa fa-caret-right"/> Click to Toggle Menu
				</section>
				<nav className='hide-nav'>
					{
						Object.values(NavSection).map((tab: string): JSX.Element => {
							return <Card id={tab}
								name={Nav.getNavigationName(tab)}
								className={this.getSelected(tab)}
								handleNav={this.props.handleNav} />
						})
					}
				</nav>
			</>
		);
  }
}
