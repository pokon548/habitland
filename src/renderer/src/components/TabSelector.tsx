import { ViewInstance } from '@renderer/data/store/viewStore'
import { Tab } from './Tab'
import { X } from '@phosphor-icons/react'

export const TabSelector = ({
  isActive,
  isClosable,
  children,
  onClick,
  onClose
}: {
  isActive: boolean
  isClosable: boolean
  children: ViewInstance
  onClick: () => void
  onClose: () => void
}): JSX.Element => (
  <li className="relative">
    <div onClick={onClick} role="tab" aria-selected={isActive ? 'true' : 'false'}>
      <div
        className={`flex h-10 tab-outer-style px-3.5 py-1.5 ${
          isActive ? 'bg-zinc-100 dark:bg-zinc-700 rounded-t' : ''
        }`}
      >
        <Tab title={children.title} type={children.type} />
        {isClosable ? (
          <span className="flex items-center">
            <button
              className="pl-2"
              onClick={(e): void => {
                e.stopPropagation()
                onClose()
              }}
              title="Close tab"
            >
              <X className="text-gray-500 dark:text-white" />
            </button>
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  </li>
)
