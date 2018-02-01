import React, { Component } from 'react'
import {connect } from 'react-redux'
import { getToDo, addToDo, deleteTask, toggleComplete } from '../ducks/reducer'

import './style.css'
import Task from './Task'



class ToDo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            toDoList: [],
            toDos: [],
            complete: this.props.completed,
        }
        this.getToDoList=this.getToDoList.bind(this)
        this.add=this.add.bind(this)
        this.del = this.del.bind(this)
        this.toggle = this.toggle.bind(this)
        
    }


    handleInput(value){
        console.log(value)
        this.setState({
            title: value
        })
    }

    componentDidMount(){
        this.getToDoList()
        
    }
    
    getToDoList(){
        this.props.getToDo()
    }

    add(){
        this.props.addToDo({
            title: this.state.title
        }).then( response => {
            this.props.getToDo()
        }).then( () => {
            this.setState({
                title: ''
            })
        })
    }

    del(id){
        this.props.deleteTask(id).then( response => {
            this.props.getToDo()
        })
    }

   toggle(id){
       this.props.toggleComplete((id),{completed: true})
       .then( response => {
           this.props.getToDo()
        })
    }

    
    render() {
        
        return (
            <div>
                <div style={boxWrapper}>
                    <div style={todo}>To-Do:</div>
                    <input style={input} onChange={(e) => this.handleInput(e.target.value)} type="text" value={this.state.title}/>
                    <div style={button}><button onClick={this.add}>Add To Do</button></div>
                </div>
                <div>
                    <div style={boxWrapper}>
                {this.props.toDos.map(e => {
                    return(
                        <div key={e.id}>
                            <Task id={e.id} title={e.title} completed={e.completed} description={e.description}/>
                        </div>
                    )
                })}
                </div>
                </div>
            </div>
        )
    }
}

const boxWrapper = {
    boxShadow: '4px 9px 23px 2px rgba(0,0,0,0.19)',
    padding: '20px',
    width: '40vw',
    margin: '20px auto'
  }

const button = {
    padding: '10px 0'
}

const todo = {
    padding: '10px 0'
}

const input = {
    width: '100%',
    height: '25px',
    border: 'none',
    borderBottom: '1px solid black',
    outline: 'none',
    fontSize: '16pt'
}



function mapStateToProps(state) {
    return {
      
        toDos: state.toDos,
    }
}
const mapDispatchToProps = {

    getToDo: getToDo,
    addToDo: addToDo,
    deleteTask: deleteTask,
    toggleComplete: toggleComplete
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo)

