import * as React from "react";
import * as _ from "lodash";
import { MainSection } from '../../../components/mainsection';
import { CombatTurn } from './flc-combat-turn';
import { CombatSetup } from './flc-combat-setup';
import { NewParticipant, NewParticipantState } from './flc-combat-new-participant';
import { CombatCondition, CombatParticipantState } from './flc-combat-interfaces';
import './flc-combat.scss';

interface FLCCombatState {
  isCreatePhase: boolean;
  isSetupPhase: boolean;
  turns: Array<{
    participants: {
      [key: string]: CombatParticipantState
    }
  }>;
  isCombatPhase: boolean;
  turnIdx: number;
}

export class FLCCombat extends MainSection<FLCCombatState> {
	constructor(props) {
    super(props);
    this.getDefaultState = this.getDefaultState.bind(this);
    this.state = this.getDefaultState();

		this.startCombat = this.startCombat.bind(this);
		this.setupCombat = this.setupCombat.bind(this);
		this.resetCombat = this.resetCombat.bind(this);
		this.addTurn = this.addTurn.bind(this);
		this.addParticipantDelta = this.addParticipantDelta.bind(this);
		this.updateNewParticipant = this.updateNewParticipant.bind(this);
  }
	
	private getDefaultState(): FLCCombatState {
    return {
      isCreatePhase: true,
      isSetupPhase: false,
      isCombatPhase: false,
      turns: [
				{
					participants: {}
				}
			],
      turnIdx: 0
    };
  }

	startCombat(): void {
    this.setState({ isSetupPhase: false, isCombatPhase: true });
  }

	setupCombat(): void {
    this.setState({ isCreatePhase: false, isSetupPhase: true });
  } 

  resetCombat(): void {
    this.setState(this.getDefaultState());
  }

  addParticipantDelta(
    id: string,
    hpChange: number,
    fpChange: number,
    conditionChange: CombatCondition): void {
			this.setState(
				(prevState, props) => {
				  const updatedTurns = prevState.turns;
    		  const updateParticipant = updatedTurns[prevState.turnIdx].participants[id];
    		  if (!isNaN(hpChange)) updateParticipant.delta.hp.push(hpChange);
    		  if (!isNaN(fpChange)) updateParticipant.delta.fp.push(fpChange);
    		  if (!_.isEmpty(conditionChange.name)) {
    		    updateParticipant.delta.conditions.push(conditionChange);
    		  }
    		  return {
    		    turns: updatedTurns
    		  }
    		}
			);
	}

  updateNewParticipant(newParticipantState: NewParticipantState): void {
    if (_.trim(newParticipantState.name) === '') return;

    const participantData: CombatParticipantState = {
      id: newParticipantState.id,
      name: newParticipantState.name,
      hp: (newParticipantState.level * 52),
      fp: 50,
      conditions: [],
      delta: {
        hp: [],
        fp: [],
        conditions: []
      }
    };

    this.setState((prevState, props) => {
      const updateTurns = prevState.turns;
      updateTurns[0].participants[newParticipantState.id] = participantData;
      return { turns: updateTurns };
    });
  }

  performTurnUpdate(participant: CombatParticipantState): CombatParticipantState {
    return {
      id: participant.id,
      name: participant.name,
      hp: participant.delta.hp.reduce((acc, curr) => { return acc + curr; }, participant.hp),
      fp: participant.delta.fp.reduce((acc, curr) => { return acc + curr; }, participant.fp),
      conditions: participant.conditions.concat(participant.delta.conditions)
				.filter(cond => cond.duration - 1 > 0)
				.map((cond): CombatCondition => {
					return {
						name: cond.name,
						duration: cond.duration-1,
					};
				}),
      delta: {
        hp: [],
        fp: [],
        conditions: []
      }
    };
  }
 
  addTurn(): void {
    this.setState((prevState, props) => {
      const updatedParticipants: { [key: string]: CombatParticipantState } = {};
      Object.values(prevState.turns[prevState.turnIdx].participants).map((participant) => {
        updatedParticipants[participant.id] = this.performTurnUpdate(participant);
      });

      return {
        turns: prevState.turns.concat([ { participants: updatedParticipants } ]),
        turnIdx: prevState.turnIdx + 1
      };
    });
  }

  render(): JSX.Element {
    return (
      <article id="flc-combat-tab">
        <section id="flc-combat-about">
          <h2>FLC Combat Tracker</h2>
          <p>"FLC" is the name of a custom Pokemon tabletop role-playing game created by my friends and I. Tactical combat is one element of the system. Tracking the data during FLC combat requires some bookkeeping, and I'd like to automate of that bookkeeping with this tool.</p>
        </section>
        <section id="flc-combat-container">
          {
						this.state.isCreatePhase
							? (<button id="combat-start-button" onClick={this.setupCombat}>Create New Combat</button>) 
							: (<button id="combat-reset-button" onClick={this.resetCombat}>Reset Combat</button>)
					}
          {
						this.state.isSetupPhase 
							? (<CombatSetup
									startCombat={this.startCombat}
									updateNewParticipant={this.updateNewParticipant} />) 
							: (null)
					}
          {
						this.state.isCombatPhase
							? (<section id="flc-combat-turns">
								{
									this.state.turns.map((turn: any, idx: number): JSX.Element => {
										return (
											<CombatTurn
      						  	  turnNo={idx}
      						  	  isTurnActive={this.state.turnIdx === idx}
      						  	  participants={turn.participants}
      						  	  addParticipantDelta={this.addParticipantDelta}
      						  	/>
										)
									})
								}
								</section>) 
							: (null)}
          {
						this.state.isCombatPhase 
							? (<button id='add-turn-button' onClick={this.addTurn}>Add Turn</button>) 
							: (null)
					}
        </section>
      </article>
    );
  }
}
