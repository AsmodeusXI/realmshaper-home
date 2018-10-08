import * as React from 'react';
import * as gen from 'flc-pokemon-gen';
import { AddMove } from './addmove';
import { ResInput } from '../../../../components/resinput';
import { ResSelect } from '../../../../components/resselect';
import { PokemonMove, PokemonType, MoveStatus } from './pokeconstants';

interface UpdateMovesProps {
  addMove: Function;
  mp: number;
  type1: string;
  type2: string;
  moves: Array<PokemonMove>;
}

export class UpdateMoves extends React.Component<UpdateMovesProps, PokemonMove> {
  constructor(props: UpdateMovesProps) {
    super(props);
    this.state = {
      name: '',
      type: PokemonType.NORMAL,
      power: 0,
      status: MoveStatus.NONE,
      mp: 0,
    };
    this.prepareMove = this.prepareMove.bind(this);
    this.resetCurrentMove = this.resetCurrentMove.bind(this);
  }

  prepareMove(event: any): void {
    const field = event.target.name;
    let val = event.target.value;
    if (field === 'power' || field === 'status') val = parseInt(val);
    
    if (this.props.type1) {
      this.setState((prevState: PokemonMove): PokemonMove => {
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

  resetCurrentMove(): void {
    this.setState({
      name: '',
      type: PokemonType.NORMAL,
      power: 0,
      status: MoveStatus.NONE,
      mp: 0,
    });
  }
  
  render(): JSX.Element {
    return (
			<section className='pokemon-moves'>
    	  <div className="move-updater">
    	    <div className='part-form'>
						<ResInput name='name'
							placeholder='Move Name'
							value={this.state.name}
							update={this.prepareMove} />
    	    </div>
    	    <div className='part-form'>
						<ResSelect name='type'
							update={this.prepareMove}
							options={Object.values(PokemonType).map((type: string): JSX.Element => {
								return (
									<option selected={this.state.type === type}>{type}</option>
								);
							})} />
    	    </div>
    	    <div className='part-form'>
						<ResInput name='power'
							type='number'
							placeholder='Move Power'
							value={this.state.power}
							update={this.prepareMove} />
    	    </div>
    	    <div className='part-form'>
						<ResSelect name='status'
							update={this.prepareMove}
							options={Object.keys(MoveStatus).map((move): JSX.Element => {
								if (typeof MoveStatus[move as any] === 'number') {
      					  return (
										<option 
											value={MoveStatus[move]}
											selected={this.state.status === MoveStatus[move]}>
											{move}
										</option>
									);
      					}
							})} />
    	    </div>
    	    <p>Move MP: {this.state.mp}</p>
    	  </div>
    	  <AddMove mp={this.props.mp} 
    	    addMove={this.props.addMove}
    	    move={this.state}
    	    resetCurrentMove={this.resetCurrentMove} />
    	</section>
		);
  }
}
