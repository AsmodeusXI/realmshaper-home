import * as React from "react";

interface NameListProps {
	names: Array<string>, 
	culture: string,
}

export class NameList extends React.Component<NameListProps, {}> {
  render(): JSX.Element {
    return (
			<ul>{this.props.names.map((name: string): JSX.Element => {
				return <li className={this.props.culture}>{name}</li>;
			})}</ul>
		);
  }
}

