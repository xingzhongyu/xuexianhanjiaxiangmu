import React, { Component } from 'react'
import {connect} from 'react-redux'
import Userlist from '../../components/userlist/userlist'


import {getUserList} from '../../redux/actions'

class User extends Component {
    componentDidMount(){
        this.props.getUserList()
    }
    render() {
        return (
           <Userlist userlist={this.props.userList}/>
        )
    }
}
export default connect(
    state=>({userList:state.userList}),
    {getUserList}
)(User)
