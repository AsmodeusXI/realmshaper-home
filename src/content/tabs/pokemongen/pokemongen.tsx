import * as React from "react";
import * as gen from "flc-pokemon-gen";

import './pokemongen.scss';

enum PokemonType {
    NORMAL = "Normal",
    FIRE = "Fire",
    WATER = "Water",
    GRASS = "Grass",
    ELECTIC = "Electric",
    FLYING = "Flying",
    FIGHTING = "Fighting",
    POISON = "Poison",
    GROUND = "Ground",
    PSYCHIC = "Psychic",
    BUG = "Bug",
    ICE = "Ice",
    ROCK = "Rock",
    DRAGON = "Dragon",
    GHOST = "Ghost",
    DARK = "Dark",
    STEEL = "Steel",
    FAIRY = "Fairy",
    LIGHT = "Light",
}

enum MoveStatus {
  NONE,
  BUFF,
  CONTROL,
  DOT,
  CLEAN,
  ALLY,
  ENEMY,
}

interface PokemonMove {
  name: string,
  type: string,
  power?: number,
  status?: number,
  mp?: number,
}
interface GenState {
  type1?: string,
  type2?: string,
  mp: number,
  moves: Array<PokemonMove>,
}

interface AddMoveProps {
  mp: number,
  addMove: Function,
  resetCurrentMove: Function,
  move: PokemonMove,
}

class AddMove extends React.Component<AddMoveProps, {}> {
  handleClick(): void {
    this.props.resetCurrentMove();
    this.props.addMove(Object.assign({}, this.props.move));
  }

  render() {
    const isEnabled = (this.props.mp - this.props.move.mp) <= 0; 
    return (
      <button className='add-move-button' disabled={isEnabled} onClick={this.handleClick.bind(this)}>
        <i className="fa fa-plus"></i>
      </button>
    );
  }
}

interface UpdateMovesProps {
  addMove: Function,
  mp: number,
  type1: string,
  type2: string,
  moves: Array<PokemonMove>,
}

class UpdateMoves extends React.Component<UpdateMovesProps, PokemonMove> {
  
  constructor(props: UpdateMovesProps) {
    super(props);
    this.prepareMove.bind(this);
    this.resetCurrentMove.bind(this);
    this.state = {
      name: '',
      type: PokemonType.NORMAL,
      power: 0,
      status: MoveStatus.NONE,
      mp: 0,
    };
  }

  prepareMove(event): void {
    const field = event.target.name;
    let val = event.target.value;
    
    if (field === 'power' || field === 'status') val = parseInt(val);
    
    if (this.props.type1) {
      this.setState((prevState: PokemonMove) => {
        const newMove = Object.assign({}, prevState, { [`${field}`]: val });
        delete newMove.mp;
        newMove.mp = gen.getMoveMP(newMove, {
          type1: this.props.type1,
          type2: this.props.type2,
          moves: this.props.moves,
        });
        return newMove;
      });
    }
  }

  resetCurrentMove() {
    this.setState({
      name: '',
      type: PokemonType.NORMAL,
      power: 0,
      status: MoveStatus.NONE,
      mp: 0,
    });
  }
  
  render() {
    const typeOptions = Object.values(PokemonType).map((type) => {
      const isSelected = this.state.type === type;
      return <option selected={isSelected}>{type}</option>;
    });

    const moveTypeOptions = Object.keys(MoveStatus).map((move) => {
      if (typeof MoveStatus[move as any] === 'number') {
        const isSelected = this.state.status === MoveStatus[move];
        return <option value={MoveStatus[move]} selected={isSelected}>{move}</option>;
      }
    });

    return (<section className='pokemon-moves'>
      <div className="move-updater">
        <div className='part-form'>
          <input name="name" type="text" placeholder="Move Name" value={this.state.name}
            onChange={e => this.prepareMove(e)} onBlur={e => this.prepareMove(e)}></input>
        </div>
        <div className='part-form'>
          <select name="type"
            onChange={e => this.prepareMove(e)} onBlur={e => this.prepareMove(e)}>{typeOptions}</select>
        </div>
        <div className='part-form'>
          <input name="power" type="number" placeholder="Move Power" value={this.state.power}
            onChange={e => this.prepareMove(e)} onBlur={e => this.prepareMove(e)}></input>
        </div>
        <div className='part-form'>
          <select name="status"
            onChange={e => this.prepareMove(e)} onBlur={e => this.prepareMove(e)}>{moveTypeOptions}</select>
        </div>
        <p>Move MP: {this.state.mp}</p>
      </div>
      <AddMove mp={this.props.mp} 
        addMove={this.props.addMove}
        move={this.state}
        resetCurrentMove={this.resetCurrentMove.bind(this)} />
    </section>);
  }
}

export class MoveDisplay extends React.Component<PokemonMove, {}> {
  render() {
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

export class PokemonGen extends React.Component<{}, GenState> {
  constructor(props: object) {
    super(props);
    this.state = {
      type1: null,
      type2: null,
      mp: 0,
      moves: [],
    };
  }

  handleTypeSelect(event): void {
    let newState = {};
    let newMP = 0;
    
    const typeText = event.target.innerText;
    const isPrimary = typeText === this.state.type1;
    const isSecondary = typeText === this.state.type2;

    if (isPrimary) {
      if (!this.state.type2) { return; }

      newMP = gen.getMPForType(this.state.type2, null);

      newState = {
        type1: this.state.type2,
        type2: null,
        mp: newMP,
      };
    } else if (isSecondary) {
      newMP = gen.getMPForType(this.state.type1, null);
      
      newState = {
        type2: null,
        mp: newMP,
      };
    } else if (!this.state.type1) {
      newMP = gen.getMPForType(typeText, null);
      
      newState = {
        type1: typeText,
        type2: typeText,
        mp: newMP,
      };
    } else {
      newMP = gen.getMPForType(this.state.type1, typeText);
      
      newState = {
        type2: typeText,
        mp: newMP,
      };
    }

    newState['moves'] = [];

    this.setState(newState);
  }

  addMove(move: PokemonMove) {
    this.setState((prevState) => {
      return {
        mp: (prevState.mp - move.mp),
        moves: prevState.moves.concat([move]),
      };
    });
  }

  render() {
    const typeIcons = Object.values(PokemonType).map((type) => {
      let typeClass = `pokemon-type ${type}-class`;
      if (this.state.type1 === type) {
        typeClass = `${typeClass} selected-primary`;
      } else if (this.state.type2 && this.state.type2 === type) {
        typeClass = `${typeClass} selected-secondary`;
      }
      return <div className={typeClass} onClick={this.handleTypeSelect.bind(this)}>{type}</div>;
    });

    let moves = this.state.moves.map((move) => {
      return <MoveDisplay
        name={move.name}
        type={move.type}
        power={move.power}
        status={move.status}
        mp={move.mp}
      />;
    });

    if (moves.length === 0) moves = [<p>No Moves Added.</p>];

    return (
      <article id="pokemon-gen-tab">
        <section id="pokemon-gen-about">
          <h2>FLC Pokemon Generator</h2>
          <p>
            FLC, the homebrew Pokemon Tabletop RPG I play with my friends, has a complicated character creation process. The math required to ensure that the tabletop statistics can be integrated with the moves and types from the video games (plus a few of our own custom additions). In the end, it boils down to this: Pokemon have a number of Move Points based on their types. They can then spend these Move Points in various ways on a set of moves, either damage-dealing or status-applying, as well as in or out of their types. We can use my <a target="_blank" href="https://www.npmjs.com/package/flc-pokemon-gen">flc-pokemon-gen</a> NPM package to perform these calculations and create a system-correct Pokemon every time!
          </p>
        </section>
        <section id="pokemon-gen-container">
					<section className="pokemon-gen-setup">		
						<section className="pokemon-type-select">{typeIcons}</section>
						<section className="pokemon-mp">MP: { this.state.mp }</section>
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
          <section className="pokemon-move-list">{moves}</section>
				</section>
      </article>
    );
  }
}
