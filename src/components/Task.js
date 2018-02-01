import React, { Component } from 'react'
import {connect } from 'react-redux'
import { getToDo, addToDo, deleteTask, toggleComplete } from '../ducks/reducer'
import { Link } from 'react-router-dom'


import './style.css'




class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
           completed: this.props.completed
        }

        this.del=this.del.bind(this)
        this.toggle=this.toggle.bind(this)
    }


    toggle(id){
        this.props.toggleComplete((id),{completed: true})
        .then( response => {
            this.props.getToDo()
         })
     }
 
     del(id){
        this.props.deleteTask(id).then( response => {
            this.props.getToDo()
        })
    }

    render() {
        
        return (
            <div>
            <div className="flex">
                     <div key={this.props.id}>
                        <div style={list} className={this.props.completed ? "blue" : null}>
                            <Link className="noDecor" to={`/details/${this.props.id}`}><div className={this.props.completed ? "strike" : null}>{this.props.title}</div></Link>
                            <div style={space}></div>
                            <div style={complete} onClick={() =>this.toggle(this.props.id)}>Complete</div>
                            <span style={del} onClick={() =>this.del(this.props.id)}>X</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

  const list = {
    boxShadow: '-1px 1px 6px 2px rgba(0,0,0,0.18)',
    padding: '4px 10px',
    margin: '10px',
    display: 'flex',
	flexDirection: 'row',
	flexWrap: 'nowrap',
	justifyContent: 'space-between',
	alignItems: 'stretch',
    alignContent: 'stretch',
    width: '35vw'
}


const space = {
    width: '19px'
}
const complete = {
    background : 'rgba(153, 153, 153, 1)',
    opacity : '0.59',
    padding: '3px 5px',
    fontSize: '10pt',
    cursor: 'pointer'
}
const del = {
    cursor: 'pointer'
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

export default connect(mapStateToProps, mapDispatchToProps)(Task)


