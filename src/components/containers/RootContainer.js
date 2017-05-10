import React from "react";
import SectionContainer from "./SectionContainer";
import ChatContainer from "./ChatContainer";


export default class RootContainer extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			url: "signin"
		}
	}

	render() {
		let element = null;
		if (this.state.url == "signup" || this.state.url == "signin") {
			element = <SectionContainer url={this.state.url} />
		} else if(this.state.url == "chat") {
			<ChatContainer url={this.state.url} />
		}
		return (
			<div id="rootContainer">
				{element}
			</div>
		);
	}
}