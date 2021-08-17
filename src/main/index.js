import React from 'react';

import Main from './main';
import Editor from './editor';

import State from '../state';

import C from '../const';

class Index extends React.Component {

	constructor(props) {
		super(props);

		this.state = new State(this);
	}

	render() {
		// Assign the current screen.
		let Screen;
		if (this.state.screen === C.SCREEN_MAIN) {
			Screen = Main;
		} else {
			Screen = Editor;
		}

		return <div>
			<div className='header'>
				Keyboard PCB Builder and Vial Firmware Generator
			</div>
			<Screen
				state={ this.state }/>
		</div>;
	}

}

export default Index;
