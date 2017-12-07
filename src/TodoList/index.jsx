import React from 'react';

const TodoList = ({todos,handleAddList,handleDone,handleEditButton,handleMinList,handleEditInput,handleAll,handleActive ,handleCompleted}) => {

	const todolists = todos.map((todo) => 
		<li key={todo.todone.toString()}>
			<input 
			  name="isDone"
			  id={todo.todone}
			  type="checkbox" 
			  checked={todo.isDone} 
	  		  onChange={() => handleDone(todo)}
	  		/>
			{todo.isEdit 
				? 
				<input name="isEdit" type="text" value={todo.todone} 
				  onChange={() => handleEditInput(todo)}/> 
				: 
				<label htmlFor={todo.todone}>{todo.todone}</label>
			}
			{todo.isEdit ? <button>Save</button> : <button onClick={() => handleEditButton(todo)}>			Edited</button>}
			{todo.isEdit ? <button>Cancel</button> : <button onClick={() => handleMinList(todo)}>删除</button>}

		</li>
	);
						
					
	const doneCount = todos.filter(todo =>!todo.isDone).length;	


			
	return(
		<div>
			<input name="isAdd" type="text" placeholder="What needs to be done" onKeyUp={handleAddList}/>
			{console.log(todos)}
			<ul style={{listStyle:'none'}}>{todolists}</ul>
			<span>{doneCount}items left</span>
			<button onClick={() => handleActive("all")}>All</button>
			<button onClick={() => handleActive("active")}>Active</button>
			<button onClick={() => handleActive("comp")}>Completed</button>
		</div>
	);
}

class TodoContainer extends React.Component {

	constructor(props){
		super(props);

		this.origintodos = [
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
			];
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
			console.log("++++",e);
			let sdo = e.target.value;
			for(let todo of todos){
				if(sdo === todo.todone || sdo===""){
					alert("ss");
					e.target.value="";
					return null;
				}
			}
			
			this.origintodos = todos.concat([{todone:sdo,isDone:false,isEdit:false}]);
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
    	
    	this.origintodos = todos.filter((todo) => {
    		return minus.todone !== todo.todone;
    	});

    	//todos = todos.filter((todo) => {
    	//	return minus.todone !== todo.todone;
    	//});	//previous no return  当删除其中一个时会全部删除 why?

    	console.log({todos});	

    	this.setState(prevState => ({
    		todos: prevState.todos.filter(todo => {
    			return minus.todone !== todo.todone; //previous no return  当删除其中一个时会全部删除 why?
    		})
    	}));
    	
    	//this.setState({todos});
    }


//EditButton
    handleEditButton = (edit) =>{
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

	handleEditInput = (edited,e) => {
		let todos = this.state.todos;
		console.log("--------",e);
		//const target = e.target;
		//const value = target.value;
		const {value} = e.target;

		
		for(let todo of todos){
			if(todo === edited){
				
				todo.todone =  value;
				
				break;
			}
		}
		
		this.setState({todos});
		
	}

//handleAll
	

	handleActive = (type) => {
		
		let todos = this.state;
		let handleTodos = [];
		console.log("tttypey",type);
		console.log("ttttt",this.origintodos);
		if(type === "all"){
			alert("all");
			handleTodos = this.origintodos;
		}else if(type === "active"){
			alert("active");
			handleTodos = this.origintodos.filter(todo => !todo.isDone);
		}else if(type === "comp"){
			alert("comple");
			handleTodos = this.origintodos.filter(todo => todo.isDone);
		}
		
		this.setState({todos: handleTodos});
		
		//let activeTasks = todos.filter(todo => todo.todone === "ss");
		//this.setState({todos: activeTasks});
		//todos.filter is not a function(i don not know why,but i suddenly think is preState,try it,success)
	}


//handleCompleted



	render(){
		return(
			<TodoList
				todos={this.state.todos}
				handleAddList={this.handleAddList} 
				handleDone={this.handleDone}
				handleMinList={this.handleMinList}
				handleEditButton={this.handleEditButton}
				handleEditInput={this.handleEditInput}
				handleAll={this.handleAll}
				handleActive={this.handleActive}
				handleCompleted={this.handleCompleted}
			 />
		);
	}
}

export default TodoContainer;