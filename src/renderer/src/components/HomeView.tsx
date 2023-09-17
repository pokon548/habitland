import { ViewType } from '@renderer/data/store/viewStore'

import { format } from 'date-fns'
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

interface Props {
  title: string
  type: ViewType
}

// TODO: Display different icon based on view type
export function HomeView(): JSX.Element {
  const [selected, setSelected] = useState<Date>()

  let footer = <p>Please pick a day.</p>
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>
  }
  return (
    <div className="flex h-full w-full select-none">
      <DayPicker mode="single" selected={selected} onSelect={setSelected} footer={footer} />
    </div>
  )
}
