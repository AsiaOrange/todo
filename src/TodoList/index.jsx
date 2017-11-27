import React from 'react';

const TodoList = ({todos,handleAddList,handleDone }) => {

	const todolists = todos.map((todo) => 
		<li key={todo.todone.toString()}>
			<input 
			  type="checkbox" 
			  checked={todo.isDone} 
	  		  onChange={() => handleDone(todo)}
	  		/>
			<span>{todo.todone}</span>
		</li>
	);
						
					
				

			
	return(
		<div>
			<input  type="text" placeholder="What needs to be done" onKeyUp={handleAddList}/>
			{console.log(todos)}
			<ul style={{listStyle:'none'}}>{todolists}</ul>
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
	handleAddList = (e) => {
		if(e.keyCode === 13){
			let todos = this.state.todos;
			let sdo = e.target.value;
			for(let todo of todos){
				if(sdo === todo.todone || sdo===""){
					alert("ss");
					e.target.value="";
					return null;
				}
			}
			
			
				todos = todos.concat([{todone:sdo,isDone:false}]);
				//use push 报错“map is not a function” try to use concat success
				console.log({todos});
				this.setState({todos});
				console.log({todos});
				e.target.value = ""; 
			
		}
	}

//toggleDone
	handleDone = (edited) => {
		let todos = this.state.todos;
		for(let todo of todos){
			if(edited.todone === todo.todone){
				todo.isDone = !todo.isDone;
				this.setState({todos:todos});
				break;
			}
		}
		
	}



	render(){
		return(
			<TodoList
				 todos={this.state.todos}
				 handleAddList={this.handleAddList} 
				 handleDone={this.handleDone}

			 />
		);
	}
}

export default TodoContainer;