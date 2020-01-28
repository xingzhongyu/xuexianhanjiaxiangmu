import { AUTHOR_SUCESS, ERROR_MSG, RECEIVE_USER, UNSET_USER, RECEIVE_USERLIST ,RECEIVE_MSG,RECEIVE_MSGLIST,MSG_READ} from './action-types'
import { reqLogin, reqRegister, reqUpdateUser,reqUser, reqUserList,reqMsgList,reqReadMsg } from '../api/index'
import io from 'socket.io-client'

const authorsucess = (user) => ({ type: AUTHOR_SUCESS, data: user })
const errormsg = (msg) => ({ type: ERROR_MSG, data: msg })
const receiveuser = (user) => ({ type: RECEIVE_USER, data: user })
export const unsetuser = (msg) => ({ type: UNSET_USER, data: msg })
const receiveuserlist=(userlist)=>({type:RECEIVE_USERLIST,data:userlist})
const msglist=({users,ChatMsgs,userid})=>({type:RECEIVE_MSGLIST,data:{users,ChatMsgs,userid}})
const receivemsg=(chatMsg,userid)=>({type:RECEIVE_MSG,data:{chatMsg,userid}})
const msgread=({from,to,count})=>({type:MSG_READ,data:{from,to,count}})


function initIO(dispatch,userid){
    if(!io.socket){
        io.socket=io('ws://localhost:5000')
        io.socket.on('receiveMsg',function(chatMsg){
        console.log('客户端得到服务器的消息',chatMsg)
            if(chatMsg.from===userid||chatMsg.to===userid){
                dispatch(receivemsg(chatMsg,userid))
            }
            })
    }
}
async function getmsglist(dispatch,userid){
    initIO(dispatch,userid)
    const response=await reqMsgList()
    const result=response.data
    if(result.code===0){
        const {users,ChatMsgs}=result.data
        dispatch(msglist({users,ChatMsgs,userid}))
    }

}
export const sendMsg=({from,to,content})=>{
    return dispatch=>{
       io.socket.emit('sendMsg',{from,to,content})
    }
}

export const readMsg=(from,to)=>{
    return async dispatch=>{
        const response=await reqReadMsg(from)
        const result=response.data
        if(result.code===0){
            const count=result.data
            dispatch(msgread({from,to,count}))
        }
    }
}

export const register = (user) => {
    const { username, password, password2, gender } = user
    if (!username) {
        return errormsg('用户名不能为空')
    } else if (password !== password2) {
        return errormsg('两次密码不一致')
    }
    return async dispatch => {
        const response = await reqRegister({ username, password, gender })
        const result = response.data
        if (result.code === 0) {
            getmsglist(dispatch,result.data._id)
            dispatch(authorsucess(result.data))
        } else {
            dispatch(errormsg(result.msg))
        }
    }
}
export const login = (user) => {
    const { username, password } = user
    if (!username) {
        return errormsg('用户名不能为空')
    }
    return async dispatch => {
        const response = await reqLogin({ username, password })
        const result = response.data
        if (result.code === 0) {
            getmsglist(dispatch,result.data._id)
            dispatch(authorsucess(result.data))
        } else {
            dispatch(errormsg(result.msg))
        }
    }
}
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveuser(result.data))
        } else {
            dispatch(unsetuser(result.msg))
        }
    }
}
export const getUser=()=>{
    return async dispatch=>{
        const response = await reqUser()
        const result=response.data
        if (result.code === 0) {
            getmsglist(dispatch,result.data._id)
            dispatch(receiveuser(result.data))
        } else {
            dispatch(unsetuser(result.msg))
        }
    }
}
export const getUserList=()=>{
    return async dispatch=>{
        const response= await reqUserList()
        const result=response.data
        if(result.code===0){
            dispatch(receiveuserlist(result.data))
        }
    }
}
