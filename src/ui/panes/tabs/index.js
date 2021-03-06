import React from 'react';

import Tab from './tab';

import C from '../../../const';

class Tabs extends React.Component {

	constructor(props) {
		super(props);

		// Bind functions.
		this.switchTab = this.switchTab.bind(this);
	}

	/*
	 * Generate a function for switching tabs.
	 *
	 * @param {Number} screen The screen to switch to.
	 *
	 * @return {Function} A function used to switch to the specified screen.
	 */
	switchTab(screen) {
		const state = this.props.state;

		return () => {
			// Deselect.
			state.keyboard.deselect();

			state.update({
				screen: screen
			});
		};
	}

	render() {
		const state = this.props.state;
		const screen = state.screen;

		return <div className='panes-tabs'>
			<Tab
				selected={ screen === C.SCREEN_WIRING }
				onClick={ this.switchTab(C.SCREEN_WIRING) }>
				Wiring
			</Tab>
            <Tab
				selected={ screen === C.SCREEN_PINS }
				onClick={ this.switchTab(C.SCREEN_PINS) }>
				Pins
			</Tab>
			<Tab
				selected={ screen === C.SCREEN_KEYMAP }
				onClick={ this.switchTab(C.SCREEN_KEYMAP) }>
				Keymap
			</Tab>
			<Tab
				selected={ screen === C.SCREEN_SETTINGS }
				onClick={ this.switchTab(C.SCREEN_SETTINGS) }>
				Settings
			</Tab>
			<Tab
				selected={ screen === C.SCREEN_COMPILE }
				onClick={ this.switchTab(C.SCREEN_COMPILE) }>
				Compile
			</Tab>
		</div>;
	}

}

export default Tabs;
