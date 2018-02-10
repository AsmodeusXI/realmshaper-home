import * as React from "react";

import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Nav } from "./nav/nav";
import { Content } from "./content/content";

import './app.scss';

export class App extends React.Component<{}, {}> {
  render() {
    return <div id="rs-app" className="default">
      <Header/>
      <section id='rs-main'>
        <Nav/>
        <Content/>
      </section>
      <Footer/>
    </div>;
  }
}
