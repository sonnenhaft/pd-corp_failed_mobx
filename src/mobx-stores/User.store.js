import { observable } from 'mobx'
import { axios } from 'common'
import { persist } from 'mobx-persist'

class UserStore {
  @persist @observable username = null
  @persist @observable token = null
  @observable error = null
  @observable loggedIn = false

  logout() {
    this.username = null
    this.token = null
    this.loggedIn = false
  }

  async login({ username = 'john@company1.com', password = '12345' } = {}) {
    username = prompt('Set username:', username)
    password = prompt('Set password:', password)

    const self = this
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
  }
}

const userStore = new UserStore()

export default userStore
