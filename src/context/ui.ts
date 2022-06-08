interface IUIState {
  kle: string
  keySize: number
  'keymap-layer': number
  'display-flip': boolean
  // of the form `layout:${key.layout}`
  [layoutName: string]: unknown
  'compile-working': boolean
  'macros-current': number
}

const initialState = {}
