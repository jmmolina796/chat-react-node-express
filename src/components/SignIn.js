import React from "react";
import ValidatedInput from "./form/ValidatedInput";
import Button from "./form/Button";
import Subtitle from "./Subtitle";
import axios from "axios";

export default class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: {value: "", error: false},
			password: {value: "", error: false}
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

		if(this.state.email.value.trim() == "" || this.state.email.error) {
			changes.email = {value: this.state.email.value, error: true};
			error = true;
		}
		if(this.state.password.value.trim() == "" || this.state.password.error) {
			changes.password = {value: this.state.password.value, error: true};
			error = true;
		}

		if (error) {
			this.setState(changes);
		} else {
			
			axios.post("/person", {
				"hey":"Im"
			})
			.then((res) => {
				debugger;
			})
			.catch((err) => {
				debugger;
			});

		}


	}

	render() {
		return (
			<div className="sign_in">
				<Subtitle>Sign In</Subtitle>
				<div className="formContainer">
					<ValidatedInput 
						type="text"
						name="email"
						value={this.state.email.value}
						error={this.state.email.error}
						placeholder="E_mail:"
						validation="email"
						onChange={this.handleChange} />
					<ValidatedInput 
						type="password"
						name="password"
						value={this.state.password.value}
						error={this.state.password.error}
						placeholder="Password:"
						validation="password"
						onChange={this.handleChange} />
				</div>
				<div className="buttonContainer">
					<Button type="accept" onClick={this.handleClick}>
						Sign In
					</Button>
				</div>
				<div className="buttonContainer">
					<Button type="emphasis" onClick={this.handleClick}>
						Sign Up
					</Button>
				</div>
			</div>
		);	
	}
}