import React from 'react';

import Display from '../ui/display';
import Panes from '../ui/panes';
import Layouts from '../ui/layouts';

class Editor extends React.Component {

	constructor(props) {
		super(props);

		// Initialize notification for leaving page.
		window.onbeforeunload = () => {
			return 'Are you sure you want to leave the page? You may have unsaved changes.';
		};
	}

	render() {
		return <div>
			<Display
				state={ this.props.state }/>
            <div style={{ display: 'flex' }}>
                <Panes
				    state={ this.props.state }/>
                <Layouts 
                    state={ this.props.state }/>
            </div>
		</div>;
	}

}

export default Editor;
