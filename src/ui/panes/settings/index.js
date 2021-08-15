const React = require('react');

const NumberBox = require('ui/elements/numberbox');
const Help = require('ui/elements/help');

const C = require('const');
const Utils = require('utils');

class Settings extends React.Component {

	constructor(props) {
		super(props);

		// Bind functions.
		this.save = this.save.bind(this);
	}

	/*
	 * Save the configuration.
	 */
	save() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		// Get a friendly name for the keyboard.
		const friendly = keyboard.settings.name ? Utils.generateFriendly(keyboard.settings.name) : 'layout';

		// Serialize the keyboard.
		const serialized = keyboard.serialize();

		// Create the configuration.
		const config = JSON.stringify({
			version: C.VERSION,
			keyboard: serialized
		});

		// Download.
		const blob = new Blob([config], { type: 'text/plain;charset=utf-8' });
		saveAs(blob, friendly + '.json');
	}

	render() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		// Compile a list of errors and warnings.
		const list = [];
		let index = 0;
		for (const error of keyboard.errors) {
			list.push(<div className='pane-settings-list-element' key={ index ++ }>
				<span style={{ color: '#c0392b' }}><i className='fa fa-times-circle'/></span>
				{ error }
			</div>);
		}
		for (const warning of keyboard.warnings) {
			list.push(<div className='pane-settings-list-element' key={ index ++ }>
				<span style={{ color: '#c6cc33' }}><i className='fa fa-exclamation-triangle'/></span>
				{ warning }
			</div>);
		}
		if (list.length === 0) {
			list.push(<div style={{ padding: '1rem' }} key={ -1 }>
				No errors or warnings!
			</div>);
		}

		return <div className='pane-settings'>
			Configure your settings.

			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>Keyboard Name</h2>
			<input
				style={{ width: '8rem' }}
				type='text'
				value={ keyboard.settings.name }
				onChange={ e => keyboard.setSetting('name', e.target.value) }/>
			<Help>
				Give your keyboard a name!
			</Help>

            <div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>Firmware Author</h2>
			<input
				style={{ width: '8rem' }}
				type='text'
				value={ keyboard.settings.author }
				onChange={ e => keyboard.setSetting('author', e.target.value) }/>
			<Help>
				Name to list in C files as copyright owner
			</Help>

            <div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>Vendor ID 0x</h2>
			<input
				style={{ width: '8rem' }}
				type='text'
				value={ keyboard.settings.vendorId }
				onChange={ e => keyboard.setSetting('vendorId', e.target.value) }/>
			<Help>
				Unique 4-digit Hex code for vendor
			</Help>

            <div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>Product ID 0x</h2>
			<input
				style={{ width: '8rem' }}
				type='text'
				value={ keyboard.settings.productId }
				onChange={ e => keyboard.setSetting('productId', e.target.value) }/>
			<Help>
				Unique 4-digit Hex code for product
			</Help>

            <div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>Device Ver 0x</h2>
			<input
				style={{ width: '8rem' }}
				type='text'
				value={ keyboard.settings.deviceVer }
				onChange={ e => keyboard.setSetting('deviceVer', e.target.value) }/>
			<Help>
				4-digit Hex code for version
			</Help>

            <div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>Manufacturer</h2>
			<input
				style={{ width: '8rem' }}
				type='text'
				value={ keyboard.settings.manufacturer }
				onChange={ e => keyboard.setSetting('manufacturer', e.target.value) }/>
            <Help>
				Who makes this keyboard
			</Help>

            <div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>Connector Type</h2>
            <select
                style={{ width: '8rem' }}
                value={ keyboard.settings.connectorType }
                onChange={ e => keyboard.setSetting('connectorType', parseInt(e.target.value))}>
                    <option value={C.CONNECTOR_TYPE_C}>USB Type-C</option>
                    <option value={C.CONNECTOR_JST}>JST (Unified DB)</option>
            </select>
            <Help>
				Which data connector to use
			</Help>

            <div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>Switch Footprint</h2>
            <select
                style={{ width: '8rem' }}
                value={ keyboard.settings.switchType }
                onChange={ e => keyboard.setSetting('switchType', parseInt(e.target.value))}>
                    <option value={C.SWITCH_MX}>MX</option>
                    <option value={C.SWITCH_HOTSWAP}>Hotswap</option>
                    <option value={C.SWITCH_ALPS}>Alps</option>
                    <option value={C.SWITCH_HYBRID}>MX/Alps Hybrid</option>
            </select>
            <Help>
				What kind of switch footprint to use on the PCB
			</Help>

			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>WS2812 LEDs</h2>
			<div style={{ width: '8rem', display: 'inline-block', textAlign: 'left' }}>
				<NumberBox
					style={{ width: '3.5rem' }}
					min='0'
					value={ keyboard.settings.rgbNum }
					onChange={ v => keyboard.setSetting('rgbNum', v) }/>
			</div>
			<Help>
				The number of WS2812 LEDs, if any.
			</Help>

			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '8rem', marginRight: '0.8rem' }}>Backlight Levels</h2>
			<div style={{ width: '8rem', display: 'inline-block', textAlign: 'left' }}>
				<NumberBox
					style={{ width: '3.5rem' }}
					min='0'
					max='15'
					value={ keyboard.settings.backlightLevels }
					onChange={ v => keyboard.setSetting('backlightLevels', v) }/>
			</div>
			<Help>
				The number of backlight levels.
			</Help>
            
			<div style={{ height: '1.5rem' }}/>
			Save your layout.
			<div style={{ height: '0.5rem' }}/>
			<button onClick={ this.save }>
				Save Configuration
			</button>
			<div style={{ height: '1.5rem' }}/>
			Check errors and warnings.
			<div style={{ height: '0.5rem' }}/>
			<div className='pane-settings-list'>
				{ list }
			</div>
		</div>;
	}

}

module.exports = Settings;
