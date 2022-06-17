import UI from './ui'

import C from '../const'
import Keyboard from './keyboard'
import Index from '../main'

interface IState {
  keyboard: Keyboard
  screen: number
  ui: UI
  app: Index
}

class State {
  keyboard!: Keyboard

  screen: number

  ui: UI

  app: Index

  constructor(app: Index) {
    this.app = app

    // State fields.
    this.ui = new UI(this) // UI state handler.

    this.screen = C.SCREEN_MAIN // The current screen.

    // Bind methods.
    this.update = this.update.bind(this)
    this.error = this.error.bind(this)
    this.message = this.message.bind(this)
  }

  update(t: Partial<IState>) {
    if (t) {
      Object.assign(this, t)
    }
    this.app.setState(this)
  }

  error(msg: string) {
    alert(msg)
  }

  message(msg: string) {
    alert(msg)
  }
}

export default State
