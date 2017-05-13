import React from "react";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

export default class SectionContainer extends React.Component {

	render() {
		let element = null;
		if(this.props.url == "signin") {
			element = <SignIn singIn={this.props.singIn} />;
		} else if (this.props.url == "signup") {
			element = <SignUp />;
		}

		return (
			<div className="sectionContainer">
				{ element }
			</div>
		)
	}
}