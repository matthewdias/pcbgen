import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useMemo,
  useReducer,
} from 'react'
import C from '../const'

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

enum UIActionTypes {
  toggleDisplayFlip = 'TOGGLE_DISPLAY_FLIP',
  setFields = 'SET_FIELDS',
}

interface IUiState {
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
  | { type: UIActionTypes.setFields; payload: Partial<IUiState> }

type IUiContext = [state: IUiState, dispatch: Dispatch<UIAction>]

const initialState: IUiState = {
  kle: '',
  keySize: C.KEY_SIZE,
  'keymap-layer': 0,
  'display-flip': false,
  'compile-working': false,
}

function uiReducer(state: IUiState, action: UIAction) {
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

const uiContext = createContext<IUiContext>([initialState, () => null])

interface IUiProviderProps {
  children: ReactNode
}

function UiProvider({ children }: IUiProviderProps) {
  const [state, dispatch] = useReducer(uiReducer, initialState)
  const memoizedProviderValue = useMemo<IUiContext>(
    () => [state, dispatch],
    [state]
  )
  return (
    <uiContext.Provider value={memoizedProviderValue}>
      {children}
    </uiContext.Provider>
  )
}

export { UiProvider, uiContext, UIActionTypes }
