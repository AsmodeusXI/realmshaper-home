import * as React from "react";
import * as _ from "lodash";

import { NewParticipant, CombatSetup } from './flc-combat-setup';

import './flc-combat.scss';

interface CombatCondition {
  name: string,
  duration: number
}

export interface CombatParticipantState {
  id: number,
  name: string,
  hp: number,
  fp: number,
  conditions: Array<CombatCondition>,
  delta?: {
    hp: Array<number>,
    fp: Array<number>,
    conditions: Array<CombatCondition>
  }
}

interface CombatParticipantProps extends CombatParticipantState {
  addDelta: Function
}

interface CombatParticipantChangeState {
  hpChange: string,
  fpChange: string,
  conditionNameChange: string,
  conditionDurationChange: string,
  hpDelta: Array<number>,
  fpDelta: Array<number>,
  conditionDelta: Array<CombatCondition>
}

class ConditionDisplay extends React.Component<CombatCondition, {}> {
  constructor(props: CombatCondition) {
    super(props);
  }

  render() {
    return (
      <div className="condition">
        {this.props.name}&nbsp;{this.props.duration}
      </div>
    )
  }
}

class CombatParticipant extends React.Component<CombatParticipantProps, CombatParticipantChangeState> {
  constructor(props: CombatParticipantProps) {
    super(props);
    this.state = {
      hpChange: "",
      fpChange: "",
      conditionNameChange: "",
      conditionDurationChange: "",
      hpDelta: [],
      fpDelta: [],
      conditionDelta: []
    };
    this.changeField = this.changeField.bind(this);
    this.updateDelta = this.updateDelta.bind(this);
  }

  changeField(event: any) {
    const changeValue = event.target.value;
    const changeName = event.target.getAttribute('name');
    this.setState({ [changeName]: changeValue });
  }

  updateDelta(): void {
    const updateHP = parseInt(this.state.hpChange);
    const updateFP = parseInt(this.state.fpChange);
    const updateCondition = {
      name: this.state.conditionNameChange,
      duration: parseInt(this.state.conditionDurationChange)
    };
    this.props.addDelta(this.props.id, updateHP, updateFP, updateCondition);
    this.setState((prevState, props) => {
      const newHpDelta = isNaN(updateHP) ? prevState.hpDelta : [...prevState.hpDelta, updateHP];
      const newFpDelta = isNaN(updateFP) ? prevState.fpDelta : [...prevState.fpDelta, updateFP];
      const newConditionDelta = (_.isEmpty(updateCondition.name)) ?
        prevState.conditionDelta :
        [...prevState.conditionDelta, updateCondition];
      return {
        hpChange: "",
        fpChange: "",
        conditionNameChange: "",
        conditionDurationChange: "",
        hpDelta: newHpDelta,
        fpDelta: newFpDelta,
        conditionDelta: newConditionDelta
      }
    });
  }

  render() {
    let conditionElements: Array<JSX.Element> = [];
    if (this.props.conditions.length > 0) {
      conditionElements = this.props.conditions.map((cond) => {
        return <ConditionDisplay name={cond.name} duration={cond.duration} />;
      });
    }
    const hpDeltas = this.state.hpDelta.map((hpChg) => {
      let hpDisplay;
      if (hpChg > 0) {
        hpDisplay = ` + ${hpChg}`;
      } else {
        hpDisplay = ` - ${Math.abs(hpChg)}`
      }
      return <span>{hpDisplay}</span>;
    });
    const fpDeltas = this.state.fpDelta.map((fpChg) => {
      let fpDisplay;
      if (fpChg > 0) {
        fpDisplay = ` + ${fpChg}`;
      } else {
        fpDisplay = ` - ${Math.abs(fpChg)}`;
      }
      return <span>{fpDisplay}</span>;
    });
    const conditionDeltas = this.state.conditionDelta.map((condChg) => {
      return <ConditionDisplay name={condChg.name} duration={condChg.duration} />;
    });
    conditionElements = conditionElements.concat(conditionDeltas);
    return (
      <div className="turn-participant">
        <div className="col-1 participant-name">{this.props.name}</div>
        <div className="col-2 participant-hp">
          <div className="part-form">
            <div>
              {this.props.hp}{hpDeltas}
            </div>
            <div>
              <input type="text"
                name="hpChange"
                value={this.state.hpChange}
                onChange={this.changeField}
                onBlur={this.changeField}
                />
            </div>
          </div>
        </div>
        <div className="col-2 participant-fp">
          <div className="part-form">
            <div>
              {this.props.fp}{fpDeltas}
            </div>
            <div>
              <input type="text"
                name="fpChange"
                value={this.state.fpChange}
                onChange={this.changeField}
                onBlur={this.changeField}
                />
            </div>
          </div>
        </div>
        <div className="col-4 participant-condition">
          <div className="part-form">
            <div className="condition-container">
              {conditionElements}
            </div>
            <div>
              <input type="text"
                name="conditionNameChange"
                value={this.state.conditionNameChange}
                onChange={this.changeField}
                onBlur={this.changeField}
                />
              (<input type="text"
                name="conditionDurationChange"
                value={this.state.conditionDurationChange}
                onChange={this.changeField}
                onBlur={this.changeField}
                />)
            </div>
          </div>
        </div>
        <div className="col-1 participant-update">
          <button onClick={this.updateDelta}>Update</button>
        </div>
      </div>
    )
  }
}

interface CombatTurnProps {
  participants: {},
  addParticipantDelta: Function,
  turnId: number,
  activeTurnId: number
}

class CombatTurn extends React.Component<CombatTurnProps, {}> {
  constructor(props: CombatTurnProps) {
    super(props);
  }

  render() {
    const isActive = (this.props.turnId === this.props.activeTurnId) ? 'Active' : 'Inactive';
    const participants: Array<JSX.Element> = [];
    _.forEach(this.props.participants, (participant) => {
      participants.push(
        <CombatParticipant
          id={participant.id}
          name={participant.name}
          hp={participant.hp}
          fp={participant.fp}
          conditions={participant.conditions}
          addDelta={this.props.addParticipantDelta} />
      );
    });
    return (
      <li><span>{isActive}</span>{participants}</li>
    );
  }
}

interface CombatAreaProps {
  turnComponents: Array<JSX.Element>
}

class CombatArea extends React.Component<CombatAreaProps, {}> {
  constructor(props: CombatAreaProps) {
    super(props);
  }

  render() {
    return <section id="flc-combat-turns"><ol>{this.props.turnComponents}</ol></section>;
  }
}

interface FLCCombatState {
  isCreatePhase: boolean,
  isSetupPhase: boolean,
  turnComponents?: Array<JSX.Element>,
  addTurnButton?: JSX.Element,
  participants?: {
    [key: string]: CombatParticipantState
  },
  activeTurnId?: number
}

export class FLCCombat extends React.Component<{}, FLCCombatState> {
  state: FLCCombatState;

  addParticipantDelta(
    id: string,
    hpChange: number,
    fpChange: number,
    conditionChange: CombatCondition): void {
    this.setState((prevState: FLCCombatState, props) => {
      const updatedParticipants = prevState.participants;
      if (!isNaN(hpChange)) updatedParticipants[id].delta.hp.push(hpChange);
      if (!isNaN(fpChange)) updatedParticipants[id].delta.fp.push(fpChange);
      if (!_.isEmpty(conditionChange.name)) {
        updatedParticipants[id].delta.conditions.push(conditionChange);
      }
      return {
        participants: updatedParticipants
      }
    });
  }

  performTurnUpdate(participant: CombatParticipantState) {
    let hpDelta: number = 0;
    for (let i = 0; i < participant.delta.hp.length; i++) {
      hpDelta = hpDelta + participant.delta.hp[i];
    }
    let fpDelta: number = 0;
    for (let j = 0; j < participant.delta.fp.length; j++) {
      fpDelta = fpDelta + participant.delta.fp[j];
    }
    let conditionsDelta: Array<CombatCondition> = [];
    _.forEach(participant.conditions.concat(participant.delta.conditions), (condDurChg) => {
      const updatedCondition: CombatCondition = {
        name: condDurChg.name,
        duration: (condDurChg.duration-1)
      };
      if (updatedCondition.duration > 0) conditionsDelta.push(updatedCondition);
    });
    this.setState((prevState, props) => {
      const updatedParticipants = prevState.participants;
      const partId = participant.id;
      updatedParticipants[partId].hp += hpDelta;
      updatedParticipants[partId].fp += fpDelta;
      updatedParticipants[partId].conditions = conditionsDelta;
      updatedParticipants[partId].delta = {
        hp: [],
        fp: [],
        conditions: []
      }
      return {
        participants: updatedParticipants
      }
    });
  }

  addCombatTurn(turnId: number) {
    const newTurn = <CombatTurn
      participants={this.state.participants}
      turnId={turnId}
      activeTurnId={this.state.activeTurnId}
      addParticipantDelta={this.addParticipantDelta.bind(this)} />
    const turnComponents = [...this.state.turnComponents, newTurn];
    this.setState({ turnComponents });
  }

  updateCombat(shouldPerformUpdate: boolean = true) {
    if (shouldPerformUpdate) {
      _.forEach(this.state.participants, (participant) => this.performTurnUpdate(participant));
    }
    const activeTurnId = Date.now();
    this.setState({ activeTurnId }, this.addCombatTurn.bind(this, activeTurnId));
  }

  startCombat(participants: { [key: string]: CombatParticipantState }) {
    this.setState({
      isSetupPhase: false,
      addTurnButton: <button
        id='add-turn-button'
        onClick={this.updateCombat.bind(this)}>Add Turn</button>,
      participants: participants
    }, this.updateCombat.bind(this, false));
  }

  setupCombat() {
    this.setState({
      isCreatePhase: false,
      isSetupPhase: true
    });
  }

  getDefaultState(): FLCCombatState {
    return {
      isCreatePhase: true,
      isSetupPhase: false,
      turnComponents: [],
      addTurnButton: null,
      participants: {},
      activeTurnId: null
    };
  }

  constructor(props: any) {
    super(props);
    this.state = this.getDefaultState();
    this.updateCombat = this.updateCombat.bind(this);
  }

  resetCombat() {
    this.setState(this.getDefaultState());
  }

  render() {
    let combatArea = null;
    if (this.state.turnComponents.length > 0) {
      combatArea = <CombatArea turnComponents={this.state.turnComponents} />
    }
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
          {this.state.isCreatePhase ?
              (<button onClick={this.setupCombat.bind(this)}>Create New Combat</button>) :
              (<button className="red-bkg" onClick={this.resetCombat.bind(this)}>Reset Combat</button>)}
          {this.state.isSetupPhase ? (<CombatSetup startCombat={this.startCombat.bind(this)} />) : (null)}
          {combatArea}
          {this.state.addTurnButton}
        </section>
      </article>
    );
  }
}
