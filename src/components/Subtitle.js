import React from 'react';

export default class Subtitle extends React.Component {
	render() {
		return (
			<h2>{this.props.children}</h2>
		);
	}
}