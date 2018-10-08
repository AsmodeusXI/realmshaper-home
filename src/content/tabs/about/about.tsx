import * as React from "react";
import { MainSection } from '../../../components/mainsection';
import './about.scss';

export class About extends MainSection {
  render(): JSX.Element {
    return (
			<article id="bio-tab">
				<h2>{this.props.pageName}</h2>

				<p>Welcome to Realmshaper, the personal website of Sam Lawton. Why Realmshaper? Well, my first idea for a site was a set of resources for creators who play
      tabletop role-playing games, so this was the domain I picked up. Since I haven't soured on it yet and my original site idea fell through (in a way; now THIS site
      is that resource, plus some other stuff), I figured I'd transition it to be used for my own personal site.</p>

				<p>The intent of this site is to be a home for my personal projects, a resource for those who would utilize them, and a portfolio for those interested in my code. It is also in constant development, so expect to see regular changes (assuming I'm as attentive to this as I'd like to be).</p>

				<p>I can be reached at other, more traditional sites by clicking on the icons below:</p>

				<div className='account-links'>
					<a target="_blank" href="https://www.linkedin.com/in/samuel-lawton-developer"><i className="fab fa-linkedin fa-2x"></i></a>
					<a target="_blank" href="https://github.com/AsmodeusXI"><i className="fab fa-github-square fa-2x"></i></a>
				</div>
			</article>
		);
  }
}
