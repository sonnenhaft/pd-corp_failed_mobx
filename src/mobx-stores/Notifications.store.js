import { observable } from 'mobx'
import { delay } from 'common'

/** @type { NotificationsStore } */
export default class NotificationsStore {
  /**
   * Container for notifications, like api errors, or when something
   * important and good happened.
   * @example [
   *    { text: 'Static test', type: 'success' },
   *    { text: 'Static test', type: 'error' }
   * ]
   * @field { Array<Object{text: string, type: string}> }
   */
  @observable list = []

  /**
   * @field { number } integer incremental unique indicator for message
   * necessary because we may have 2 same messages, but in react
   * to render array we need something unique, especially if we want to apply
   * list animations properly
   */
  messagesCounter = 0

  info(text, time = 3000) {
    this.add({ text, type: 'success', time })
  }

  error(error, time = 6000) {
    if ( typeof error !== 'string' ) {
      error = (Array.isArray(error) ? error : [error]).map(error => {
        const { message, path, msg } = error.response.data
        return `${ message || msg } ${ path || '' }`
      }).join(' | ')
    }
    this.add({ text: error, type: 'error', time })
  }

  async add({ text, type = 'success', time }) {
    const notification = { text, type, index: this.messagesCounter++ }

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
