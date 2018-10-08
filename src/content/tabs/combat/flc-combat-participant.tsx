import * as React from 'react';
import { CombatCondition, CombatParticipantState } from './flc-combat-interfaces';
import { ResInput } from '../../../components/resinput';

interface CombatParticipantProps extends CombatParticipantState {
  isActive: boolean;
  addDelta: Function;
}

interface CombatParticipantChangeState {
  hpChange?: string;
  fpChange?: string;
  conditionNameChange?: string;
  conditionDurationChange?: string;
  hpDelta?: Array<number>;
  fpDelta?: Array<number>;
  conditionDelta?: Array<CombatCondition>;
}

export class CombatParticipant extends React.Component<CombatParticipantProps, CombatParticipantChangeState> {
  constructor(props: CombatParticipantProps) {
    super(props);
    this.state = {
      hpChange: '',
      fpChange: '',
      conditionNameChange: '',
      conditionDurationChange: '',
      hpDelta: [],
      fpDelta: [],
      conditionDelta: []
    };
    this.changeField = this.changeField.bind(this);
    this.updateDelta = this.updateDelta.bind(this);
  }

  changeField(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ [`${event.target.getAttribute('name')}`]: event.target.value });
  }

  updateDelta(): void {
    const updateHP = parseInt(this.state.hpChange);
    const updateFP = parseInt(this.state.fpChange);
    const updateCondition: CombatCondition = {
      name: this.state.conditionNameChange,
      duration: parseInt(this.state.conditionDurationChange)
    };
    this.props.addDelta(this.props.id, updateHP, updateFP, updateCondition);
    this.setState((prevState, props) => {
      return {
        hpChange: '',
        fpChange: '',
        conditionNameChange: '',
        conditionDurationChange: '',
        hpDelta: isNaN(updateHP) ? prevState.hpDelta : [...prevState.hpDelta, updateHP],
        fpDelta: isNaN(updateFP) ? prevState.fpDelta : [...prevState.fpDelta, updateFP],
        conditionDelta: (!updateCondition.name) ? prevState.conditionDelta : [...prevState.conditionDelta, updateCondition]
      };
    });
  }

  render(): JSX.Element { 
    return (
      <div className="turn-participant">
        <div className="participant participant-name">{this.props.name}</div>
        <div className="participant participant-hp">
          <div className="part-form">
            <div>
              <b>{this.props.hp}</b>{
								this.state.hpDelta.map((hpChg) => {
									return (<span>{hpChg > 0 ? ` + ${hpChg}` : ` - ${Math.abs(hpChg)}`}</span>);
								})
							}
            </div>
            {
							this.props.isActive 
								? (<div>
									<ResInput
    						    name='hpChange'
    						    value={this.state.hpChange}
    						    update={this.changeField} />
								</div>) 
								: (null) 
						}
          </div>
        </div>
        <div className="participant participant-fp">
          <div className="part-form">
            <div>
              <b>{this.props.fp}</b>{
								this.state.fpDelta.map((fpChg) => {
    						  return (<span>{fpChg > 0 ? ` + ${fpChg}` : ` - ${Math.abs(fpChg)}`}</span>);
    						})
							}
            </div>
            { 
							this.props.isActive 
								? (<div>
									<ResInput
										name="fpChange"
              	  	value={this.state.fpChange}
              	  	update={this.changeField} />
								</div>) 
								: (null) 
						}
          </div>
        </div>
        <div className="participant participant-condition">
          <div className="part-form">
            <div className="condition-container">
              {
								(this.props.conditions.length + this.state.conditionDelta.length > 0) 
									? this.props.conditions.concat(this.state.conditionDelta).map(
											(cond: CombatCondition): JSX.Element => {
												return (<div className="condition">{cond.name}&nbsp;{cond.duration}</div>);
											})
									: (<span><b>No Conditions</b></span>)
							}
            </div>
            <div className="condition-applicator">
              { 
								this.props.isActive 
									? (<div className='name-wrapper'>
										<ResInput
											name="conditionNameChange"
                	  	value={this.state.conditionNameChange}
                	  	update={this.changeField} />
									</div>) 
									: (null) 
							}
              { 
								this.props.isActive 
									? (<div className="duration-wrapper paren-wrap">
										<ResInput
											name="conditionDurationChange"
                	 		value={this.state.conditionDurationChange}
                	 		update={this.changeField} />
									</div>) 
									: (null) 
							}
            </div>
          </div>
        </div>
        <div className="participant participant-update">
          { 
						this.props.isActive 
							? (<button onClick={this.updateDelta}>Update</button>) 
							: (null) 
					}
        </div>
      </div>
    );
  }
}
