import React from 'react';

import Files from '../../../files';
import KiCad from '../../../kicad';
import KbHGenerator from '../../../files/generators/kb.h';

import Request from 'superagent';

import C from '../../../const';

class Compile extends React.Component {

	constructor(props) {
		super(props);

		// Bind functions.
		this.downloadHex = this.downloadHex.bind(this);
		this.downloadZip = this.downloadZip.bind(this);
		this.downloadKiCad = this.downloadKiCad.bind(this);
	}

	downloadHex() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		// Disable buttons.
		state.ui.set('compile-working', true);

		// Generate source files.
		const files = Files.generate(keyboard);

		// Send the request.
		Request
			.post(C.LOCAL.API)
			.set('Content-Type', 'application/json')
			.send(JSON.stringify(files))
			.end((err, res) => {
				res = JSON.parse(res.text);

				if (err) {
					console.error(err);
					state.error('Unable to connect to API server.');
					state.ui.set('compile-working', false);
					return;
				}

				// Check if there was an error.
				if (res.error) {
					console.error(res.error);
					state.error('Server error:\n' + res.error);
					state.ui.set('compile-working', false);
					return;
				}

				// Generate a friendly name.
				const friendly = keyboard.settings.name ? keyboard.slug : 'layout';

				// Download the hex file.
				const blob = new Blob([res.hex], { type: 'application/octet-stream' });
				saveAs(blob, friendly + '.hex');

				// Re-enable buttons.
				state.ui.set('compile-working', false);
			});
	}

	async downloadZip() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		// Disable buttons.
		state.ui.set('compile-working', true);

        // Get new vial uid.
        const vialUid = await fetch('/vial-uid').then(response => response.text())
        
		// Generate source files.
		const files = Files.generate(keyboard, vialUid);

		// Get the firmware stencil.
		JSZipUtils.getBinaryContent('/files/firmware.zip', (err, data) => {
			if (err) {
				console.error(err);
				state.error('Unable to retrieve files');
				state.ui.set('compile-working', false);
				return;
			}

			JSZip.loadAsync(data).then(zip => {
				// Insert the files.
				for (const file in files) {
					zip.file(file, files[file]);
				}

				// Download the file.
				zip.generateAsync({ type: 'blob' }).then(blob => {
					// Generate a friendly name.
					const friendly = keyboard.settings.name ? keyboard.slug : 'layout';

					saveAs(blob, friendly + '_firmware' + '.zip');

					// Re-enable buttons.
					state.ui.set('compile-working', false);
				}).catch(e => {
					console.error(err);
					state.error('Unable to generate files');
					state.ui.set('compile-working', false);
				});
			}).catch(e => {
				console.error(err);
				state.error('Unable to retrieve files');
				state.ui.set('compile-working', false);
			});
		});
	}

	downloadKiCad() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		// Disable buttons.
		state.ui.set('compile-working', true);

		// Generate KiCad files.
		const files = KiCad.generate(keyboard);

		// Get the PCB stencil.
		JSZipUtils.getBinaryContent('/files/kicad.zip', (err, data) => {
			if (err) {
				console.error(err);
				state.error('Unable to retrieve files');
				state.ui.set('compile-working', false);
				return;
			}

			JSZip.loadAsync(data).then(zip => {
				// Insert the files.
				for (const file in files) {
					zip.file(file, files[file]);
				}

				// Download the file.
				zip.generateAsync({ type: 'blob' }).then(blob => {
					// Generate a friendly name.
					const friendly = keyboard.settings.name ? keyboard.slug : 'layout';

					saveAs(blob, friendly + '_pcb' + '.zip');

					// Re-enable buttons.
					state.ui.set('compile-working', false);
				}, (err) => {
					console.error(err);
					state.error('Unable to generate files');
					state.ui.set('compile-working', false);
				}).catch(e => {
					console.error(err);
					state.error('Unable to generate files');
					state.ui.set('compile-working', false);
				});
			}).catch(e => {
				console.error(err);
				state.error('Unable to retrieve files');
				state.ui.set('compile-working', false);
			});
		});
	}

	generateKeyboardH() {
		const state = this.props.state;
		const keyboard = state.keyboard;
		return new KbHGenerator(keyboard).generate();
	}

	render() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		return <div className='pane-compile'>
			<div style={{ height: '0.5rem' }}/>
			<button
				onClick={ this.downloadKiCad }>
				Download KiCad PCB
			</button>
			<div style={{ height: '0.5rem' }}/>
            <button
				onClick={ this.downloadZip }>
				Download Firmware (Experimental)
			</button>
		</div>;
	}

}

export default Compile;
