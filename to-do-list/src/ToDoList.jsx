import React,{useState} from 'react';

function ToDoList(){
    const [tasks,setTasks]=useState([]);
    const [newTask,setNewTask]=useState("");
    const [checked, setChecked] = useState({}); 

    function handleInputChange(event){
        setNewTask(event.target.value);
        
    }

    function addTask(){
        if(newTask.trim()!==""){
            setTasks(t=>[...t,newTask]);
            setChecked(prevState => ({ ...prevState, [tasks.length]: false }));
            setNewTask("");
        }
    }

    function handleChange(index) {
        setChecked(prevState => ({
            ...prevState,
            [index]: !prevState[index] // Toggle checkbox state
        }));
    }

    function deleteTask(index){
        const updatedTasks= tasks.filter((_,i)=>i!==index);
        setTasks(updatedTasks);
        
        
    }

    function moveTaskUp(index){
        if(index>0){
            const updatedTasks=[...tasks];
            [updatedTasks[index],updatedTasks[index-1]]= [updatedTasks[index-1],updatedTasks[index]]
            setTasks(updatedTasks);
            
            const updatedChecked = { ...checked };
            [updatedChecked[index], updatedChecked[index - 1]] = [updatedChecked[index - 1], updatedChecked[index]];
            setChecked(updatedChecked);
            
        }

    }

    function moveTaskDown(index){
        if(index < tasks.length-1){
            const updatedTasks=[...tasks];
            [updatedTasks[index],updatedTasks[index+1]]= [updatedTasks[index+1],updatedTasks[index]]
            setTasks(updatedTasks);
            
            const updatedChecked = { ...checked };
            [updatedChecked[index], updatedChecked[index + 1]] = [updatedChecked[index + 1], updatedChecked[index]];
            setChecked(updatedChecked);
        }

    }
        return (
        <div className='to-do-list'>
            <h1>To Do List</h1>
            <div>
                <input 
                type="text" 
                placeholder="Enter a task..." 
                value={newTask}
                onChange={handleInputChange}/>
                <button className='add-button' onClick={addTask}>Add</button>
            </div>
            <ol>
                {tasks.map((task,index)=>
                    <li key={index}>
                        
                        <span className="text">{task}</span>
                        <input type = "checkbox" checked={checked[index] || false} onChange = {() => handleChange(index)}  />
                        <button className="delete-button" onClick={()=>deleteTask(index)}>
                            Delete
                        </button>
                        <button className="move-button" onClick={()=>moveTaskUp(index)}>
                            Up⬆️
                        </button>
                        <button className="move-button" onClick={()=>moveTaskDown(index)}>
                            Down⬇️
                        </button>

                    </li>)}
            </ol>


            
        </div>)
}
export default ToDoList;