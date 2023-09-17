import { House } from '@phosphor-icons/react'
import { ViewType } from '@renderer/data/store/viewStore'

interface Props {
  title: string
  type: ViewType
}

// TODO: Display different icon based on view type
export function Tab({ title, type }: Props): JSX.Element {
  console.log(type)
  return (
    <div className="flex place-items-center select-none">
      <House weight="duotone" className="dark:text-white text-gray-500" />

      <div className="pl-2 truncate dark:text-white">{title}</div>
    </div>
  )
}
