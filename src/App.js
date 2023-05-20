import React, {useState, useEffect} from "react";
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './Todo';
import {db} from './firebase'
import {
  query,
  collection, 
  onSnapshot, 
  updateDoc, 
  doc,
  addDoc,
  deleteDoc
} from 'firebase/firestore'

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#008080] to-[#C0C0C0]`,
  container: `bg-slate-100 max-w-[500px] w-full n-auto rounded-md shadow-xl p-4`,
  heading: `text.3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-silver-500 text-slate-100`,
  count: `text-center p-2`
};

function App() {
const [todos, setTodos] = useState([]);
const [todoField, setTodoField] = useState('');


//Create todo
const createTodo = async (e) => {
  e.preventDefault(e);
  if(todoField === '') {
    alert('Please enter valid todo')
    return
  }

  await addDoc(collection(db, 'todos'), {
    text: todoField,
    completed: false,
  })
  setTodoField('')
};
//Read todo from firebase
useEffect(()=>{
  const q = query(collection(db, 'todos'))
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let todosArr = []
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
    
      todosArr.push({...doc.data(), id: doc.id})
    });
    console.log(todosArr)
    setTodos(todosArr)
  });
  return () => unsubscribe()
},[])

//Update todo in firebase 
const toggleComplete = async (todo) => {
  await updateDoc(doc(db, 'todos', todo.id),{
    completed: !todo.completed
  })
}
//Delete todo
const deleteTodo = async (id) => {
  await deleteDoc(doc(db, 'todos', id))
}

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input 
          value={todoField} 
          onChange={(e) => setTodoField(e.target.value)} 
          className={style.input} 
          type="text" 
          placeholder='Type Here' 
          />
          <button type="button" className={style.button}><AiOutlinePlus size={50} /></button>
        </form>
        <ul>
          {todos.map((todo, index)=>
        <Todo 
        key={index} 
        todo={todo} 
        toggleComplete={toggleComplete} 
        deleteTodo={deleteTodo} 
        /> 
          )}
        </ul>

        {todos.length < 1 ? null :  ( <p className={style.count}>{`You have ${ todos.length} todos`}</p>
        )}

      </div>
    </div>
  );
}

export default App;
