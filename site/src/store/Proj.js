import { observable, action, runInAction } from 'mobx'
import BaseActions from 'component/BaseActions'
import axios from 'axios'
import { message } from 'antd'
import * as urls from '@constant/urls'

class Proj extends BaseActions {

  @action
  async getProjList() {
    return await this.get(urls.API_PROJ_LIST)
  }

  @action
  async getProjDetail(params) {
    return await this.post(urls.API_PROJ_DETAIL, params)
  }


}

export default new Proj()
