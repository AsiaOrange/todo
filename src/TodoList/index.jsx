import React from 'react';

const TodoList = ({todos,handleList,handleDone }) => {

	const todolists = todos.map((todo) => 
						<li key={todo.todone.toString()}>
							<input 
							  type="checkbox" 
							  checked={todo.isDone} 
					  		  onClick={() => handleDone(todo)}
					  		/>
							<span>{todo.todone}</span>
						</li>
						
					);
				

			
	return(
		<div>
			<input  type="text" placeholder="What needs to be done" onClick={handleList}/>
			{console.log(todos)}
			<ul>{todolists}</ul>
			<span>items left</span>
			<button>All</button>
			<button>Active</button>
			<button>Completed</button>
		</div>
	);
}

class TodoContainer extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			todos: [
				{
					todone: "ss",
					isDone:false
				},
				{
					todone:"ax",
					isDone:false
				},
			],
		};
	}
// because do not know state 什么时候更新了  所以有个prevState 但是似乎不能做修改 官方给出的例子是获取 
//所以先把this.state的值获取到

// 添加任务
	handleList = (e) => {
	
		let sdo = e.target.value;
		console.log(this.state.todos);
		let addItem = this.state.todos.push({todone: sdo,isDone:false});
		this.setState({todos: addItem});
		e.target.value = ""; 
	}

	handleDone = (edited) => {
		for(let {todone,isDone} of this.state.todos){
			if(edited.todone === todone){
				this.setState((prevState) => ({
					isDone: !prevState.isDone}))
			}
		}
		
	}

	render(){
		return(
			<TodoList todos={this.state.todos} handleList={this.handleList} 
			   handleDone={this.handleDone}/>
		);
	}
}

export default TodoContainer;