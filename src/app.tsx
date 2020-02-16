import * as React from "react";

import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Nav } from "./nav/nav";
import { Content } from "./content/content";
import { NavSection } from "./nav/nav";

import './app.scss';

interface AppSettings {
  tab: NavSection
}

export class App extends React.Component<{}, AppSettings> {
  constructor(props: object) {
    super(props);
    this.state = {
      tab: NavSection.about
    }
  }

  handleNav(tab: NavSection): void {
		document.getElementsByTagName('nav')[0].className = 'hide-nav';
    this.setState({ tab });
  }

  render(): JSX.Element {
    return (
      <div id="rs-app" className="default">
        <Header/>
        <section id='rs-main'>
          <Nav tab={this.state.tab} handleNav={(tab: NavSection) => this.handleNav(tab)}/>
          <Content tab={this.state.tab}/>
        </section>
        <Footer/>
      </div>
    );
  }
}
