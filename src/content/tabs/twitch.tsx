import * as React from "react";
import ReactPlayer from 'react-player';

import './twitch.scss';

export class Twitch extends React.Component<{}, {}> {
  render() {
    return <article id="twitch-tab" className='center-viewer'>
      <div id="twitch-container">
        <ReactPlayer url='https://www.twitch.tv/djforeclosure' />
      </div>
    </article>;
  }
}
