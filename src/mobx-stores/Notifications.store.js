import { observable } from 'mobx'

const delay = (time = 3000) => new Promise(resolve => setTimeout(resolve, time))

export default class NotificationsStore {
  @observable list = [
    // { text: 'Static test', type: 'success' },
    // { text: 'Static test', type: 'error' }
  ]

  info(text) {
    this.add({ text, type: 'success' })
  }

  error(text) {
    this.add({ text, type: 'error' })
  }

  async add({ text, type = 'success' }) {
    const notification = { text, type }

    this.list.push(notification)
    await delay()
    this.remove(notification)
  }

  remove(notification) {
    const idx = this.list.findIndex(_notification => {
      return _notification === notification
    })
    this.list.splice(idx, 1)
  }
}
