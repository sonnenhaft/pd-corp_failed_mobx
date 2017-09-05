import { observable } from 'mobx'

const delay = (time = 3000) => new Promise(resolve => setTimeout(resolve, time))

export default class NotificationsStore {
  @observable list = [
    // { text: 'Static test', type: 'success' },
    // { text: 'Static test', type: 'error' }
  ]

  counter = 0

  info(text, time) {
    this.add({ text, type: 'success', time })
  }

  error(error, time) {
    if ( typeof error !== 'string' ) {
      const { message, path, msg } = error.response.data
      error = `${ message || msg } ${ path || '' }`
    }
    this.add({ text: error, type: 'error', time })
  }

  async add({ text, type = 'success', time }) {
    const notification = { text, type, index: this.counter++ }

    this.list.push(notification)
    await delay(time)
    this.remove(notification)
  }

  remove(notification) {
    const idx = this.list.findIndex(_notification => {
      return _notification === notification
    })
    this.list.splice(idx, 1)
  }
}
