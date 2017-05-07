import React from "react";

export default class RootContainer extends React.Component {
	render() {
		return (
			<div className="rootContainer">{ this.props.children }</div>
		);
	}
}