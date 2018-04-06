import * as React from "react";
import * as _ from "lodash";

import { CombatCondition, CombatParticipantState } from './flc-combat';

interface TextInputDisplayProps {
  name: string,
  value: string,
  wrapperCls?: string,
  updateFunction: Function
}

class TextInputDisplay extends React.Component<TextInputDisplayProps, {}> {
  constructor(props: TextInputDisplayProps) {
    super(props);
  }

  render() {
    return <div className={this.props.wrapperCls}><input
      type="text"
      name={this.props.name}
      value={this.props.value}
      onChange={(e) => this.props.updateFunction(e)}
      onBlur={(e) => this.props.updateFunction(e)}
    /></div>;
  }
}

class ConditionDisplay extends React.Component<CombatCondition, {}> {
  constructor(props: CombatCondition) {
    super(props);
  }

  render() {
    return (
      <div className="condition shadow-1">
        {this.props.name}&nbsp;{this.props.duration}
      </div>
    )
  }
}

interface CombatParticipantProps extends CombatParticipantState {
  isActive: boolean,
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
      };
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
      <div className="turn-participant shadow-2">
        <div className="participant participant-name">{this.props.name}</div>
        <div className="participant participant-hp">
          <div className="part-form">
            <div>
              <b>{this.props.hp}</b>{hpDeltas}
            </div>
            { this.props.isActive ?
              (<TextInputDisplay
                name="hpChange"
                value={this.state.hpChange}
                updateFunction={this.changeField}
              />) : (null) }
          </div>
        </div>
        <div className="participant participant-fp">
          <div className="part-form">
            <div>
              <b>{this.props.fp}</b>{fpDeltas}
            </div>
            { this.props.isActive ?
              (<TextInputDisplay
                name="fpChange"
                value={this.state.fpChange}
                updateFunction={this.changeField}
              />) : (null) }
          </div>
        </div>
        <div className="participant participant-condition">
          <div className="part-form">
            <div className="condition-container">
              { (conditionElements.length > 0) ? conditionElements : (<span><b>No Conditions</b></span>) }
            </div>
            <div className="condition-applicator">
              { this.props.isActive ?
                (<TextInputDisplay
                  name="conditionNameChange"
                  wrapperCls="name-wrapper"
                  value={this.state.conditionNameChange}
                  updateFunction={this.changeField}
                />) : (null) }
              { this.props.isActive ?
                (<TextInputDisplay
                  name="conditionDurationChange"
                  wrapperCls="duration-wrapper paren-wrap"
                  value={this.state.conditionDurationChange}
                  updateFunction={this.changeField}
                />) : (null) }
            </div>
          </div>
        </div>
        <div className="participant participant-update">
          { this.props.isActive ? (<button onClick={this.updateDelta}>Update</button>) : (null) }
        </div>
      </div>
    )
  }
}

interface CombatTurnProps {
  participants: {},
  addParticipantDelta: Function,
  isTurnActive: boolean,
  turnNo: number
}

export class CombatTurn extends React.Component<CombatTurnProps, {}> {
  constructor(props: CombatTurnProps) {
    super(props);
  }

  render() {
    const participants: Array<JSX.Element> = [];
    _.forEach(this.props.participants, (participant) => {
      participants.push(
        <CombatParticipant
          id={participant.id}
          name={participant.name}
          hp={participant.hp}
          fp={participant.fp}
          conditions={participant.conditions}
          addDelta={this.props.addParticipantDelta}
          isActive={this.props.isTurnActive} />
      );
    });
    return (
      <div className='turn-wrapper shadow-1'>
        <div className='turn-counter'>{this.props.turnNo + 1}</div>
        <div className='turn-actor'>{participants}</div>
      </div>
    );
  }
}
