import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import App from './App'

import { ChannelType, NormalUrlMessage, WindowMessage } from '../../common/magicDef'
import { ViewInstance, ViewType, useViewStore } from './data/store/viewStore'

import { v4 as uuidv4 } from 'uuid'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// TODO: Change to meaningful logic
window.api.on(ChannelType.PlaceHolder, (arg: unknown) => {
  const message = arg as NormalUrlMessage
  const oldStore = useViewStore.getState().viewInstances

  useViewStore.setState({
    viewInstances: oldStore.concat([new ViewInstance(ViewType.Other, uuidv4(), message.title)])
  })

  useViewStore.setState({
    currentViewIndex: oldStore.length
  })
})

window.api.on(ChannelType.Window, (arg: unknown) => {
  const message = arg as WindowMessage
  console.log('hey' + message.maximized)
  useViewStore.setState({
    isMaximized: message.maximized
  })
})
