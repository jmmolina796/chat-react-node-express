import React from "react";

export default class SectionContainer extends React.Component {
	render() {
		return (
			<div className="sectionContainer">{this.props.children}</div>
		)
	}
}