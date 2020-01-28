import React, { Component } from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'




const Item=TabBar.Item
class NavFooter extends Component {
    static propTypes={
        NavList:PropTypes.array.isRequired, 
        unReadcount:PropTypes.number.isRequired
    }
    render() {
        const {NavList,unReadcount}=this.props
        const path=this.props.location.pathname
        return (
            <TabBar>
                {NavList.map((nav)=>(
                    <Item key={nav.path}
                        badge={nav.path==='/message'?unReadcount:0}
                        title={nav.text}
                        icon={{uri: require(`./images/${nav.icon}.png`)}}
                        selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                        selected={nav.path===path}
                        onPress={()=>this.props.history.replace(nav.path)}
                    />
                ))}
            </TabBar>
        )
    
    }
}
export default withRouter(
    NavFooter
)
