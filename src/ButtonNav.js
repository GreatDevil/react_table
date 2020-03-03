import React from "react";

function ButtonNav(props) {
	return (props.state) ?
		<button onClick={() => props.changePage(props.target)}>{props.target}</button>
		: null;
}

export default ButtonNav;