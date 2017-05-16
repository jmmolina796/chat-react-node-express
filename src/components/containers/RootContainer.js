import React from "react";
import SectionContainer from "./SectionContainer";
import ChatContainer from "./ChatContainer";


export default class RootContainer extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			url: "signin",
			userId: ""
		}

		this.singIn = this.singIn.bind(this);
		this.goSignUp = this.goSignUp.bind(this);
		this.cancel = this.cancel.bind(this);
	}

	singIn(data) {
		this.setState({url: "chat", userId: data[0].id_person});
	}

	goSignUp() {
		this.setState({url:"signup"});
	}

	cancel() {
		this.setState({url:"signin"});
	}

	render() {
		let element = null;
		if (this.state.url == "signup" || this.state.url == "signin") {
			element = <SectionContainer cancel={this.cancel} goSignUp={this.goSignUp} singIn={this.singIn} url={this.state.url} />;
		} else if(this.state.url == "chat") {
			element = <ChatContainer userId={this.state.userId} url={this.state.url} />;
		}
		return (
			<div id="rootContainer">
				{element}
			</div>
		);
	}
}