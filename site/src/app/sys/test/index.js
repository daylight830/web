import React from 'react'
import { inject} from 'mobx-react'
import { Select, Icon, Table,Button,Slider,Spin,message } from "antd";
import './index.less'
const { Option } = Select;

@inject('sysStore')
class Test extends React.Component {
	constructor(props) {
		super(props)

    this.state = {
      loading: false,
      mooc:[],
      curMooc: 0,
    }
	}

  async componentDidMount() {
    this.setState({ loading: true })
    let r = await this.props.sysStore.listMooc()
    console.log(r)
    if (r.code === 200) {
      this.setState({ loading: false, mooc: r.data })
    }else{
      this.setState({ loading: false })
      message.err(r.msg)
    }
  }

  
  selMooc=(e)=>{
    this.setState({ curMooc:e})
  }

	render() {
    const { loading, mooc,curMooc } = this.state


		return (
      <Spin spinning={this.state.loading}>
        <div className="g-systest">
          <div className="m-title">
            批改实验
          </div>

          <div className="m-test">
            <div className="m-mooc-list">
              {mooc.map((item,index)=>
                <div className={(index ===curMooc)?'m-mooc-item active':'m-mooc-item'} 
                  key={index} 
                  onClick={this.selMooc.bind(this,index )}>
                  <span>{item.name}</span>
                </div> 
              )}
            </div>
          </div>
        </div>
      </Spin>
		)
	}
}

export default Test
