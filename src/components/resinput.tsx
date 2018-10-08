import * as React from 'react';

interface ResInputProps {
	type?: string;
	value?: string | number;
	name: string;	
	placeholder?: string;
	update: Function;
	reference?: Function;
	className?: string;
}

export class ResInput extends React.Component<ResInputProps, {}> {
	render(): JSX.Element {
		return (
			<input
				ref={this.props.reference ? (input) => this.props.reference(input) : null}
				type={this.props.type ? this.props.type : 'text'}
				value={this.props.value ? this.props.value : ''}
				name={this.props.name}
				placeholder={this.props.placeholder}
				className={this.props.className}
				onChange={(e) => this.props.update(e)}
				onBlur={(e) => this.props.update(e)} />
		);
	}
}
