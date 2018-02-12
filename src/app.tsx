import * as React from "react";

import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Nav } from "./nav/nav";
import { Content } from "./content/content";

import './app.scss';

interface AppProps {
  tab?: string
}

export class App extends React.Component<{}, {}> {
  props: AppProps
  state: AppProps

  constructor(props: AppProps) {
    super(props);
    this.state = {
      tab: props.tab
    }
  }

  handleNav(tab: string): void {
    this.setState({tab: tab});
  }

  render() {
    return <div id="rs-app" className="default">
      <Header/>
      <section id='rs-main'>
        <Nav tab={this.state.tab} handleNav={(tab?: string) => this.handleNav(tab)}/>
        <Content tab={this.state.tab}/>
      </section>
      <Footer/>
    </div>;
  }
}
