import React from 'react';

import Keyboard from '../state/keyboard';

import C from '../const';
import Utils from '../utils';

import Request from 'superagent';

class Main extends React.Component {

	constructor(props) {
		super(props);

		// Bind functions.
		this.upload = this.upload.bind(this);
		this.useKLE = this.useKLE.bind(this);
	}

	/*
	 * Upload a QMK Builder configuration.
	 */
	upload() {
		const state = this.props.state;

		// Upload a file.
		Utils.readFile(contents => {
			try {
				// Deserialize the contents.
				const deserialized = JSON.parse(contents);

				// Ensure the version is correct.
				if (deserialized.version !== C.VERSION) throw 'version mismatch';

				// Build a new keyboard.
				const keyboard = Keyboard.deserialize(state, deserialized.keyboard);

				state.update({
					keyboard: keyboard,
					screen: C.SCREEN_WIRING // Switch to the wiring screen.
				});
			} catch (e) {
				console.error(e);
				state.error('Invalid configuration');
			}
		});
	}

	/*
	 * Use KLE raw data.
	 */
	useKLE() {
		const state = this.props.state;

		try {
			const json = parser.parse('[' + state.ui.get('kle', '') + ']'); // Parse the raw data.

			// Parse the KLE data.
			const keyboard = new Keyboard(state, json);

			// Make sure the data is valid.
			if (keyboard.keys.length == 0) {
				throw 'empty layout';
			}

			state.update({
				keyboard: keyboard,
				screen: C.SCREEN_WIRING // Switch to the wiring screen.
			});
		} catch (e) {
			console.error(e);
			state.error('Invalid layout');
		}
	}

	render() {
		const state = this.props.state;

		return <div>
			{/* <h3>Upload Keyboard Firmware Builder configuration</h3>
			<button
				className='block'
				onClick={ this.upload }>
				Upload
			</button> */}
			<br/><br/>
			<h3>Import from keyboard-layout-editor.com</h3>
			<textarea
				className='kle'
				placeholder='Paste layout here...'
				value={ state.ui.get('kle', '') }
				onChange={ state.ui.set('kle') }/>
			<button
				className='block'
				onClick={ this.useKLE }>
				Import
			</button>

            <div className="tutorial">
                <p className="tutorial-text">
                    To create a layout option, annotate the layout name in the left front legend, and the layout option name in the right front legend of all the associated keys. Currently layout options must be position to the right of or below the main key area.
                    <br/><br/>
                    To stabilized keys with reversed stabilizer orientations, mark the key row as a spacebar. (Any key profile will work)
                </p>
                <img className="tutorial-image" src="https://i.imgur.com/Pchs8W7.png" />
                <br/><br/>
                <h2>TODO</h2>
                <ul className="tutorial-text">
                    <li>Sane ordering of keymap.c for odd matrices</li>
                    <li>Fix layout options that span multiple rows</li>
                    <li>Generate mcu-side global labels for data pins</li>
                    <li>Backlight support on PCB</li>
                    <li>Autorouting/placing</li>
                    <li>Used pin counter/error</li>
                    <li>Missing switch footprint error</li>
                    <li>Config backup</li>
                    <li>Smarter layout option processing</li>
                    <li>Layout presets</li>
                    <li>Via firmware generation</li>
                    <li>info.json generation</li>
                    <li>Encoder support</li>
                </ul>
            </div>
		</div>;
	}

}

export default Main;
