import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import { Brief } from 'antd-mobile/lib/list/ListItem'
import {unsetuser} from '../../redux/actions'
import Cookies from 'js-cookie'
 
const Item=List.Item
class Personal extends Component {
    handleClick=()=>{
        Modal.alert('退出','确认退出登陆吗？',[
            {text:'取消'},
            {text:'确认',
        onPress:()=>{
            Cookies.remove('userid')
            this.props.unsetuser()
         }}
        ])
    }
    render() {
        const {username,header,school,introduction,gender}=this.props.user
        const icon=require(`../../assets/imgs/${header}.png`)
        return (
            <div style={{marginTop:50,marginBottom:50}}>
               <Result
               imgUrl={icon}
               title={username}
               message={<div>{gender==='nan'?'男':'女'}</div>}
               />
               <List renderHeader={()=>'个人信息'}>
                <Item multipleLine>
                    <Brief>学校:{school}</Brief>
                    <Brief>自我介绍:{introduction}</Brief>
                </Item>
               </List>
               <WhiteSpace/>
               <WhiteSpace/>
               <Button type='warning' onClick={this.handleClick}>退出登录</Button>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {unsetuser}
)(Personal)
