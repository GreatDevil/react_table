import React from "react";

function Description(props){
	return props.describe ?
		<div>
			<div>Выбран пользователь <b>{props.describe.firstName} {props.describe.lastName}</b></div>
			<div>Описание:<br/>
			<textarea>
			{props.describe.description}
			</textarea>
			</div>
			<div>Адрес проживания: <b>{props.describe.address.streetAddress}</b></div>
			<div>Город: <b>{props.describe.address.city}</b></div>
			<div>Провинция/штат: <b>{props.describe.address.state}</b></div>
			<div>Индекс: <b>{props.describe.address.zip}</b></div>
		</div> :
	null;
}

export default Description;