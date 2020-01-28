import React, { Component } from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
    static propTypes={
        setHeader:PropTypes.func.isRequired
    }
    state={
        icon:null
    }
    constructor(props){
        super(props)
        this.headerList=[]
        for(let i=0;i<20;i++){
            this.headerList.push({
                text:'头像'+(i+1),
                icon:require(`../../assets/imgs/头像${i+1}.png`)
            })
        }
    }
    handleClick=({text,icon})=>{
        this.setState({icon})
        this.props.setHeader(text)
    }
    render() {
        const {icon}=this.state
        const ListHeader=!icon?'请选择头像':(
            <div>请选择头像:<img src={icon} style={{
                width:'25px',
                height:'25px'
            }} alt='头像'></img></div>
        )
        return (
        <List renderHeader={()=>ListHeader}>
            <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}>
            </Grid>
        </List>
        )
    }
}
