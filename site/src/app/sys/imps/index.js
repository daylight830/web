import React from 'react'
import { inject} from 'mobx-react'
import './index.less'
import {message} from 'antd'
import Highlighter from 'react-highlight-words';
import clone from 'util/clone'
import { Input, Form, Button, Tag, Icon, Table, Divider, Result, Modal, Skeleton } from "antd";
// import { formatStat,getStatFilter}  from 'util/stat'


@inject('userStore', 'sysStore')
class Imps extends React.Component {
	constructor(props) {
		super(props)

    this.state = {
      loading: false,
      studList: [],
    }
	}

  async UNSAFE_componentWillMount() {
    this.setState({ loading: true })
    let r = await this.props.sysStore.listUser()
    if (r.code === 200) {
      let ret = r.data.map((o,i)=>{return {'key':i+1, ...o}})
      this.setState({ loading: false, studList: ret })


    }else{
      this.setState({ loading: false })
      message.err(r.msg)
    }
  }


  importUser = async (e) => {
    if (e.target.files.length > 0) {
      let blob = e.target.files[0]
      let formData = new FormData()
      formData.append('file', blob)
      
      this.setState({ loading: true })
      let r = await this.props.sysStore.importUser(formData)
      if (r.code === 200) {
        let ret = r.data.map((o,i)=>{return {'key':i+1, ...o}})
        this.setState({ loading: false, studList: ret })
        message.info('导入数据成功')
      } else {
        message.error(r.msg)
      }
    }
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };


	render() {
    
    const { studList, loading } = this.state
    const columns = [{
        title: '序号',
        width: '60px',
        dataIndex: 'key',
        key: 'key',
      },{
        title: '学号',
        dataIndex: 'usr',
        key: 'usr',
        width: '240px',
        ...this.getColumnSearchProps('usr'),
      },{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '200px',
        ...this.getColumnSearchProps('name'),
      },{
        title: '班级',
        dataIndex: 'cls',
        key: 'cls',
        width: '200px',
        ...this.getColumnSearchProps('cls'),
      },{
        title: '功能',
        key: 'action',
        render: (text, record, index) => <Button type="primary" size="small" icon="delete" ></Button>
      },
    ]


		return (
      <div className="g-imp">
        <div className="m-title">
          导入学生
        </div>
        <div className="m-menu">
          <div className="m-import">
            <input id="clock-in-face-upload" 
              type="file" 
              accept="application/vnd.ms-excel" 
              onChange={this.importUser}
            />
            Import
          </div>
          
        </div>
        <div className="m-main">
          <Table size='small' loading={loading} dataSource={studList} columns={columns} />
        </div>
      </div>
		)
	}
}

export default Imps
