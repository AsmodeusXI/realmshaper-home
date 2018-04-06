import * as React from "react";

import { CombatParticipantState } from './flc-combat';

interface NewParticipantProps {
  id: number,
  update: Function
}

export interface NewParticipantState {
  id: number,
  name: string,
  level: number
}

export class NewParticipant extends React.Component<NewParticipantProps, NewParticipantState> {
  newInput: HTMLInputElement;

  constructor(props: NewParticipantProps) {
    super(props);
    this.state = {
      id: this.props.id,
      name: "",
      level: 1
    }
    this.changeName = this.changeName.bind(this);
    this.changeLevel = this.changeLevel.bind(this);
  }

  componentDidMount() {
    this.newInput.focus();
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
      <section className="new-participant shadow-2">
        <div className="participant-field">
          <div className='participant-label'>Name:</div>
          <input
            ref={(input) => this.newInput = input}
            type="text"
            name="new-name"
            className='participant-input'
            value={this.state.name}
            onChange={this.changeName}
            onBlur={this.changeName} />
        </div>
        <div className="participant-field">
          <div className='participant-label'>Level:</div>
          <input
            type="number"
            name="new-level"
            className='participant-input'
            value={this.state.level}
            onChange={this.changeLevel}
            onBlur={this.changeLevel} />
        </div>
      </section>
    )
  }
}

interface CombatSetupProps {
  startCombat: Function,
  updateNewParticipant: Function
}

interface CombatSetupState {
  newParticipantIds: Array<number>
}

export class CombatSetup extends React.Component<CombatSetupProps, CombatSetupState> {
  constructor(props: CombatSetupProps) {
    super(props);
    this.getNewParticipantId.bind(this);
    this.state = {
      newParticipantIds: [this.getNewParticipantId()]
    }
  }

  getNewParticipantId(): number {
    return Date.now();
  }

  addNewParticipantId(): void {
    this.setState((prevState, props) => {
      return {
        newParticipantIds: [...prevState.newParticipantIds, this.getNewParticipantId()]
      }
    });
  }

  render() {
    const onClick = () => { this.props.startCombat(); };
    const newParticipants = this.state.newParticipantIds.map((pId) => {
      return <NewParticipant id={pId} update={this.props.updateNewParticipant} />;
    });
    return (
      <section id="flc-combat-setup">
        <div id="participant-container">
          {newParticipants}
        </div>
        <button id="add-combat-participant" onClick={this.addNewParticipantId.bind(this)}>+</button>
        <button onClick={onClick}>Start Combat</button>
      </section>
    );
  }
}
