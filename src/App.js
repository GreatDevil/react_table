import React, { Component }	from 'react';
import Request				from "./Request";
import Description			from "./Description";
import UserList				from "./UserList";
import ButtonNav			from "./ButtonNav";
import Loader				from "./Loader/Loader";
import AddData			from "./AddData";
const	smallData = 'http://www.filltext.com/?rows=32&id=' +
	'{number|1000}&firstName={firstName}&lastName={lastName}&email=' +
	'{email}&phone={phone|(xxx)xxx-xx-xx}&address=' +
	'{addressObject}&description={lorem|32}';
const	bigData = 'http://www.filltext.com/?rows=1000&id=' +
	'{number|1000}&firstName={firstName}&delay=3&lastName=' +
	'{lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address=' +
	'{addressObject}&description={lorem|32}';

let		stateSort ={
	'id':			'■',
	'firstName':	'■',
	'lastName':		'■',
	'email':		'■',
	'phone':		'■',
	'change': (f) => {
		let seq = stateSort[f];
		Object.keys(stateSort).map(fld => stateSort[fld] = '■');
		stateSort[f] = (seq === '▲') ? '▼' : '▲'
	}
}

Object.defineProperty(stateSort, "change", {enumerable: false});

function sortPage(arr, field, seq) {
	let i = (seq === '▲') ? -1 : 1;
	arr.sort((a, b) => a.props.user[field] < b.props.user[field] ? i : ~i);
}

function comparator(j, text) {
	let str = "";
	let arr = Object.keys(stateSort);
	for (let i in j.props.user)
	{
		if (arr.indexOf(i) === -1)
			break;
		str += j.props.user[i];
	}
	return (str.indexOf(text + "") !== -1) ? 1 : 0;
}

function searchPage(arr, text) {
	let result = [];
	if (text === "")
		return arr;
	arr.forEach((i, idx) => {if (comparator(i, text)) result.push(arr[idx])});
	return result;
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {data: 0, load: 0, prev: 0, next: 0, shift: 0, sort: 0, text: ''};
		this.changeState = this.changeState.bind(this);
		this.changePage = this.changePage.bind(this);
		this.getPage = this.getPage.bind(this);
		this.input = React.createRef();
	}

	getPage(f) {
		let arr = [];
		let shift = this.state.shift;
		for (let i = shift; i - shift < 51 && this.state.data[i] != null; i++)
			arr.push(f(this.state.data[i]));
		if (this.state.sort)
			sortPage(arr, this.state.sort, stateSort[this.state.sort]);
		return searchPage(arr, this.state.text);
	}

	changePage(target) {
		let i = (target === "prev") ? -1 : 1;
		this.input.current.value = '';
		this.setState({text: '', shift: this.state.shift + 50 * i});
	}

	changeState(arr, extra){
		this.setState(arr);
		if (extra)
			stateSort.change(arr.sort);
	}

	render(){
		const data  = this.state.data;
		let text = this.state.text;
		return	(this.state.load) ? <Loader/> :
			<div className="App">
				<button onClick={() => Request(smallData, (a, b) => this.changeState(a, b))}>маленький набор данных</button>
				<button onClick={() => Request(bigData, (a, b) => this.changeState(a, b))}>большой набор данных</button><br/>
				{data ? <input type="text" size="40" ref={this.input} onChange={(e) => text = e.target.value}/> : null}
				{data ? <button onClick={() => this.changeState({text: text})}>найти</button> : null}<br/>
				<AddData data={data} add={this.state.add} changeState={this.changeState}/>
				<ButtonNav target={"prev"} state={this.state.shift > 0} changePage={this.changePage}/>
				<ButtonNav target={"next"} state={this.state.data.length > this.state.shift + 50} changePage={this.changePage}/>
				<UserList data={data} stateSort={stateSort} changeState={this.changeState} getPage={this.getPage}/>
				<Description describe = {this.state.descr}/>
			</div>
	}
}

export default App;