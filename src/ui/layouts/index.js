import React from 'react';
import classNames from 'classnames';

import C from '../../const';

class Layouts extends React.Component {

	constructor(props) {
		super(props);

        Object.keys(props.state.keyboard.layouts)
            .forEach((layout) =>
                props.state.ui.set(`layout:${layout}`, props.state.keyboard.layouts[layout][0])
            )
	}

	render() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		return <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
			<h4>LAYOUTS&nbsp;&nbsp;&nbsp;</h4>
            {Object.keys(keyboard.layouts).map((layout) => (
                <div key={layout}>
                    <h4>{layout}</h4>
                    <select
                        style={{ width: '10rem', marginBottom: '1rem' }}
                        value={ state.ui.get(`layout:${layout}`) }
                        onChange={ e => state.ui.set(`layout:${layout}`, e.target.value)}>
                        {keyboard.layouts[layout].map((layoutOption) => (
                            <option key={layoutOption} value={layoutOption}>{layoutOption}</option>
                        ))}
                    </select>
                </div>
            ))}
			<br/><br/>
		</div>;
	}

}

export default Layouts;
