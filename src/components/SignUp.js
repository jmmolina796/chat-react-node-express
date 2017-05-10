import React from "react";
import ValidatedInput from "./form/ValidatedInput";
import Button from "./form/Button";
import Subtitle from "./Subtitle";

export default class SignUp extends React.Component {
	constructor(props) {
		super(props);
		
	}
	render() {
		return (
			<div className="sign_up">
				<Subtitle>HEY</Subtitle>
				<ValidatedInput 
					type="text"
					name="name"
					placeholder="Name:"
					validation="name"
					onChange={this.props.onChange} />
				<ValidatedInput 
					type="text"
					name="last_name"
					placeholder="Last name:"
					validation="last_name"
					onChange={this.props.onChange} />
				<ValidatedInput 
					type="file"
					name="last_name"
					placeholder="Last name:"
					validation=".png, .jpg, .jpeg"
					onChange={this.props.onChange} />
				<Button type="emphasis" onClick={click}>
					hey
				</Button>
			</div>
		);	
	}
}