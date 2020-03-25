import { observable, action, runInAction } from 'mobx'
import BaseActions from 'component/BaseActions'
import axios from 'axios'
import { message } from 'antd'
import * as urls from '@constant/urls'
import jwt from 'util/token.js'

class User extends BaseActions {
  @observable
  currUser = undefined

  @action
  async login(params) {
    const r = await this.post(urls.API_USER_LOGIN, params)
    if (r.code=== 200) {
      jwt.saveToken(r.token)
      this.currUser = r.data
    }
    return r
  }

  @action
  logout() {
    jwt.removeToken()
    this.currUser = null
  }

  @action
  async getProjList(params) {
    return await this.post(urls.API_PROJ_LIST,params)
  }

  @action
  async getMark(params) {
    return await this.post(urls.API_MARK,params)
  }

  @action
  async markProj(params) {
    return await this.post(urls.API_MARK_PROJ,params)
  }

  @action
  async getUserGroup(params) {
    return await this.post(urls.API_USER_GROUP, params)
  }


}

export default new User()