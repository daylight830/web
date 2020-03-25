import React from 'react'
import { inject} from 'mobx-react'
import './index.less'
import {message} from 'antd'
import Highlighter from 'react-highlight-words';
import clone from 'util/clone'
import { Select, Icon, Table,Button,Slider } from "antd";
// import { Plus } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';


const { Option } = Select;
// import { formatStat,getStatFilter}  from 'util/stat'

@inject('userStore', 'sysStore')
class Mooc extends React.Component {
	constructor(props) {
		super(props)

    this.state = {
      loading: false,
      moocdef: [],
      mooc:[],
      value: null,
    }
	}

  async UNSAFE_componentWillMount() {
    this.setState({ loading: true })
    let r = await this.props.sysStore.listMooc()
    let d = await this.props.sysStore.listMoocDef()
    if ((r.code === 200)&&(d.code === 200)) {

      let ret = d.data.map((o,i)=>{return {'key':i+1, ...o}})
      this.setState({ loading: false, mooc: r.data, moocdef: ret, value: r.data[0].mname })
      
    }else{
      this.setState({ loading: false })
      message.err(r.msg)
    }
  }

  onChange = (v)=>{
    this.setState({value: v })
  }


	render() {
    const { moocdef, loading, mooc } = this.state

    // console.log(defaultVal)


    const columns = [{
        title: '序号',
        width: '60px',
        dataIndex: 'key',
        key: 'key',
      },{
        title: '慕课名称',
        dataIndex: 'mname',
        key: 'mname',
        width: '240px',
      },{
        title: '日期',
        dataIndex: 'day',
        key: 'day',
        width: '200px',
      },{
        title: '上课节次',
        dataIndex: 'start',
        key: 'start',
        width: '200px',
      },{
        title: '下课节次',
        dataIndex: 'end',
        key: 'end',
        width: '200px',
      },{
        title: '功能',
        key: 'action',
        width: '20%',
        render: (text, record, index) =>
          <Button type="danger" size="small" icon="close" ></Button>
      },
    ]

    const dmarks = {
      1: { style:{color:'#999'}, label: <strong>周一</strong> },
      2: { style:{color:'#999'}, label: <span>周二</span> },
      3: { style:{color:'#999'}, label: <strong>周三</strong> },
      4: { style:{color:'#999'}, label: <span>周四</span> },
      5: { style:{color:'#666'}, label: <strong>周五</strong> },
    };

    const lmarks = {
      1: '1',
      2: { style:{color:'#999'}, label: <strong>2</strong> },
      3: { style:{color:'#999'}, label: <strong>3</strong> },
      4: { style:{color:'#999'}, label: <strong>4</strong> },
      5: { style:{color:'#999'}, label: <strong>5</strong> },
      6: { style:{color:'#666'}, label: <strong>6</strong> },
      7: { style:{color:'#999'}, label: <strong>7</strong> },
      8: { style:{color:'#999'}, label: <strong>8</strong> },
      9: { style:{color:'#333'}, label: <strong>9</strong> },
    };
  

		return (
      <div className="g-moocdef">
        <div className="m-title">
          录入慕课
        </div>
        <div className="m-menu">
          <Select style={{ width: 170 }} 
            value={this.state.value}
            onChange={this.onChange}>
            {mooc.map((item,i)=>
              <Option key={i} value={item.id}>{item.mname}</Option>
             )}
          </Select>

          <Slider 
            marks={dmarks} 
            included={false} 
            defaultValue={2} 
            min={1}
            max={5} 
            style={{ width: 180 }}
          />

          <Slider range 
            marks={lmarks} 
            min={1}
            max={9} 
            defaultValue={[3, 4]} 
            style={{ width: 250 }}
          />

          <Button type="danger" className="fn-btn"><Icon type="plus"/>添加</Button>
          
        </div>
        <div className="m-main">
          <Table size='small' loading={loading} dataSource={moocdef} columns={columns} />
        </div>
      </div>
		)
	}
}

export default Mooc
