import * as React from 'react';
import * as gen from 'flc-pokemon-gen';
import { PokemonType, PokemonMove, MoveStatus } from './gencomponents/pokeconstants';
import { MainSection, MainSectionProps } from '../../../components/mainsection';
import { UpdateMoves } from './gencomponents/updatemoves';
import { MoveDisplay } from './gencomponents/movedisplay';
import './pokemongen.scss';

interface GenState {
  type1?: string;
  type2?: string;
  mp: number;
  moves: Array<PokemonMove>;
}

export class PokemonGen extends MainSection<GenState> {
  constructor(props: MainSectionProps) {
    super(props);
    // Default to NORMAL just so the whole page works.
    this.state = {
      type1: PokemonType.NORMAL,
      type2: null,
      mp: gen.getMPForType(PokemonType.NORMAL, null),
      moves: [],
    };
  }

  handleTypeSelect(event: React.ChangeEvent<HTMLSelectElement>): void {
    const newState: GenState = {
			mp: 0,
			moves: [],
		};

    if (event.target.innerText === this.state.type1) {
      if (!this.state.type2) { return; }
      newState['type1'] = this.state.type2;
      newState['type2'] = null;
      newState['mp'] = gen.getMPForType(this.state.type2, null);
    } else if (event.target.innerText === this.state.type2) {
      newState['type2'] = null;
      newState['mp'] = gen.getMPForType(this.state.type1, null);
    } else if (!this.state.type1) {
      newState['type1'] = event.target.innerText;
      newState['type2'] = event.target.innerText;
      newState['mp'] = gen.getMPForType(event.target.innerText, null);
    } else {
      newState['type2'] = event.target.innerText;
			newState['mp'] = gen.getMPForType(this.state.type1, event.target.innerText);
    }

    this.setState(newState);
  }

  addMove(move: PokemonMove): void {
    this.setState((prevState): GenState => {
      return {
        mp: (prevState.mp - move.mp),
        moves: prevState.moves.concat([move]),
      };
    });
  }

  render(): JSX.Element {
    return (
      <article id="pokemon-gen-tab">
        <section id="pokemon-gen-about">
          <h2>{this.props.pageName}</h2>
          <p>
            FLC, the homebrew Pokemon Tabletop RPG I play with my friends, has a complicated character creation process. The math required to ensure that the tabletop statistics can be integrated with the moves and types from the video games (plus a few of our own custom additions). In the end, it boils down to this: Pokemon have a number of Move Points based on their types. They can then spend these Move Points in various ways on a set of moves, either damage-dealing or status-applying, as well as in or out of their types. We can use my <a target="_blank" href="https://www.npmjs.com/package/flc-pokemon-gen">flc-pokemon-gen</a> NPM package to perform these calculations and create a system-correct Pokemon every time!
          </p>
        </section>
        <section id="pokemon-gen-container">
					<section className="pokemon-gen-setup">
						<section className="pokemon-type-select">{
							Object.values(PokemonType).map((type: string): JSX.Element => {
							  let typeClass = `pokemon-type ${type}-class`;
    					  if (this.state.type1 === type) {
    					    typeClass = `${typeClass} selected-primary`;
    					  } else if (this.state.type2 && this.state.type2 === type) {
    					    typeClass = `${typeClass} selected-secondary`;
    					  }
    					  return (
									<div className={typeClass}
										onClick={this.handleTypeSelect.bind(this)}>
										{type}
									</div>
								);
    					})
						}</section>
						<section className="pokemon-mp">MP: {this.state.mp}</section>
          </section>
          <section className="pokemon-gen">
            <section className="pokemon-move-add">
               <UpdateMoves
                addMove={this.addMove.bind(this)}
                mp={this.state.mp}
                type1={this.state.type1}
                type2={this.state.type2}
                moves={this.state.moves}
              />
            </section>
          </section>
          <section className="pokemon-move-list">{
						this.state.moves.length > 0
							?	this.state.moves.map((move: PokemonMove): JSX.Element => {
							  return <MoveDisplay
    					    name={move.name}
    					    type={move.type}
    					    power={move.power}
    					    status={move.status}
    					    mp={move.mp}
    					  />;
    					})
							: <p>No Moves Added.</p>
					}</section>
				</section>
      </article>
    );
  }
}
