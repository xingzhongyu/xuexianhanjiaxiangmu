import React, { Component } from 'react';
import {List,Button,NavBar,InputItem,WingBlank,WhiteSpace,Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'

const ListItem=List.Item
class Register extends Component {
    state={
        username:'',
        password:'',
        password2:'',
        gender:'nan'
    }
    handleChange=(name,val)=>{
        this.setState({
            [name]:val
        })
    }
    handleClick=()=>{
      this.props.register(this.state)
    }
    toLogin=()=>{
        this.props.history.replace('/login')
    }
    render() {
        const {gender}=this.state
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
                <InputItem  type='password' placeholder='请输入确认密码' onChange={val=>{this.handleChange('password2',val)}}>确认密码：</InputItem>
                <WhiteSpace/>
                <ListItem>
                <span>性别：</span>&nbsp;&nbsp;&nbsp;
                <Radio checked={gender==='nan'} onChange={()=>{this.handleChange('gender','nan')}}>男</Radio>&nbsp;&nbsp;&nbsp;
                <Radio checked={gender==='nv'} onChange={()=>{this.handleChange('gender','nv')}}>女</Radio>
                </ListItem>
                </List>
                <Button type='primary' onClick={this.handleClick}>注册</Button>
                <Button onClick={this.toLogin}>已有账户</Button>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),//试一下删除user
    {register}
)(Register)