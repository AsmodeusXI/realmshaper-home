import * as React from "react";

import { Header } from "./header";
import { Footer } from "./footer";
import { Nav } from "./nav";
import { Content } from "./content";

export class App extends React.Component<{}, {}> {
  render() {
    return <div className="rs-app">
      <Header/>
      <section id='rs-main'>
        <Nav/>
        <Content/>
      </section>
      <Footer/>
    </div>;
  }
}
