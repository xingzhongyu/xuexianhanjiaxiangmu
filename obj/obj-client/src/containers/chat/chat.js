import React, {Component} from 'react'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg,readMsg} from '../../redux/actions'
import  Queueannim  from 'rc-queue-anim'

import './chats.css'

const Item=List.Item
class Chat extends Component {
    constructor(props){
        super(props)
        const emojis = ['😀','😃','😄', '😁', '😆','😅','🤣','😂', 
        '🙂', '🙃', '😊', '😇', '🥰', '😍', '🤩 ','😘','😚', '😙', 
        '😋','😛', '😜',  '😝', '🤑','🤗', '🤭', '🤫','🤔','🤐', '🤨']
        this.emojis=emojis.map(emoji=>({text:emoji}))
    }        
    state={
        content:'',
        isshow:false
    }
    componentDidMount(){
        window.scrollTo(0,document.body.scrollHeight)
    }
    componentDidUpdate(){
        window.scrollTo(0,document.body.scrollHeight)
    }
    componentWillUnmount(){
        const to = this.props.user._id
        const from =this.props.match.params.userid
        this.props.readMsg(from,to)
    }
    toggleShow=()=>{
        const isshow=!this.state.isshow
        this.setState({isshow})
       if(isshow){
           setTimeout(()=>{
               window.dispatchEvent(new Event('resize'))
            },0)
       }
    }
    handleClick=()=>{
        const from = this.props.user._id
        const to =this.props.match.params.userid
        const content=this.state.content.trim()
        if(content){
            this.props.sendMsg({from,to,content})
        }
        
        this.setState({content:'',isshow:false})
    }
    render() {
        const {user}=this.props
        const {users,ChatMsgs}=this.props.msgList
        const myId = this.props.user._id
        const tagetId=this.props.match.params.userid
        if(!users[tagetId]){
            return null
        }
        const chatId=[myId,tagetId].sort().join('_')
        const msgs=ChatMsgs.filter(msg=>msg.chat_id===chatId)
        const targetHeader=users[tagetId].header
        const targetIcon=require(`../../assets/imgs/${targetHeader}.png`)
        const {username}=user   
        return (
            <div id='chat-page'>
                <NavBar className='fix-header' icon={<Icon type='left'/>}
                onLeftClick={()=>this.props.history.goBack()}
                >{users[tagetId].username}</NavBar>
                <List style={{marginTop:50,marginBottom:50}}>
                <Queueannim type='left'>
                {msgs.map(msg=>{
                        if(msg.to===myId){
                            return (
                            <Item thumb={targetIcon} key={msg._id}>:{msg.content}</Item>
                            )
                        }else{
                           return (
                           <Item extra={username} className='chat-me' key={msg._id}>{msg.content}:</Item>
                           )
                        }
                    })}
                </Queueannim>
                </List>
                <div className='am-tab-bar'>
                <InputItem  placeholder='请输入聊天内容' 
                extra={
                    <span>
                        <span onClick={this.toggleShow} style={{marginRight:6}}>😊</span>
                <span onClick={this.handleClick}>发送&nbsp;&nbsp;</span>
                </span>
            }
                onChange={val=>this.setState({content:val})}
                onFocus={()=>this.setState({isshow:false})}
                value={this.state.content}
                ></InputItem>
                {
                    this.state.isshow?(
                        <Grid
                        data={this.emojis}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={(item)=>{
                            this.setState({content:this.state.content+item.text})
                        }}
                        />  
                    ):null
                }
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user,msgList:state.msgList}),
     {sendMsg,readMsg}
)(Chat)



