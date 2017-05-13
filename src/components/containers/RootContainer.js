import React from "react";
import SectionContainer from "./SectionContainer";
import ChatContainer from "./ChatContainer";


export default class RootContainer extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			url: "signin",
			user: []
		}

		this.singIn = this.singIn.bind(this);
	}

	singIn(data) {
		this.setState({url: "chat", user: data});
	}

	render() {
		let element = null;
		if (this.state.url == "signup" || this.state.url == "signin") {
			element = <SectionContainer singIn={this.singIn} url={this.state.url} />;
		} else if(this.state.url == "chat") {
			element = <ChatContainer user={this.state.user} url={this.state.url}>HEY</ChatContainer>;
		}
		return (
			<div id="rootContainer">
				{element}
			</div>
		);
	}
}