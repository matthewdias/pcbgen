import React from 'react';

import Editor from './editor';

import NumberBox from '../../elements/numberbox';

import C from '../../../const';

class Macros extends React.Component {

	render() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		const current = state.ui.get('macros-current', 0);

		return <div className='pane-keymap'>
			Select a macro to modify.
			<div style={{ height: '0.5rem' }}/>
			<NumberBox
				style={{ width: '3rem' }}
				value={ current }
				min='0'
				minus='chevron-down'
				plus='chevron-up'
				onChange={ v => state.ui.set('macros-current', v) }/>
			<div style={{ height: '1.5rem' }}/>
			Edit the macro.
			<div style={{ height: '0.5rem' }}/>
			<Editor
				key={ current }
				state={ state }/>
		</div>;
	}

}

export default Macros;
