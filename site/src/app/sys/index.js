import React from 'react'
import { inject} from 'mobx-react'

import { MENU_SYS } from 'constant/data'
import './index.less'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'component/Loadable'

@inject('userStore')
class Sys extends React.Component {
	constructor(props) {
		super(props)
    
    let cur = this.props.userStore.currUser
    if ((cur === undefined)||(cur === null)) {
      this.props.history.push("/login")
    }

    this.state = {
      id: this.props.match.params.id,
    }
	}

  selMenu = (e)=>{
    if (e!==this.state.id) {
      this.setState({id:e})
    }
  }

	render() {

    let {id} = this.state

    console.log(id)

		return (
      <div className="g-sys">
        <div className="m-sys">
          <div className="m-main">
            {(id == 0) &&
              <Route component={Loadable({loader:()=>import('app/sys/imps')})} /> }
            {(id == 1) &&
              <Route component={Loadable({loader:()=>import('app/sys/mooc')})} /> }
            {(id == 2) &&
              <Route component={Loadable({loader:()=>import('app/sys/test')})} /> }
           
            
          </div>
          <div className="m-menu">
            {MENU_SYS.map((item,index)=>
              <div className={`m-menu-item ${(id == index)?'active':''}`} key={index} onClick={this.selMenu.bind(this,index)}>
                {item.ctl}
              </div>
            )}
          </div>
          
        </div>
      </div>
		)
	}
}

export default Sys
