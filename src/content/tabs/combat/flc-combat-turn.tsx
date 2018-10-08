import * as React from "react";
import * as _ from "lodash";
import { CombatParticipant } from './flc-combat-participant';
import { CombatParticipantState } from './flc-combat-interfaces';

interface CombatTurnProps {
  participants: {};
  addParticipantDelta: Function;
  isTurnActive: boolean;
  turnNo: number;
}

export class CombatTurn extends React.Component<CombatTurnProps, {}> {
  render(): JSX.Element {
    return (
      <div className='turn-wrapper'>
        <div className='turn-counter'>{this.props.turnNo + 1}</div>
        <div className='turn-actor'>{
					Object.values(this.props.participants).map((participant: CombatParticipantState): JSX.Element => {
						return (
							<CombatParticipant
								id={participant.id}
          			name={participant.name}
          			hp={participant.hp}
          			fp={participant.fp}
          			conditions={participant.conditions}
          			addDelta={this.props.addParticipantDelta}
          			isActive={this.props.isTurnActive} />
						);
					})
				}</div>
      </div>
    );
  }
}
