import * as React from "react";

import './about.scss';

export class About extends React.Component<{}, {}> {
  render() {
    return <article id="bio-tab">
      <p>Welcome to Realmshaper, the personal website of Sam Lawton.</p>

      <p>The intent of this site is to be a home for my personal projects, a resource for those who would utilize them, and a portfolio for those interested in my code.</p>

      <p>I can be reached at other sites by clicking on the icons below:</p>

      <span>
        <a target="_blank" href="https://www.linkedin.com/in/samuel-lawton-developer"><i className="fab fa-linkedin fa-2x"></i></a>
        <a target="_blank" href="https://github.com/AsmodeusXI"><i className="fab fa-github-square fa-2x"></i></a>
      </span>
    </article>;
  }
}
