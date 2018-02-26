import * as React from "react";
import * as _ from "lodash";

import './flc-combat.scss';

interface CombatTurnProps {
  participants: {}
}

class CombatTurn extends React.Component<CombatTurnProps, {}> {
  constructor(props: CombatTurnProps) {
    super(props);
  }

  render() {
    const participants: Array<JSX.Element> = [];
    _.forEach(this.props.participants, (participant) => {
      participants.push(<div className="turn-participant">{participant.name} | {participant.hp} | {participant.fp}</div>);
    })
    return (
      <li>{participants}</li>
    );
  }
}

interface NewParticipantProps {
  participantId: number,
  update: Function
}

interface NewParticipantState {
  id: number,
  name: string,
  level: number
}

class NewParticipant extends React.Component<NewParticipantProps, NewParticipantState> {
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
      <div className="new-participant">
        Name: <input type="text" name="new-name" value={this.state.name} onChange={this.changeName} onBlur={this.changeName} />
        Level: <input type="number" name="new-level" value={this.state.level} onChange={this.changeLevel} onBlur={this.changeLevel} />
      </div>
    )
  }
}

interface SetupCombatProps {
  startCombat?: Function
}

interface SetupCombatState {
  participants: {
    [key: string]: any
  }
}

class SetupCombat extends React.Component<SetupCombatProps, SetupCombatState> {
  constructor(props: SetupCombatProps) {
    super(props);
    this.state = {
      participants: {}
    }
  }

  updateParticipant(newParticipantState: NewParticipantState) {
    const participantData = {
      id: newParticipantState.id,
      name: newParticipantState.name,
      hp: (newParticipantState.level * 52),
      fp: 50
    };
    this.setState((prevState, props) => {
      const updatedParticipants = prevState.participants;
      updatedParticipants[participantData.id] = participantData;
      return { participants: updatedParticipants }
    });
  }

  render() {
    const onClick = this.props.startCombat.bind(this, this.state.participants);
    return (
      <section id="combat-setup">
        Combat Setup
        <NewParticipant
          participantId={Date.now()}
          update={this.updateParticipant.bind(this)}/>
        <button onClick={onClick}>Start Combat</button>
      </section>
    );
  }
}

interface FLCCombatState {
  startComponent?: JSX.Element,
  turnComponents?: Array<JSX.Element>,
  addTurnButton?: JSX.Element,
  participants?: {
    [key: string]: any
  }
}

export class FLCCombat extends React.Component<{}, FLCCombatState> {
  state: FLCCombatState;

  addCombatTurn() {
    this.setState((prevState: FLCCombatState, props) => {
      return {
        turnComponents: prevState.turnComponents.concat(
          <CombatTurn participants={prevState.participants}/>
        )
      }
    });
  }

  startCombat(participants: { [key: string]: any }) {
    this.setState({
      startComponent: null,
      addTurnButton: <button
        id='add-turn-button'
        onClick={this.addCombatTurn.bind(this)}>
          Add Turn
        </button>,
      participants: participants
    });
    this.addCombatTurn();
  }

  initializeCombat() {
    this.setState({
      startComponent: <SetupCombat startCombat={this.startCombat.bind(this)}/>
    });
  }

  getDefaultState(): FLCCombatState {
    return {
      startComponent: <button onClick={this.initializeCombat.bind(this)}>
        Create New Combat
      </button>,
      turnComponents: [],
      addTurnButton: null,
      participants: {}
    };
  }

  constructor(props: any) {
    super(props);
    this.state = this.getDefaultState();
  }

  resetCombat() {
    this.setState(this.getDefaultState());
  }

  render() {
    return (
      <article id="flc-combat-tab">
        <section id="flc-combat-about" className="about-section">
          <h2>FLC Combat Tracker</h2>
          <p>
            "FLC" is the name of a custom Pokemon tabletop role-playing game
            created by my friends and I. Tactical combat is one element of the
            system. Tracking the data during FLC combat requires some
            bookkeeping, and I'd like to automate of that bookkeeping with
            this tool.
          </p>
        </section>
        <section id="flc-combat-container">
          {this.state.startComponent}
          <ol>
            {this.state.turnComponents}
          </ol>
          {this.state.addTurnButton}
          <button onClick={() => this.resetCombat()}>
            Reset Combat
          </button>
        </section>
      </article>
    );
  }
}