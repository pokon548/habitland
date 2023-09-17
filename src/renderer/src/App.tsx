import { TabSelector } from './components/TabSelector'
import { ViewType, useViewStore } from './data/store/viewStore'

import './styles/react-tabs.css'
import { Minus, Square, X } from '@phosphor-icons/react'

function App(): JSX.Element {
  const tabs = useViewStore((state) => state.viewInstances)
  const [activeViewIndex, setActiveViewIndex] = useViewStore((state) => [
    state.currentViewIndex,
    state.setCurrentViewIndex
  ])
  const removeViewById = useViewStore((state) => state.removeViewInstanceByIndex)

  return (
    <div className="container w-screen h-screen max-w-full justify-items-center">
      <div className="flex h-10">
        <ul
          className="tab-switcher scroll-smooth flex h-10 grow items-center bg-zinc-300 dark:bg-zinc-800 overflow-x-hidden overflow-y-hidden"
          onWheel={(event): void => {
            const target = event.currentTarget as HTMLUListElement
            const deltaY = event.deltaY
            if (deltaY < 0) {
              console.log('left')
              target.scrollLeft += 50
            } else {
              console.log('right')
              target.scrollLeft -= 50
            }
          }}
        >
          {tabs.map((tab) => (
            <TabSelector
              key={tab.uuid}
              isActive={tabs.indexOf(tab) === activeViewIndex}
              isClosable={tab.type !== ViewType.Home}
              onClick={(): void => {
                const index = tabs.indexOf(tab)
                setActiveViewIndex(index)
              }}
              onClose={(): void => {
                const index = tabs.indexOf(tab)
                removeViewById(index)
                setActiveViewIndex(index - 1)
              }}
            >
              {tab}
            </TabSelector>
          ))}
          <div className="titlebar flex h-full w-full growth bg-zinc-300 dark:bg-zinc-800"></div>
        </ul>

        <div className="bg-zinc-300 dark:bg-zinc-800 flex content-center">
          <button
            onClick={(e): void => {
              e.preventDefault()
              window.electron.ipcRenderer.send('minimize')
            }}
          >
            <Minus className="w-4 h-4 mx-2 text-gray-400" />
          </button>
          <button
            onClick={(e): void => {
              e.preventDefault()
              window.electron.ipcRenderer.send('maximize')
            }}
          >
            <Square className="w-4 h-4 mx-1 ml-1 text-gray-400" />
          </button>
          <button
            onClick={(e): void => {
              e.preventDefault()
              window.electron.ipcRenderer.send('close')
            }}
          >
            <X className="w-4 h-4 mx-2 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex flex-col tab-panel">
        {tabs.map((tab) => (
          <div
            className={tabs.indexOf(tab) === activeViewIndex ? 'w-full h-full' : 'hidden'}
            key={tab.uuid}
          >
            {tab.type}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
