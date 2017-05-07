import React from "react";
import ReactDOM from "react-dom";
import RootContainer from "./components/containers/RootContainer";
import SectionContainer from "./components/containers/SectionContainer";
import ValidatedInput from "./components/form/ValidatedInput";
import Button from "./components/form/Button";
import Subtitle from "./components/Subtitle";

function change() {}

function click() {alert();}

ReactDOM.render(
	<RootContainer>
		<SectionContainer>
			<Subtitle>HEY</Subtitle>
			<ValidatedInput 
				type="text"
				name="name"
				placeholder="Name:"
				validation="name"
				onChange={change} />
			<ValidatedInput 
				type="text"
				name="last_name"
				placeholder="Last name:"
				validation="last_name"
				onChange={change} />
			<ValidatedInput 
				type="file"
				name="last_name"
				placeholder="Last name:"
				validation=".png, .jpg, .jpeg"
				onChange={change} />
			<Button type="emphasis" onClick={click}>
				hey
			</Button>
		</SectionContainer>
	</RootContainer>,
	document.getElementById("app")
);