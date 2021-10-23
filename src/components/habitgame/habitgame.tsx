import React, { useState } from 'react';
import * as HabitGameCreator from "habit-game-creator";
import './habitgame.scss';

const HabitGame = ({ name }): JSX.Element => {
	const [quest, setQuest] = useState(HabitGameCreator.generateCharacter());

	return (
		<article id='habit-game-tab'>
			<section id='habit-game-about'>
				<h2>{name}</h2>
				<p>Recently, I'd been having trouble with maintaining some of the habits that I wanted to keep during my day-to-day. In response to that, I decided to create a small RPG to inspire me to actually complete my goals. The RPG creates a character that I push through a quest that is successful (or not) based on how well I meet my goals. This tiny generator creates a character to use in this game. Check out my NPM package that does the generation at <a href="https://www.npmjs.com/package/habit-game-creator" target="_blank">habit-game-creator at NPM</a>.</p>
			</section>

			<section id='habit-game-container'>
				<p>{quest}</p>
				<div className='habit-button'>
					<button onClick={() => setQuest(HabitGameCreator.generateCharacter())}>
						Create Character
					</button>
				</div>
			</section>
		</article>
	);
};

export default HabitGame;
