import React, { Component }	from 'react';

let inputData = {
	'id':			'',
	'firstName':	'',
	'lastName':		'',
	'email':		'',
	'phone':		''
}

class AddData extends Component{
	constructor(props) {
		super(props);
		this.state = {data: 0, add: false, obj: {}};
		this.props = props;
		this.checkFill = this.checkFill.bind(this);
		this.arrInput = Object.keys(inputData);
	}

	checkFill(field, e) {
		inputData[field] = e.target.value;
		for (let i in inputData)
			if (!inputData[i]) {
				this.setState({data: 0});
				return;
			}
		this.setState({data: 1});
	}

	addTable() {
		let obj = {};
		for (let i in inputData)
			obj[i] = inputData[i]
		obj.description = null;
		obj.address = {};
		obj.address.streetAddress = null;
		obj.address.city = null;
		obj.address.state = null;
		obj.address.zip = null;
		this.props.data.unshift(obj);
		for (let i in inputData)
			inputData[i] = "";
		this.props.changeState({data: this.props.data});
		this.setState({data: 0, add: false});
	}

	render() {
		return this.props.data ?
			<div>
				<button onClick={() => this.setState({add: true})}>добавить</button>
				{this.state.data ? <button onClick={() => this.addTable()}>Добавить в таблицу</button> : null}<br/>
				{this.state.add ?
					<table>
						{this.arrInput.map(field => <tr>
							<td>{field}</td>
							<td><input type="text" size="40" onChange={(e) => this.checkFill(field, e)}/></td>
						</tr>)}
					</table> : null}
			</div> : null
	}
}

export default AddData;