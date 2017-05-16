import React from "react";
import axios from 'axios';

export default class ChatContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		axios.get("/person/"+this.props.userId)
		.then((res) => {
			debugger;
		})
		.catch((err)=>{

		});
	}

	render() {
		return (
			<div className="chatContainer">{this.props.children}</div>
		);
	}
}