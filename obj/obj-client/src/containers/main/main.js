import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import userInfo from '../user-infor/user-infor'
import User from '../../containers/user/user'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/NotFound/NotFound'
import NavFooter from '../../components/nav-footer/navFooter'
import Chat from '../chat/chat'
import './mains.css'
 
import {getUser} from '../../redux/actions'
import { NavBar } from 'antd-mobile'


class Main extends Component {
    NavList=[{
        path:'/user',
        component:User,
        title:'用户列表',
        icon:'user',
        text:'用户'
    },
    {
       path:'/message',
       component:Message,
       title:'消息列表',
       icon:'message',
       text:'消息'
    },{
        path:'/personal',
        component:Personal,
        title:'个人中心',
        icon:'personal',
        text:'个人'
    }

]
    componentDidMount(){
        const userid=Cookies.get('userid')
        const {_id}=this.props.user
        if(userid&&!_id){
            this.props.getUser()
        }
    }
    render() {
        const userid=Cookies.get('userid')
        if(!userid){
            return <Redirect to='/login'></Redirect>
        }
        const {unReadcount}=this.props
        const {_id}=this.props.user
        if(!_id){
            return null
        }else{
            let path=this.props.location.pathname
            if(path==='/'){
                if(this.props.user.header){
                    return <Redirect to='/user'></Redirect>
                }else{
                    return <Redirect to='/userinfo'></Redirect>
                }
            }
        }
        const path=this.props.location.pathname
        const cuurentNav=this.NavList.find((nav)=>nav.path===path)
        return (
            <div>
                {cuurentNav ? <NavBar className='fix-header'>{cuurentNav.title}</NavBar> : null}
            <Switch>
                {this.NavList.map(nav=><Route path={nav.path} component={nav.component} key={nav.path}></Route>)}
                <Route path='/userinfo' component={userInfo}></Route>
                <Route path='/chat/:userid' component={Chat}></Route>
                <Route component={NotFound}></Route>
            </Switch>
            {cuurentNav ? <NavFooter NavList={this.NavList} unReadcount={unReadcount}/> : null}
            </div>
        )

    }
}
export default connect(
    state => ({ user: state.user,unReadcount:state.msgList.unReadcount }),
    {getUser}
)(Main)
