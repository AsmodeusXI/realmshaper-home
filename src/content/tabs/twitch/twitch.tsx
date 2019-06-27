import * as React from "react";
import ReactPlayer from 'react-player';
import { MainSection } from '../../../components/mainsection';
import './twitch.scss';

export class Twitch extends MainSection {
  render(): JSX.Element {
    return (
			<article id="twitch-tab">
				<section id="twitch-about">
					<h2>{this.props.pageName}</h2>

					<p>In thinking about my personal site, I figured I might want a simple way to access my Twitch stream, typically found at <a target="_blank" href="https://www.twitch.tv/djforeclosure">twitch.tv/djforeclosure</a> that didn't require going to the Twitch homepage. I don't stream very often, but I have a semi-weekly Dungeons &amp; Dragons Fifth Edition game that is played online via Roll20.net and streamed. I also do a yearly <a target="_blank" href="https://www.extra-life.org/index.cfm?fuseaction=cms.home">Extra Life</a> 24-hour video game stream for charity.</p>
					
					<p>The primary driver of this page is the <a target="_blank" href="https://www.npmjs.com/package/react-player">React Player</a> plugin, which is <strong>NOT</strong> of my making.</p>
				</section>
				
				<section id="twitch-container" className='center-viewer'>
					<ReactPlayer url='https://www.twitch.tv/djforeclosure' />
				</section>
			</article>
		);
  }
}
