import { action, observable } from 'mobx'
import { axios } from 'common'
import { persist } from 'mobx-persist'

console.warn('//TODO: enabled auth when auth api enabled again')
const AUTH_ENABLED = false
export default class UserStore {
  @persist @observable username = null
  @persist @observable token = null
  @observable error = null
  @observable loggedIn = false
  @persist @observable stub = false

  logout() {
    this.username = null
    this.token = null
    this.loggedIn = false
    this.stub = false
  }

  @action stubLogin() {
    this.stub = true
    this.username = '@stub mode'
    this.loggedIn = true
  }

  async login({ username = 'john@company1.com', password = '12345' } = {}) {
    if ( AUTH_ENABLED ) {
      const self = this

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

        self.username = username
        self.token = `Bearer ${ access_token }`
        axios.setHeaders({ authorization: self.token })
        self.loggedIn = true
      } catch (e) {
        this.logout()
      }
    } else {
      this.loggedIn = true
      this.username = 'no auth'
      this.token = 'no auth'
    }
  }
}
