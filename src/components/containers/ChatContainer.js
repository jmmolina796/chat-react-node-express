import React from "react";

export default class ChatContainer extends React.Component {
	render() {
		return (
			<div className="chatContainer">{this.props.children}</div>
		);
	}
}