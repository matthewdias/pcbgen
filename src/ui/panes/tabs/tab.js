import React from 'react';
import classNames from 'classnames';

class Tab extends React.Component {

	render() {
		const className = classNames(
			'panes-tab',
			{
				'selected': this.props.selected
			});

		return <div
			className={ className }
			onClick={ this.props.onClick }>
			{ this.props.children }
		</div>;
	}

}

export default Tab;
