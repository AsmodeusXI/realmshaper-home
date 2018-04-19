import * as React from "react";
import * as cr from "dnd-5e-cr-calculator";

import './cr-calculator.scss';

interface CRState {
  hp: number,
  ac: number,
  dpr: number | string,
  atk: number,
  save: number,
  cr: number | string
}

export class CRCalculator extends React.Component<{}, CRState> {
  constructor(props: object) {
    super(props);
    this.state = {
      hp: null,
      ac: null,
      dpr: null,
      atk: null,
      save: null,
      cr: null
    }
    this.updateField.bind(this);
  }

  updateField(event: any): void {
    const isStringDpr = event.target.value.includes('d');
    const changeValue = isStringDpr ? event.target.value : parseInt(event.target.value);
    const changeName = event.target.getAttribute('name');
    this.setState({ [changeName]: changeValue });
  }

  calculateCR(): void {
    let hasError = false;
    let creatureCR, errorText;
    if (typeof this.state.dpr === 'string'){
      try {
        creatureCR = cr.calculateWithDice(
          this.state.hp,
          this.state.ac,
          this.state.dpr,
          this.state.atk,
          this.state.save
        );
      } catch (e) {
        hasError = true;
        errorText = 'calculateWithDice() Failed';
      }
    } else {
      try {
        creatureCR = cr.calculate(
          this.state.hp,
          this.state.ac,
          this.state.dpr,
          this.state.atk,
          this.state.save
        );
      } catch (e) {
        hasError = true;
        errorText = 'calculate() Failed';
      }
    }

    if (hasError) {
      this.setState({ cr: errorText });
    } else {
      this.setState({ cr: creatureCR });
    }
  }

  render() {
    return <article id="cr-calculator-tab">
      <section id="cr-calculator-about">
        <h2>D&D 5e CR Calculator</h2>
        <p>
          Dungeons and Dragons Fifth Edition includes a great deal of monsters in its various sourcebooks,
          but the Dungeon Master's Guide also provides mechanical guidance on creating monsters at specific
          Challenge Ratings, or "CRs". If you want to create a custom monster, using the provided CR guidance
          is necessary to approximate the same balance as provided in the sourcebooks.
        </p>
        <p>
          This module provides a front-end for my <a href="https://www.npmjs.com/package/dnd-5e-cr-calculator" target="_blank">dnd-5e-cr-calculator</a> npm
          package, which allows Dungeon Masters to discover the Challenge Ratings of their monsters based on
          statistics the user provides.
        </p>
      </section>
      <section id="cr-calculator-container">
        <div className="cr-input">
          <div className="cr-input-fields">
            <div className="part-form">
              <div><b>HP</b></div>
              <input type="text" name="hp" placeholder="Hit Points"
                onChange={(e) => this.updateField(e)} onBlur={(e) => this.updateField(e)}/>
            </div>
            <div className="part-form">
              <div><b>AC</b></div>
              <input type="text" name="ac" placeholder="Armor Class"
                onChange={(e) => this.updateField(e)} onBlur={(e) => this.updateField(e)}/>
            </div>
            <div className="part-form">
              <div><b>DpR</b></div>
              <input type="text" name="dpr" placeholder="Damage per Round"
                onChange={(e) => this.updateField(e)} onBlur={(e) => this.updateField(e)}/>
            </div>
            <div className="part-form">
              <div><b>Atk</b></div>
              <input type="text" name="atk" placeholder="Attack Bonus"
                onChange={(e) => this.updateField(e)} onBlur={(e) => this.updateField(e)}/>
            </div>
            <div className="part-form">
              <div><b>Save</b></div>
              <input type="text" name="save" placeholder="Save DC"
                onChange={(e) => this.updateField(e)} onBlur={(e) => this.updateField(e)}/>
            </div>
          </div>
          <div className="cr-input-button">
            <button onClick={this.calculateCR.bind(this)}>Create</button>
          </div>
        </div>
        <div className="cr-result">
          <p>{ this.state.cr ? (this.state.cr) : ('N/A') }</p>
        </div>
      </section>
    </article>;
  }
}
