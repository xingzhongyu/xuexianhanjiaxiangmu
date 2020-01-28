import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/headerSelector'
import { updateUser } from '../../redux/actions'

class userInfo extends Component {
    state = {
        header: '',
        school: '',
        introduction: ''
    }
    setHeader = (header) => {
        this.setState({
            header: header
        })
    }
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }
    handleClick = () => {
        this.props.updateUser(this.state)
    }
    render() {
        const { header, school,introduction } = this.props.user
            if (header&&school&&introduction) {
                const path = '/user'
                return <Redirect to={path}></Redirect>
        }
        return (
            <div>
                <NavBar>个人信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader} />
                <InputItem placeholder='请输入所在学院' onChange={val => { this.handleChange('school', val) }}>所在学院:</InputItem>
                <TextareaItem title='自我介绍:' row={5} onChange={val => { this.handleChange('introduction', val) }}></TextareaItem>
                <Button type='primary' onClick={this.handleClick}>保&nbsp;存</Button>
                <p style={{
                    color:'red'
                }}>注：需要完善全部个人信息</p>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { updateUser }
)(userInfo)