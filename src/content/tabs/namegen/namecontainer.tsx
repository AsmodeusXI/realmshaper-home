import * as React from 'react';
import { GeneratorMain } from "name-maker";
import { NameList } from './namelist';

interface NameContainerProps {
	cultures: Array<string>;
}

interface NameContainerState {
	[key: string]: Array<string>;
}

export class NameContainer extends React.Component<NameContainerProps, NameContainerState> {
	constructor(props: NameContainerProps) {
		super(props);
    this.state = props.cultures.reduce((obj, culture) => {
			obj[culture] = GeneratorMain.generateNames(culture, 10);
			return obj;
		}, {});
  }

  generateNames(culture: string): void {
    this.setState({
			[culture]: GeneratorMain.generateNames(culture, 10)
		});
  }
	
	capitalize(str: string): string {
		return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
	}

	render(): JSX.Element[] {
		return (
			this.props.cultures.map((culture: string): JSX.Element => {
				return <section id={`${culture}-names`} className="name-container">
					<div className="center">
						<button onClick={this.generateNames.bind(this, culture)}>
							{`Generate ${this.capitalize(culture)} Names`}
          	</button>
          </div>
          <NameList names={this.state[culture]} culture={culture}/>
				</section>;
			})
		);	
	}
}
