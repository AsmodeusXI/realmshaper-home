import * as React from "react";
import { ResInput } from '../../../components/resinput';
import { MainSection } from '../../../components/mainsection';
import * as cr from "dnd-5e-cr-calculator";
import './cr-calculator.scss';

interface CRState {
  hp?: number,
  ac?: number,
  dpr?: number | string,
  atk?: number,
  save?: number,
  cr?: number | string
}

export class CRCalculator extends MainSection<CRState> {
  constructor(props) {
    super(props);
    this.state = {
      hp: null,
      ac: null,
      dpr: null,
      atk: null,
      save: null,
      cr: null
		};

		this.updateField = this.updateField.bind(this);
		this.calculateCR = this.calculateCR.bind(this);
  }

  updateField(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
			[event.target.getAttribute('name')]:
				event.target.value.includes('d')
					? event.target.value
					: parseInt(event.target.value),
		});
  }

  calculateCR(): void {
		const calc: string = (typeof this.state.dpr === 'string')
			? 'calculateWithDice'
			: 'calculate';

		try {
      this.setState({
				cr: cr[calc](
					this.state.hp,
					this.state.ac,
					this.state.dpr,
					this.state.atk,
					this.state.save
				),
			});
    } catch (e) {
			console.error(e);
			this.setState({ cr: `${calc} Failed` });
    }
  }

  render(): JSX.Element {
    return (
			<article id="cr-calculator-tab">
				<section id="cr-calculator-about">
      	  <h2>{this.props.pageName}</h2>
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
								<ResInput
									name='hp'
									type='text'
									value={this.state.hp}
									placeholder='Hit Points'
									update={this.updateField} />
      	      </div>
      	      <div className="part-form">
      	        <div><b>AC</b></div>
								<ResInput
									name='ac'
									type='text'
									value={this.state.ac}
									placeholder='Armor Class'
									update={this.updateField} />
      	      </div>
      	      <div className="part-form">
      	        <div><b>DpR</b></div>
								<ResInput
									name='dpr'
									type='text'
									value={this.state.dpr}
									placeholder='Damage per Round'
									update={this.updateField} />
      	      </div>
      	      <div className="part-form">
      	        <div><b>Atk</b></div>
								<ResInput
									name='atk'
									type='text'
									value={this.state.atk}
									placeholder='Attack Bonus'
									update={this.updateField} />
      	      </div>
      	      <div className="part-form">
      	        <div><b>Save</b></div>
								<ResInput name='save'
									type='text'
									value={this.state.save}
									placeholder='Save DC'
									update={this.updateField} />
      	      </div>
      	    </div>
      	    <div className="cr-input-button">
      	      <button onClick={this.calculateCR}>Create</button>
      	    </div>
      	  </div>
      	  <div className="cr-result">
      	    <p>{ this.state.cr ? (this.state.cr) : ('N/A') }</p>
      	  </div>
      	</section>
			</article>
		);
  }
}
