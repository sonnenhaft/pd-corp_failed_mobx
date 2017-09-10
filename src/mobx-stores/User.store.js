import { observable } from 'mobx'
import { axios } from 'common'
import { persist } from 'mobx-persist'

/**
 * MobX store for current user, who will use this application.
 * Controls login and logout processes.
 * Would be extended.
 */
export default class UserStore {
  @persist @observable username = null
  @persist @observable token = null
  @persist @observable stub = false

  @observable loggedIn = false
  @observable error = null

  async login({ username = 'john@company1.com', password = '12345' } = {}) {
    username = prompt('Set username:', username)
    password = prompt('Set password:', password)

    try {
      const { data: { access_token } } = await axios({
        method: 'post',
        url: '/api/v1/oauth/token',
        params: { grant_type: 'password', username, password },
        data: { grant_type: 'password', username, password },
        headers: {
          authorization: `Basic ${ btoa('web:web') }`,
          'x-tenantId': 'hospital1'
        }
      })

      this.username = username
      this.token = `Bearer ${ access_token }`
      axios.setHeaders({ authorization: this.token })
      this.loggedIn = true
    } catch (e) {
      alert('login failed')
    }
  }

  logout() {
    this.username = null
    this.token = null
    this.loggedIn = false
    this.stub = false
  }

  stubLogin() {
    this.stub = true
    this.username = '@stub mode'
    this.loggedIn = true
  }

  loginNoAuth() {
    this.loggedIn = true
    this.username = 'no auth'
    this.token = 'no auth'
  }
}
