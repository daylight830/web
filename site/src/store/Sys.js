import { observable, action, runInAction } from 'mobx'
import BaseActions from 'component/BaseActions'
import axios from 'axios'
import { message } from 'antd'
import * as urls from '@constant/urls'

class Sys extends BaseActions {

  moocList = []

  @action
  async importUser(params) {
    return await this.post(urls.API_STUD_IMPORT, params)
  }

  @action
  async listUser(params) {
    return await this.post(urls.API_STUD_LIST)
  }

  @action
  async listMooc(params) {
    return await this.post(urls.API_MOOC)
  }

  @action
  async listMoocDef(params) {
    return await this.get(urls.API_MOOC_DEF)
  }


}

export default new Sys()
