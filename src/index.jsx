import 'core-js'
import 'regenerator-runtime/runtime'
import { createRoot } from 'react-dom/client'
import Index from './main/index'
import { UiProvider } from './context/ui'

const container = document.getElementById('content')
const root = createRoot(container)
root.render(
  <UiProvider>
    <Index />
  </UiProvider>
)
