import * as React from 'react';
import { PokemonMove, MoveStatus } from './pokeconstants';

export class MoveDisplay extends React.Component<PokemonMove, {}> {
  render(): JSX.Element {
    const typeClass = `pokemon-type ${this.props.type}-class`;
    return (
      <section className='pokemon-move'>
        <section className='pokemon-name'>{this.props.name}</section>
        <section className={typeClass}>{this.props.type}</section>
        <section className='pokemon-power'>d{this.props.power}</section>
        <section className='pokemon-status'>{MoveStatus[this.props.status]}</section>
        <section className='pokemon-mp-cost'>MP: {this.props.mp}</section>
      </section>
    );
  }
}
