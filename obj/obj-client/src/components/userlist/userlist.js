import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import  Queueannim  from 'rc-queue-anim'

const {Header,Body}=Card
class Userlist extends Component {
    static propTypes={
        userlist:PropTypes.array.isRequired
    }
    render() {
        const {userlist}=this.props
        return (
            <WingBlank style={{marginBottom:50,marginTop:50}}>
                <Queueannim type='scale'>
                {userlist.map((user)=>( 
                <div key={user._id}>
                    <WhiteSpace/>
                    <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                        <Header thumb={require(`../../assets/imgs/${user.header}.png`)}
                        thumbStyle={{width:'36px',height:'36px'}}  
                        extra={user.username}></Header>
                        <Body>
                        <div>性别:{user.gender==='nan'?'男':'女'}</div>
                        <div>学校:{user.school}</div>
                        <div>自我介绍:{user.introduction}</div>
                        </Body>
                    </Card>
                </div>))}
                </Queueannim>
            </WingBlank>
        )
    }
}
export default withRouter(Userlist)
