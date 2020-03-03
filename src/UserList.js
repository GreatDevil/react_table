import React from "react";

let stSort;

function UserList(props){
	stSort = Object.keys(props.stateSort);
	let click = (field) => props.changeState({sort: field}, 1);
	return props.data !== 0 ?
		<div class='table'>
			<div class = 'row'>
				{stSort.map(field => <div className='cell1' onClick={click.bind(null,field)}>
				<p>{field}</p>
				<p>{props.stateSort[field]}</p>
			</div>)}
		</div>
		{props.getPage((dataUser) => <GetRow user={dataUser} props={props}/>)}
		</div> : null;
}

function GetRow(props){
	let click = props.props.changeState.bind(null, {descr: props.user}, null);
	return	<div className='row' onClick={click}>
				{stSort.map(field => <div className='cell'>{props.user[field]}</div>)}
			</div>
}

export default UserList;