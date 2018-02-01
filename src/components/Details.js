import React, { Component } from 'react'
import {connect } from 'react-redux'
import { getToDo, addToDo, deleteTask, toggleComplete, edit } from '../ducks/reducer'
import { Link } from 'react-router-dom'


class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            inputValueDesc: '',
            showEdit: false,
            showEditDesc: false,
            title: ''
        }
        this.del=this.del.bind(this)
        this.toggle=this.toggle.bind(this)
        this.edit=this.edit.bind(this)
        this.editDesc=this.editDesc.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getToDo().then(response => {
            this.props.toDos.forEach(e => {
                if((e.id * 1) === (this.props.match.params.id * 1)){
                    this.setState({
                        id: e.id,
                        inputValue: e.title,
                        inputValueDesc: e.description,
                        complete: e.completed
                    })
                }
            })
        })
    }

    del(id){
        this.props.deleteTask(id).then( response => {
            this.props.history.push("/")
        })
    }

    toggle(id){
        this.props.toggleComplete((id),{completed: true})
        .then( response => {
            this.props.history.push("/")
         })
     }

     edit(){
         this.setState({
             showEdit: true
         })
     }
     editDesc(){
         this.setState({
             showEditDesc: true
         })
     }

     handleInput(value){
         console.log(value)
        this.setState({
            inputValue: value
        })
     }

     handleInputDesc(value){
         console.log(value)
        this.setState({
            inputValueDesc: value
        })
     }

     onSubmit(){
         console.log('button')
         this.props.edit(this.props.match.params.id,{
            title: this.state.inputValue,
            description: this.state.inputValueDesc
         }).then( response => {
             this.props.history.push("/")
         })
     }
     
   

    render() {
      
        return (
            <div>
                 <div style={boxWrapper} key={this.state.id}>
                        <Link style={back} to="/"><div>Back to Tasks</div></Link>
                            <div style={task}>Task</div>
                            <div style={flex}>
                            {!this.state.showEdit && 
                                <div onClick={this.edit} style={detailsTitle}>{this.state.inputValue}</div>
                                }
                            {this.state.showEdit && <div>
                                <input style={input}
                                    value={this.state.inputValue} 
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) =>this.handleInput(e.target.value)}/>
                                </div>}
                           
                                <div onClick={() =>this.toggle(this.state.id)} style={completed}>Complete</div>
                            </div>
                            <div style={task}>Description</div>
                            {!this.state.showEditDesc && <div onClick={this.editDesc}  style={this.state.inputValueDesc ? inputPlaceholder : inputBlank}>
                            <div>{this.state.inputValueDesc}</div></div>
                            }
                            {this.state.showEditDesc &&  <div>
                                <input style={input}
                                    value={this.state.inputValueDesc}
                                    onChange={(e) =>this.handleInputDesc(e.target.value)}/>
                                </div>}
                            <div style={flex}>
                                <div onClick={this.onSubmit} style={save}>Save</div>
                                <Link className="noDecor" to="/"><div style={cancel}>Cancel</div></Link>
                                <div onClick={() =>this.del(this.state.id)}style={del}>Delete</div>
                            </div>
                        </div>  
            </div>
        )
    }
}

const back = {
    fontSize: '9pt',
    color: 'black',
    textDecoration: 'none',
    padding: '10px'
}
const completed = {
    padding: '5px 8px',
    display: 'inline-block',
    fontSize: '10pt',
    backgroundColor: '#cdcbcd',
    cursor: 'pointer'
}

const task = {
    fontSize: '8pt',
    color: '#00ffff',
    paddingTop: '20px'
}

const detailsTitle = {
    color: 'black',
    padding: '5px 0px',
    width: '30vw',
    fontSize:'16pt',
    cursor: 'pointer',
    borderBottom: '1px solid #00ffff',
}

const boxWrapper = {
    boxShadow: '4px 9px 23px 2px rgba(0,0,0,0.19)',
    padding: '20px',
    width: '40vw',
    margin: '20px auto'
  }



const flex = {
    display: 'flex',
	flexDirection: 'row',
	flexWrap: 'nowrap',
	justifyContent: 'space-between',
	alignItems: 'baseline',
	alignContent: 'stretch'
}

const save = {
    padding: '7px 10px',
    marginTop: '10px',
    backgroundColor: '#00ffff',
    color: 'white',
    fontSize: '10pt',
    cursor: 'pointer'
}
const cancel = {
    padding: '7px 10px',
    marginTop: '10px',
    backgroundColor: '#cdcbcd',
    fontSize: '10pt',
    cursor: 'pointer'
}
const del = {
    padding: '7px 10px',
    marginTop: '10px',
    backgroundColor: '#e8584a',
    color: 'white',
    fontSize: '10pt',
    cursor: 'pointer'
}

const input = {
    outline: 'none',
    border: 'none',
    borderBottom: '1px solid #00ffff',
    fontSize: '16pt',
    paddingTop: '8px',
    width: '50vh',
}
const inputPlaceholder = {
    borderBottom: '1px solid #00ffff',
    fontSize: '16pt',
    cursor: 'pointer',
    paddingTop: '15px'
}

const inputBlank = {
    borderBottom: '1px solid #00ffff',
    cursor: 'pointer',
    padding: '18px 0',

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
    toggleComplete: toggleComplete,
    edit: edit
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
