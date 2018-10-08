import * as React from "react";
import { NameContainer } from './namecontainer';
import { GeneratorMain } from "name-maker";
import { MainSection } from '../../../components/mainsection';
import "./namegen.scss";

export class NameGen extends MainSection {
  render(): JSX.Element {
    return (
      <article id="name-gen-tab">
        <section id="name-gen-about" className="about-section">
          <h2>{this.props.pageName}</h2>
          <p>
            I began my Name Generator project as a way to provide non-player
            character names within one of my Dungeons &amp; Dragons games. Coming up
            with names on the spot is difficult, especially when you want a given
            culture's names to possess an internal consistency that is similar to
            reality. By utilizing random generation within a set list of syllables
            and a set of name structures, some interesting possibilities can be
            generated.
          </p>
          <p>
            The Name Generator uses code from an npm module I created for this
            purpose, which can be found at 
						<a href="https://www.npmjs.com/package/name-maker" target="_blank">name-maker</a>.
          </p>
        </section>
        <section id="name-generators">
          <NameContainer cultures={GeneratorMain.getAvailableCultures()} />
        </section>
      </article>
    );
  }
}
