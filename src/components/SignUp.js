import React from "react";
import ValidatedInput from "./form/ValidatedInput";
import Button from "./form/Button";
import Subtitle from "./Subtitle";
import axios from 'axios';

export default class SignUp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: {value: "", error: false},
			last_name: {value: "", error: false},
			e_mail: {value: "", error: false},
			password: {value: "", error: false},
			file: {value: "", error: false}
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleDeleteImageClick = this.handleDeleteImageClick.bind(this);
		this.handleSignUpClick = this.handleSignUpClick.bind(this);
	}

	handleChange(error, element) {
		const name = element.name;
		const value = element.value;
		const type = element.type;
		
		let state = null;

		if (type == "file" && !error) {
			const file = new FormData();
			file.append("file", element.files[0]);
			axios.post("/person/upload-image", file, { headers: {'Content-Type': 'multipart/form-data'} } )
			.then( (res) => {
				state = { value: res.data.name, error: error };
				this.setState({ [name]: state });
			})
			.catch( (err) => {
				alert("An error occurred on the server.");
			})
		} else {
			state = { value: value, error: error };
			this.setState({ [name]: state });
		}

	}
	
	handleDeleteImageClick() {
		const file = this.state.file.value;
		const id_file = file.substring(file.lastIndexOf("/")+1);
		const state = { value: "", error: false };

		axios.post("/person/delete-image/"+id_file)
		.then( (res) => {
			this.setState({ file: state });
		})
		.catch( (err) => {
			debugger;
		});
	}

	handleSignUpClick() {
		let changes = {};
		let error = false;

		if(this.state.name.value.trim() == "" || this.state.name.error) {
			changes.name = { value: this.state.name.value, error: true };
			error = true;
		}

		if(this.state.last_name.value.trim() == "" || this.state.last_name.error) {
			changes.last_name = { value: this.state.last_name.value, error: true };
			error = true;
		}

		if(this.state.e_mail.value.trim() == "" || this.state.e_mail.error) {
			changes.e_mail = { value: this.state.e_mail.value, error: true };
			error = true;
		}

		if(this.state.password.value.trim() == "" || this.state.password.error) {
			changes.password = { value: this.state.password.value, error: true };
			error = true;
		}

		if(this.state.file.value.trim() == "" || this.state.file.error) {
			changes.file = { value: this.state.file.value, error: true };
			error = true;
		}

		if (error) {
			this.setState(changes);
		} else {
			alert();
		}
	}

	render() {
		return (
			<div className="sign_up">
				<Subtitle>Sign Up</Subtitle>
				<ValidatedInput 
					type="text"
					name="name"
					placeholder="Name:"
					validation="name"
					value = {this.state.name.value}
					error = {this.state.name.error}
					onChange={this.handleChange} />
				<ValidatedInput 
					type="text"
					name="last_name"
					placeholder="Last name:"
					validation="last_name"
					value = {this.state.last_name.value}
					error = {this.state.last_name.error}
					onChange={this.handleChange} />
				<ValidatedInput 
					type="text"
					name="e_mail"
					placeholder="E-mail:"
					validation="email"
					value = {this.state.e_mail.value}
					error = {this.state.e_mail.error}
					onChange={this.handleChange} />
				<ValidatedInput 
					type="password"
					name="password"
					placeholder="Password:"
					validation="password"
					value = {this.state.password.value}
					error = {this.state.password.error}
					onChange={this.handleChange} />
				<ValidatedInput 
					type="file"
					name="file"
					placeholder="Image:"
					validation=".png, .jpg, .jpeg"
					value = {this.state.file.value}
					error = {this.state.file.error}
					onChange={this.handleChange}
					onDelete={this.handleDeleteImageClick} />
				<div className="buttonContainer" onClick={this.handleSignUpClick}>
					<Button type="emphasis">
						Sign Up
					</Button>
				</div>
				<div className="buttonContainer">
					<Button type="cancel" onClick={this.props.cancel}>
						Cancel
					</Button>
				</div>
			</div>
		);	
	}
}