import React from 'react';

const TodoList = ({todos,handleAddList,handleDone,handleEditButton,handleMinList }) => {

	const todolists = todos.map((todo) => 
		<li key={todo.todone.toString()}>
			<input 
			  type="checkbox" 
			  checked={todo.isDone} 
	  		  onChange={() => handleDone(todo)}
	  		/>
			{todo.isEdit ? <input type="text" value={todo.todone} 
				/> : <span>{todo.todone}</span>}
			{todo.isEdit ? <button>Save</button> : <button onClick={() => handleEditButton(todo)}>Edited</button>}
			{todo.isEdit ? <button>Cancel</button> : <button onClick={() => handleMinList(todo)}>删除</button>}

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
					isDone:false,
					isEdit:false
				},
				{
					todone:"ax",
					isDone:false,
					isEdit:false
				},
			],
		};
	}
// because do not know state 什么时候更新了  所以有个prevState or 先获取

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
			
			
			todos = todos.concat([{todone:sdo,isDone:false,isEdit:false}]);
			//不能使用push因为他直接作用于原数组但state是immutable
			//slice,concat,filter会返回新数组
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
				break;
			}
		}
		this.setState({todos:todos});
		
	}


//删减任务
    handleMinList = (minus) => {
    	alert("Delete");
    	console.log({minus});
    	//先使用变量获取了state值也可以直接在this.setState()使用prevState
    	let todos = this.state.todos;
    	console.log({todos});
    	
    	todos = todos.filter((todo) => {
    		return minus.todone !== todo.todone;
    	});	//previous no return  当删除其中一个时会全部删除 why?

    	console.log({todos});	
    	
    	this.setState({todos});
    }


//EditButton
    handleEditButton = (edit,e) =>{
    	console.log("ss");
    	let todos = this.state.todos;
    	for(let todo of todos){
    		if(todo.todone === edit.todone){
    			todo.isEdit = true;
    			break;
    		}
    	}
    	this.setState({todos:todos});
    }

//EditInput




	render(){
		return(
			<TodoList
				todos={this.state.todos}
				handleAddList={this.handleAddList} 
				handleDone={this.handleDone}
				handleMinList={this.handleMinList}
				handleEditButton={this.handleEditButton}
				
			 />
		);
	}
}

export default TodoContainer;