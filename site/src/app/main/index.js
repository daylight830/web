import React from 'react'
import { Spin } from 'antd'
import { inject, observer } from 'mobx-react'
import './index.less'
import logo from 'icon/logo_co.svg';
import { API_SERVER } from 'constant/apis'

@inject('mainStore','userStore')
@observer
class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			mooclist: [],
      news: [],
      visible: false,
      mobile: (document.querySelector('html').clientWidth<1000),
		}
	}

  async componentDidMount() {
    let web, mob, n = []
    this.setState({ loading: true })
    let r = await this.props.mainStore.getMoocList()
    let s = await this.props.mainStore.getCount()
    let w = await this.props.mainStore.getNewsList()

    r.map((item,i)=>{
      if (item.mooc.toLowerCase() === 'web') {
        web = item
      }else if (item.mooc.toLowerCase() === 'mobile') {
        mob = item
      }else{
        n.push(item)
      }
    })
    n = [web,mob, ...n]
    this.setState({ loading: false, mooclist: n, news: w, count: s })
  }

  doNav = (mooc) => {
    window.location.replace(`/#/mooc/${mooc}`)
  }

  doLogin = () => {
    this.props.history.push("/login")
  }

  doReg =()=>{
    this.props.history.push("/reg")
  }

  
	render() {
		let { mooclist, count, mobile, news } = this.state

		return (
      <Spin spinning={this.state.loading}>
			<div className='g-index'>
        <div className="m-index">
          { !mobile && 
          <div className="m-main">
            <div className="m-list">
              {mooclist.filter((v,d)=>(d<4)?v:null).map((item,index)=>
                <div className="m-mooc-item" key={index}>
                  <div className="m-mooc-img" onClick={this.doNav.bind(this,item.mooc)}>
                    <img className="m-cover" src={`${API_SERVER}/img/${item.mooc.toLowerCase()}/cover.png`} />
                    <img className="m-icon" src={`${API_SERVER}/img/${item.mooc.toLowerCase()}/cover.svg`} />
                  </div>
                </div> 
              )}
            </div>
            <div className="m-list">
              <div className="m-mooc-item">
                <div className="m-mooc-logo" onClick={this.doLogin}>
                  <img src={logo} />
                </div>
              </div>
              {mooclist.filter((v,d)=>(d>=4)?v:null).map((item,index)=>
                <div className="m-mooc-item" key={index}>
                  <div className="m-mooc-img" onClick={this.doNav.bind(this,item.mooc)}>
                    <img className="m-cover" src={`${API_SERVER}/img/${item.mooc.toLowerCase()}/cover.png`} />
                    <img className="m-icon" src={`${API_SERVER}/img/${item.mooc.toLowerCase()}/cover.svg`} />
                  </div>
                </div> 
              )}
            </div>
          </div> }

          { mobile &&
          <div className="m-main">
            <div className="m-list">
              {mooclist.map((item,index)=>
                <div className="m-mooc-item" key={index}>
                  <div className="m-mooc-img" onClick={this.doNav.bind(this,item.mooc)}>
                    <img className="m-cover" src={`${API_SERVER}/img/${item.mooc.toLowerCase()}/cover.png`} />
                    <img className="m-icon" src={`${API_SERVER}/img/${item.mooc.toLowerCase()}/cover.svg`} />
                  </div>
                </div> 
              )}
              <div className="m-mooc-item" >
                <div className="m-mooc-logo" onClick={this.doLogin}>
                  <img src={logo}/>
                </div>
              </div>
            </div>
          </div> }

          <div className="m-nav">
            <div className="m-nav-wrap">
              <div className="m-nav-main">
                <div className="m-news">
                  <h1>News</h1>
                  {news.map((item,index)=>
                    <li key={index}>
                      <span>{item.data} </span>
                      <i>{item.date}</i>
                    </li>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="m-footer">
          <div className="m-logo" onClick={this.doReg}>
            <div className="m-count">{count}</div>
            <label>F</label>
            <span>ront-Tech</span>
          </div>
          <span>杭州师范大学国际服务工程学院 前端技术社团</span>
          <span>2020@All Rights Researved</span>
        </div> 
			</div>
      </Spin>
		)
	}
}

export default Main