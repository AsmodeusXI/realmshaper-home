import * as React from "react";
import { NewParticipant } from './flc-combat-new-participant';

interface CombatSetupProps {
  startCombat: Function;
  updateNewParticipant: Function;
}

interface CombatSetupState {
  newParticipantIds: Array<number>;
}

export class CombatSetup extends React.Component<CombatSetupProps, CombatSetupState> {
  constructor(props: CombatSetupProps) {
    super(props);
    this.state = {
      newParticipantIds: [Date.now()]
    };

		this.addNewParticipantId = this.addNewParticipantId.bind(this);
		this.startCombat = this.startCombat.bind(this);
  }

  addNewParticipantId(event: React.MouseEvent<HTMLButtonElement>): void {
    this.setState((prevState, props) => {
      return {
        newParticipantIds: [...prevState.newParticipantIds, Date.now()]
      }
    });
  }

	startCombat(event: React.MouseEvent<HTMLButtonElement>): void {
		this.props.startCombat();
	}	

  render(): JSX.Element {
    return (
      <section id="flc-combat-setup">
        <div id="participant-container">
          {
						this.state.newParticipantIds.map((pId: number): JSX.Element => {
							return (<NewParticipant id={pId} update={this.props.updateNewParticipant} />);
						})
					}
        </div>
        <button id="add-combat-participant" onClick={this.addNewParticipantId}>+</button>
        <button id="combat-start-button" onClick={this.startCombat}>Start Combat</button>
      </section>
    );
  }
}
