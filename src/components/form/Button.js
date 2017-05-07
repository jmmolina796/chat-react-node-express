import React from "react";

export default class Button extends React.Component {
	render() {
		const buttonType = ["default", "accept", "cancel", "emphasis"];
		let typeButton = "button-";
		typeButton += ( buttonType.indexOf(this.props.type) != -1 ? this.props.type : "default" );

		return (
			<div className={typeButton} onClick={this.props.onClick}>
				{this.props.children}
			</div>
		);
	}

}