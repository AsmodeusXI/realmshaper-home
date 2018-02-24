import * as React from "react";

import './flc-combat.scss';

class CombatTurn extends React.Component<{}, {}> {
  render() {
    return (<li>
      <div>
        Card
      </div>
    </li>);
  }
}

interface SetupCombatProps {
  startCombat?: Function
}

class SetupCombat extends React.Component<SetupCombatProps, {}> {
  constructor(props: SetupCombatProps) {
    super(props);
  }

  render() {
    return (
      <section id="combat-setup">
        Combat Setup
        <button onClick={(e) => this.props.startCombat()}>Start Combat</button>
      </section>
    );
  }
}

interface FLCCombatState {
  startComponent?: JSX.Element,
  turnComponents?: Array<JSX.Element>,
  addTurnButton?: JSX.Element,
  participants?: Array<any>
}

export class FLCCombat extends React.Component<{}, FLCCombatState> {
  state: FLCCombatState;

  addCombatTurn() {
    this.setState((prevState: FLCCombatState, props) => ({
      turnComponents: prevState.turnComponents.concat(<CombatTurn />)
    }));
  }

  startCombat(participants: Array<any>) {
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
      participants: []
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
