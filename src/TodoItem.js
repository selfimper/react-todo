import React, { Component } from 'react';
import './TodoItem.css';
import { Button } from 'antd';
import { Checkbox } from 'antd';

export default class TodoItem extends Component {
    render(){
        return (
        <div className="TodoItem">
             <Checkbox type="checkbox" checked={this.props.todo.status === 'completed'}
           onChange={this.toggle.bind(this)}/>
             <span className="title">{this.props.todo.title}</span>
             <Button type="primary" onClick={this.delete.bind(this)}>删除</Button>
        </div>
          )
        }
        toggle(e){
        this.props.onToggle(e, this.props.todo)
    }
    delete(e){
        this.props.onDelete(e, this.props.todo)
    }
}
