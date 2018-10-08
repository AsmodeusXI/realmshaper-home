import * as React from 'react';

interface ResSelectProps {
	name: string;
	options: Array<JSX.Element>;
	update: Function;
}

export class ResSelect extends React.Component<ResSelectProps, {}> {
	render(): JSX.Element {
		return (
			<select
				name={this.props.name}
				onChange={(e) => this.props.update(e)}
				onBlur={(e) => this.props.update(e)} >
				{this.props.options}
			</select>
		);
	}
}
