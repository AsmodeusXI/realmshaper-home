import * as React from "react";

import { Card } from "./card";

export class Nav extends React.Component<{}, {}> {
  render() {
    return <nav>
      <Card id='test-1' name='Test 1'/>
      <Card id='test-2' name='Test 2'/>
      <Card id='test-3' name='Test 3'/>
    </nav>;
  }
}
