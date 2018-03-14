import * as React from "react";

import { GeneratorMain } from "name-maker";

import "./namegen.scss";

function capitalize(str: string): string {
  return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
}

class NameList extends React.Component<{}, {}> {
  props: {names: Array<string>, culture: string};

  constructor(props: {names: Array<string>}) {
    super(props);
  }

  render() {
    const renderNames = this.props.names.map((name) => {
      return <li className={this.props.culture}>{name}</li>;
    });
    return <ul>{renderNames}</ul>;
  }
}

export class NameGen extends React.Component<{}, {}> {
  props: {cultures: Array<string>}
  state: any;

  constructor(props: {cultures: Array<string>}) {
    super(props);
    const stateObject: any = {};
    for (let culture of props.cultures) {
      stateObject[culture] = GeneratorMain.generateNames(culture, 10);
    }
    this.state = stateObject;
  }

  generate(culture: string): void {
    const names = GeneratorMain.generateNames(culture, 10);
    this.setState({[culture]: names});
  }

  render() {
    const generatorSections = this.props.cultures.map((culture) => {
      const sectionId = `${culture}-names`;
      const buttonLabel = `Generate ${capitalize(culture)} Names`;
      return (
        <section id={sectionId} className="name-container">
          <div className="center">
            <button onClick={this.generate.bind(this, culture)}>
              {buttonLabel}
            </button>
          </div>
          <NameList names={this.state[culture]} culture={culture}/>
        </section>
      )
    });
    return (
      <article id="name-gen-tab">
        <section id="name-gen-about" className="about-section">
          <h2>Name Generator</h2>
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
            purpose, which can be found at <a href="https://www.npmjs.com/package/name-maker" target="_blank">name-maker</a>.
          </p>
        </section>
        <section id="name-generators">
          {generatorSections}
        </section>
      </article>
    );
  }
}
