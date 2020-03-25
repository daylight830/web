import React from 'react'
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react'
import {withRouter} from "react-router-dom";
import { MENU_MAIN } from 'constant/data'

import './index.less'
import home from 'icon/icon_home.svg';
import mooc from 'icon/icon_mooc.svg';
import proj from 'icon/icon_proj.svg';
import about from 'icon/icon_about.svg';


@inject('userStore')
class NavWrapper extends React.Component {
	constructor(props) {
		super(props)

    let u = this.props.userStore.currUser
    this.state = {
      cur: 0,
      role: ((u !== undefined)&&(u !== null))?u.type:-1,
    }

	}

  doMenu = (path, index)=>{
    this.setState({cur: index})
    this.props.history.push(path)
  }

  logout = ()=>{
    this.props.userStore.logout()
    this.props.history.push('/')
  }

	render() {
    let { cur,role } = this.state

    console.log('role...'+ this.props.userStore.currUser)
    let menu = []

    MENU_MAIN.map((item,i)=>{
      if ((role === -1)&&(item.role !== 0)) {
        menu.push(item)
      }else if ((role === 0)&&(item.role <= 1)) {
        menu.push(item)
      }else if ((role === 1)&&(item.role !== 0)) {
        menu.push(item)
      }
    })
        

    return (
      <div className="g-nav">
        <div className="g-menu">
          {menu.map((item,i)=>
            <div className={`m-menu-item ${(role>1)?'fn-hide':''}`} key={i} 
              onClick={this.doMenu.bind(this,item.path, i)}>
              <img src={item.icon} className={(cur == i)?'fn-hide':''}  />
              <img src={item.iconc} className={(cur != i)?'fn-hide':''}/>
              <span className={(cur == i)?"c-active":""}>{item.title}</span> 
            </div>
          )}
          
          {/*退出登录*/}
          {((this.props.userStore.currUser !== undefined)&&(this.props.userStore.currUser !== null)) &&
          <div className="m-menu-item m-menu-logout" onClick={this.logout}>
            <span>Logout</span>
          </div>}

        </div>
        <div className="g-main">
          {this.props.children}
        </div>

      </div>
    )
  }
}

export default withRouter(NavWrapper)
