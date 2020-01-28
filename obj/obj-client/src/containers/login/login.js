import React, { Component } from 'react'
import {List,Button,NavBar,InputItem,WingBlank,WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'


class Login extends Component {
    state={
        username:'',
        password:''
    }
    handleChange=(name,val)=>{
        this.setState({
            [name]:val
        })
    }
    handleClick=()=>{
       this.props.login(this.state)
    }
    toRegister=()=>{
        this.props.history.replace('/register')
    }
    render() {
        const {msg,redirect}=this.props.user
        if(redirect){
           return <Redirect to={redirect}></Redirect>
        }
        return (
            <div>
                <NavBar>聊&nbsp;天&nbsp;室</NavBar>
                <Logo/>
                <WingBlank>
                <List>
                {msg?<div>{msg}</div>:null}
                <WhiteSpace/>
                <InputItem placeholder='请输入用户名' onChange={val=>{this.handleChange('username',val)}}>用户名：</InputItem>
                <WhiteSpace/>
                <InputItem type='password' placeholder='请输入密码' onChange={val=>{this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                <WhiteSpace/>
                </List>
                <Button type='primary' onClick={this.handleClick}>登录</Button>
                <Button onClick={this.toRegister}>还没有账户</Button>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),//试一下删除user
    {login}
)(Login)