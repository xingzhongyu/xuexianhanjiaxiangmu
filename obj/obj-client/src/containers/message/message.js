import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
import { Brief } from 'antd-mobile/lib/list/ListItem'


const Item = List.Item
function getLastMsgs(ChatMsgs,userid) {
    const lastMsgObjs = {}
    ChatMsgs.forEach(msg => {
        if(msg.to===userid&&!msg.read){
            msg.unReadCount=1
        }else{
            msg.unReadCount=0
        }
        const ChatId = msg.chat_id
        let lastMsg=lastMsgObjs[ChatId]
        if (!lastMsg) {
            lastMsgObjs[ChatId] = msg
        } else {
            const unReadCount=lastMsg.unReadCount
            if (msg.create_time > lastMsg.create_time){
                lastMsgObjs[ChatId] = msg
            }
            lastMsgObjs[ChatId].unReadCount=unReadCount+msg.unReadCount
        }
    })
    const lastMsgs = Object.values(lastMsgObjs)
    lastMsgs.sort(function (m1, m2) {
        return m1.create_time - m2.create_time
    })
    return lastMsgs
    
}

class Message extends Component {
    render() {
        const { user } = this.props
        const { users, ChatMsgs } = this.props.msgList
        const lastMsgs = getLastMsgs(ChatMsgs,user._id)
        return (
            <List style={{ marginTop: 50, marginBottom: 50 }}>
                {
                    lastMsgs.map(msg => {
                        const targetId = msg.from === user._id ? msg.to : msg.from
                        const targetUser = users[targetId]
                        return (
                            <Item
                                key={msg._id}
                                extra={<Badge text={msg.unReadCount} />}
                                thumb={require(`../../assets/imgs/${targetUser.header}.png`)}
                                arrow='horizontal'
                                onClick={() => this.props.history.push(`/chat/${targetId}`)}
                            >
                                {targetUser.username}
                                <Brief>{msg.content}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        )
    }
}
export default connect(
    state => ({ user: state.user, msgList: state.msgList }),
    {}
)(Message)
