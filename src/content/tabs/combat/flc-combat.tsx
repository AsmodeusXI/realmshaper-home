import * as React from "react";
import * as _ from "lodash";

import { NewParticipant, NewParticipantState, CombatSetup } from './flc-combat-setup';
import { CombatTurn } from './flc-combat-turn';

import './flc-combat.scss';

export interface CombatCondition {
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

interface FLCCombatState {
  isCreatePhase: boolean,
  isSetupPhase: boolean,
  turns: Array<{
    participants: {
      [key: string]: CombatParticipantState
    }
  }>,
  isCombatPhase: boolean,
  turnIdx: number
}

export class FLCCombat extends React.Component<{}, FLCCombatState> {
  state: FLCCombatState;

  addParticipantDelta(
    id: string,
    hpChange: number,
    fpChange: number,
    conditionChange: CombatCondition): void {
    this.setState((prevState: FLCCombatState, props) => {
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
    });
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
      return { turns: updateTurns }
    });
  }

  performTurnUpdate(participant: CombatParticipantState): CombatParticipantState {
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
    return {
      id: participant.id,
      name: participant.name,
      hp: participant.hp + hpDelta,
      fp: participant.fp + fpDelta,
      conditions: conditionsDelta,
      delta: {
        hp: [],
        fp: [],
        conditions: []
      }
    };
  }

  startCombat() {
    this.setState({
      isSetupPhase: false,
      isCombatPhase: true
    });
  }

  addTurn() {
    this.setState((prevState, props) => {
      const updateTurns = prevState.turns;
      const updatedParticipants: any = {};
      _.forEach(updateTurns[prevState.turnIdx].participants, (participant) => {
        updatedParticipants[participant.id] = this.performTurnUpdate(participant);
      });
      updateTurns.push({ participants: updatedParticipants });
      return {
        turns: updateTurns,
        turnIdx: prevState.turnIdx + 1
      };
    });
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
      isCombatPhase: false,
      turns: [{
        participants: {}
      }],
      turnIdx: 0
    };
  }

  constructor(props: any) {
    super(props);
    this.getDefaultState = this.getDefaultState.bind(this);
    this.state = this.getDefaultState();
  }

  resetCombat() {
    this.setState(this.getDefaultState());
  }

  render() {
    const turns = this.state.turns.map((turn, idx) => {
      const isTurnActive = (this.state.turnIdx === idx);
      return (
        <CombatTurn
          turnNo={idx}
          isTurnActive={isTurnActive}
          participants={turn.participants}
          addParticipantDelta={this.addParticipantDelta.bind(this)}
        />
      );
    });
    return (
      <article id="flc-combat-tab">
        <section id="flc-combat-about">
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
              (<button onClick={this.resetCombat.bind(this)}>Reset Combat</button>)}
          {this.state.isSetupPhase ? (<CombatSetup
            startCombat={this.startCombat.bind(this)}
            updateNewParticipant={this.updateNewParticipant.bind(this)} />) : (null)}
          {this.state.isCombatPhase ? (<section id="flc-combat-turns">{turns}</section>) : (null)}
          {this.state.isCombatPhase ?
            (<button id='add-turn-button' onClick={this.addTurn.bind(this)}>Add Turn</button>) : (null)}
        </section>
      </article>
    );
  }
}
