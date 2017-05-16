import React from "react";

export default class ValidatedInput extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		
		const type = this.props.type;
		const value = e.target.value;
		let error = null;

		if (this.props.type == "text" || this.props.type == "password") {
			const regularExpressions = {
				name: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,}$/u,
				last_name: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,}$/u,
				email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
			}
			const reg = regularExpressions[this.props.validation];
			
			if (reg !== undefined && reg.test(value)) {
				error = false;
			} else {
				error = true;
			}
		}
		if (this.props.type == "file") {
			const format = value.substring(value.lastIndexOf("."));
			const reg = this.props.validation.split(",");
			if (reg.indexOf(format) != -1) {
				error = false;
			} else {
				error = true;
			}
		}

		this.props.onChange(error, e.target);
	}

	render() {
		let element = null;
		if (this.props.type == "text" || this.props.type == "password") {
			element = (
				<input
					type={this.props.type}
					name={this.props.name}
					value={this.props.value}
					placeholder={this.props.placeholder}
					onChange={this.handleChange}
					style={ {border: (this.props.error ? "red solid 1px" : "") } } />
			);
		} else if(this.props.type == "file") {
			if (this.props.value.trim().length == 0) {
				element = (
					<input
						type={this.props.type}
						name={this.props.name}
						accept={this.props.validation}
						onChange={this.handleChange}
						style={ {border: (this.props.error ? "red solid 1px" : "") } } />
				);
			} else {
				element = (
					<div className="imgInput">
						<img src={this.props.value} alt="#" />
						<span onClick={this.props.onDelete}>X</span>
					</div>
				);
			}
		}

		return (
			<div className="validated_input">
				{element}
			</div>
		);
	}
}