import React from "react";
import ValidatedInput from "./form/ValidatedInput";
import Button from "./form/Button";
import Subtitle from "./Subtitle";

export default class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: {value: "", error: false},
			last_name: {value: "", error: false},
			file: {value: "", error: false}
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(error, element) {
		const name = element.name;
		const value = element.value;
		const state = {value: value, error, error};
		this.setState( { [name]: state } );
	}

	handleClick() {
		
		let changes = {};
		let error = false;

		if(this.state.name.value.trim() == "" || this.state.name.error) {
			changes.name = {value: this.state.name.value, error: true};
			error = true;
		}
		if(this.state.last_name.value.trim() == "" || this.state.last_name.error) {
			changes.last_name = {value: this.state.last_name.value, error: true};
			error = true;
		}
		if(this.state.file.value.trim() == "" || this.state.file.error) {
			changes.file = {value: this.state.file.value, error: true};
			error = true;
		}

		if (error) {
			this.setState(changes);
		} else {
			console.log(this.state.name.value)
			console.log(this.state.last_name.value)
			console.log(this.state.file.value)
			alert("peticion");
		}


	}

	render() {
		return (
			<div className="sign_in">
				<Subtitle>Sign In</Subtitle>
				<ValidatedInput 
					type="text"
					name="name"
					value={this.state.name.value}
					error={this.state.name.error}
					placeholder="Name:"
					validation="name"
					onChange={this.handleChange} />
				<ValidatedInput 
					type="text"
					name="last_name"
					value={this.state.last_name.value}
					error={this.state.last_name.error}
					placeholder="Last name:"
					validation="last_name"
					onChange={this.handleChange} />
				<ValidatedInput 
					type="file"
					name="file"
					value={this.state.file.value}
					error={this.state.file.error}
					placeholder="Last name:"
					validation=".png, .jpg, .jpeg"
					onChange={this.handleChange} />
				<Button type="emphasis" onClick={this.handleClick}>
					hey
				</Button>
			</div>
		);	
	}
}