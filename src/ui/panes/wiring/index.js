const React = require('react');

const NumberBox = require('ui/elements/numberbox');
const Help = require('ui/elements/help');

const C = require('const');

class Wiring extends React.Component {

	render() {
		const state = this.props.state;
		const keyboard = state.keyboard;
		const selected = keyboard.selected;

		return <div className='pane-wiring'>
			Change the number of rows and columns in the matrix.
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '4rem', marginRight: '0.5rem' }}>Rows</h2>
			<NumberBox
				style={{ width: '3rem' }}
				min={ 1 }
				value={ keyboard.rows }
				onChange={ v => keyboard.rows = v }/>
			<div style={{ height: '0.5rem' }}/>
			<h2 style={{ width: '4rem', marginRight: '0.5rem' }}>Columns</h2>
			<NumberBox
				style={{ width: '3rem' }}
				min={ 1 }
				value={ keyboard.cols }
				onChange={ v => keyboard.cols = v }/>
			<div style={{ height: '1.5rem' }}/>
			Change the position of the selected key in the matrix.
			<div style={{ height: '0.5rem' }}/>

			{(() => {
				if (selected) {
					return <div>
						<h2 style={{ width: '4rem', marginRight: '0.5rem' }}>Row</h2>
						<NumberBox
							style={{ width: '3rem' }}
							minus='chevron-up'
							plus='chevron-down'
							min='0'
							max={ keyboard.rows - 1 }
							value={ selected.row }
							onChange={ v => selected.row = v }/>
						<div style={{ height: '0.5rem' }}/>
						<h2 style={{ width: '4rem', marginRight: '0.5rem' }}>Column</h2>
							<NumberBox
								style={{ width: '3rem' }}
							minus='chevron-left'
							plus='chevron-right'
							min='0'
							max={ keyboard.cols - 1 }
							value={ selected.col }
							onChange={ v => selected.col = v }/>
					</div>;
				} else {
					return <h5>No key selected</h5>;
				}
			})()}
		</div>;
	}

}

module.exports = Wiring;
