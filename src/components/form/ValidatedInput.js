import React from "react";

export default class ValidatedInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: false
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {

		if (this.props.type == "text") {
			const regularExpressions = {
				name: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,}$/u,
				last_name: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,}$/u,
				email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
			}
			const type = this.props.type;
			const name = this.props.name;
			const value = e.target.value;
			const reg = regularExpressions[this.props.validation];
			
			if (reg !== undefined && reg.test(value)) {
				this.setState({error: false});
			} else {
				this.setState({error: true});
			}
		}
		if (this.props.type == "file") {
			const value = e.target.value;
			const format = value.substring(value.lastIndexOf("."));
			const reg = this.props.validation.split(",");
			if (reg.indexOf(format) != -1) {
				this.setState({error: false});
			} else {
				this.setState({error: true});
			}
		}

		this.props.onChange(this.state.error, e.target);
	}

	render() {
		let element = null;
		if (this.props.type == "text") {
			element = (
				<input
					type={this.props.type}
					name={this.props.name}
					value={this.props.value}
					placeholder={this.props.placeholder}
					onChange={this.handleChange}
					style={ {border: (this.state.error ? "red solid 1px" : "") } } />
			)
		} else if(this.props.type == "file") {
			element = (
				<input
					type={this.props.type}
					name={this.props.name}
					accept={this.props.validation}
					onChange={this.handleChange}
					style={ {border: (this.state.error ? "red solid 1px" : "") } } />
			)
		}

		return element;
	}
}