import * as React from 'react';
import { PokemonMove } from './pokeconstants';

interface AddMoveProps {
  mp: number;
  addMove: Function;
  resetCurrentMove: Function;
  move: PokemonMove;
}

export class AddMove extends React.Component<AddMoveProps, {}> {
  handleClick(): void {
    this.props.resetCurrentMove();
    this.props.addMove(Object.assign({}, this.props.move));
  }

  render(): JSX.Element {
    return (
      <button className='add-move-button'
				disabled={(this.props.mp - this.props.move.mp) < 0}
				onClick={this.handleClick.bind(this)}>
        <i className="fa fa-plus"></i>
      </button>
    );
  }
}
