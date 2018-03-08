import * as React from "react";
import * as _ from "lodash";

import { CombatParticipantState } from './flc-combat';

interface NewParticipantProps {
  participantId: number,
  update: Function
}

interface NewParticipantState {
  id: number,
  name: string,
  level: number
}

export class NewParticipant extends React.Component<NewParticipantProps, NewParticipantState> {
  constructor(props: NewParticipantProps) {
    super(props);
    this.state = {
      id: this.props.participantId,
      name: "",
      level: 1
    }
    this.changeName = this.changeName.bind(this);
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeName(event: any) {
    this.setState({ name: event.target.value });
    this.props.update(this.state);
  }

  changeLevel(event: any) {
    let newLevel = parseInt(event.target.value);
    if (newLevel < 1) newLevel = 1;
    if (newLevel > 20) newLevel = 20;
    this.setState({ level: newLevel });
    this.props.update(this.state);
  }

  render() {
    return (
      <section className="new-participant">
        <div className="participant-field">
          <div className='col-4 participant-label'>Name:</div>
          <input
            type="text"
            name="new-name"
            className='col-6'
            value={this.state.name}
            onChange={this.changeName}
            onBlur={this.changeName} />
        </div>
        <div className="participant-field">
          <div className='col-4 participant-label'>Level:</div>
          <input
            type="number"
            name="new-level"
            className='col-6'
            value={this.state.level}
            onChange={this.changeLevel}
            onBlur={this.changeLevel} />
        </div>
      </section>
    )
  }
}

interface CombatSetupProps {
  startCombat?: Function
}

interface CombatSetupState {
  participants: {
    [key: string]: CombatParticipantState
  },
  participantSetupElements: Array<JSX.Element>
}

export class CombatSetup extends React.Component<CombatSetupProps, CombatSetupState> {
  constructor(props: CombatSetupProps) {
    super(props);
    this.getParticipantElement.bind(this);
    this.state = {
      participants: {},
      participantSetupElements: [this.getParticipantElement()]
    }
  }

  getParticipantElement(): JSX.Element {
    return <NewParticipant participantId={Date.now()} update={this.updateParticipant.bind(this)}/>;
  }

  addParticipant(): void {
    this.setState((prevState, props) => {
      return {
        participantSetupElements: [...prevState.participantSetupElements, this.getParticipantElement()]
      }
    });
  }

  updateParticipant(newParticipantState: NewParticipantState): void {
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

    if (_.trim(participantData.name) === '') return;

    this.setState((prevState, props) => {
      const updatedParticipants = prevState.participants;
      updatedParticipants[participantData.id] = participantData;
      return { participants: updatedParticipants }
    });
  }

  render() {
    const onClick = this.props.startCombat.bind(this, this.state.participants);
    return (
      <section id="flc-combat-setup">
        <div id="participant-container">
          {this.state.participantSetupElements}
          <button id="add-combat-participant" onClick={this.addParticipant.bind(this)}>+</button>
        </div>
        <button onClick={onClick}>Start Combat</button>
      </section>
    );
  }
}
