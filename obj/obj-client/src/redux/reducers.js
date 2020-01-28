import {combineReducers} from 'redux';
import {AUTHOR_SUCESS,ERROR_MSG,RECEIVE_USER,UNSET_USER,RECEIVE_USERLIST,RECEIVE_MSGLIST,RECEIVE_MSG,MSG_READ}from './action-types'
const initUser={
    username:'',
    gender:'',
    msg:'',
    redirect:''
}
function user(state=initUser,action){
    switch(action.type){
        case AUTHOR_SUCESS:
            if(action.data.header){
                return {...action.data,redirect:'/user'}
            }else{
                return {...action.data,redirect:'/userinfo'}
            }
        case ERROR_MSG:
            return {...state,msg:action.data}
        case RECEIVE_USER:
            return action.data
        case UNSET_USER:
            return {...initUser,msg:action.data}
        default:
            return state
    }
}
const initUserList=[]
function userList(state=initUserList,action){
    switch(action.type){
        case RECEIVE_USERLIST:
            return action.data
        default:
            return state
    }
}
const initMsgList={
    users:{},
    ChatMsgs:[],
    unReadcount:0
}
function msgList(state=initMsgList,action){
    switch (action.type){
        case RECEIVE_MSGLIST:
            const {users,ChatMsgs,userid}=action.data
            return {
                users,
                ChatMsgs,
                unReadcount:ChatMsgs.reduce((pretotal,msg)=>pretotal+(!msg.read&&msg.to===userid?1:0),0)
            }
        case RECEIVE_MSG:
            const {chatMsg}=action.data
            return{
                users:state.users,
                ChatMsgs:[...state.ChatMsgs,chatMsg],
                unReadcount:state.unReadcount+(chatMsg.to===action.data.userid&&!chatMsg.read?1:0)
            }
        case MSG_READ:
            const {from,to,count}=action.data
            return{
                users:state.users,
                ChatMsgs:state.ChatMsgs.map(msg=>{
                    if(msg.from===from&&msg.to===to&&!msg.read){
                        return {...msg,read:true}
                    }else{
                        return msg
                    }
                }),
                unReadcount:state.unReadcount-count
            }
        default:
            return state
    }
}

export default combineReducers({user,userList,msgList})