import { createContext } from 'react'
import C from '../const'

enum UIActionTypes {
  toggleDisplayFlip = 'TOGGLE_DISPLAY_FLIP',
  setFields = 'SET_FIELDS',
}

interface IUIState {
  kle: string
  keySize: number
  'keymap-layer': number
  'display-flip': boolean
  'compile-working': boolean
  // keys of the form `layout:${someLayoutName}`
  [layoutName: `layout:${string}`]: string
}

type UIAction =
  | { type: UIActionTypes.toggleDisplayFlip }
  | { type: UIActionTypes.setFields; payload: Partial<IUIState> }

const initialState: IUIState = {
  kle: '',
  keySize: C.KEY_SIZE,
  'keymap-layer': 0,
  'display-flip': false,
  'compile-working': false,
}

function uiReducer(state: IUIState, action: UIAction) {
  switch (action.type) {
    case UIActionTypes.toggleDisplayFlip: {
      return {
        ...state,
        'display-flip': !state['display-flip'],
      }
    }
    case UIActionTypes.setFields: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const uiContext = createContext<IUIState>(initialState)

export { uiContext, uiReducer }
export type { UIActionTypes }
