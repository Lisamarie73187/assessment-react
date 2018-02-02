import axios from 'axios'

const initialState = {
    toDo: [],
    toDos: [],
    task: [],
    complete: []
  };
  
//   const ADDTODO = 'ADDTODO';
  const GETTODO = 'GETTODO';
  const DELETETASK = 'DELETETASK';
  const ADDTODO = 'ADDTODO';
  const TOGGLE = 'TOGGLE';
  const EDIT = 'EDIT';
 
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case EDIT + "_FULFILLED":
        return {...state, edit: action.payload}

      case TOGGLE + "_FULFILLED":
        return {...state, complete: action.payload}

      case ADDTODO + "_FULFILLED":
        return { ...state, toDo: action.payload };
      
      case GETTODO + "_FULFILLED":
        return { ...state, toDos: action.payload };
      
      case DELETETASK + "_FULFILLED":
        return {...state, task: action.payload};

      default:
        return state;
    }
  };


  export const edit = (id, body) => {
    console.log('reducer?')
    var request = axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, body).then(response => {
      if(response.data) {
        return response.data
      }
    })
    return {
      type: EDIT,
      payload: request
    }
  }
  
  export const deleteTask= (id) => {
    var request = axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(response => {
      if (response.data) {
        return response.data
      }
    })
    return {
      type: DELETETASK,
      payload: request,
    };
  };

  export const toggleComplete = (id, body) => {
    console.log(id, body)
    var request = axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`, body )
      .then(response => {
        if(response.data) {
          return response.data
        }
      })
      return {
        type: TOGGLE,
        payload: request
      }
  }

  export const addToDo=(body) => {
    var request = axios.post(`https://practiceapi.devmountain.com/api/tasks`, body).then(response => {
      if (response.data) {
        return response.data
      }
    })
    return {
      type: ADDTODO,
      payload: request,
    };
  };

  export var getToDo = () => {
    console.log('reducer')
    var request = axios.get('https://practiceapi.devmountain.com/api/tasks').then(response => {
      console.log(response)
      if(response.data){
        return response.data
      }
    })
    return {
      type: GETTODO,
      payload: request,
    }
  };

  