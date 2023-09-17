import { ViewType } from '@renderer/data/store/viewStore'
import { format } from 'date-fns'

import { zhCN } from 'date-fns/locale'
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import { FixedSizeList as List } from 'react-window'
import AutoResizer from 'react-virtualized-auto-sizer'
import {
  BowlFood,
  CheckCircle,
  Circle,
  Leaf,
  ListChecks,
  MoonStars,
  Question,
  SealCheck,
  ShieldChevron,
  Sun,
  Wind
} from '@phosphor-icons/react'

interface Props {
  title: string
  type: ViewType
}

enum FinishState {
  FINISHED,
  FINISHED_MORE,
  PENDING,
  UNFINISHED
}

const FakeList = [
  {
    title: <div className="text-gray-300 line-through">7:30 早起</div>,
    finishState: FinishState.UNFINISHED,
    icon: (
      <button
        className="flex place-items-center place-content-center w-10 h-10 rounded-full bg-gray-300"
        disabled
      >
        <Sun weight="duotone" className="text-white h-5 w-5" />
      </button>
    )
  },
  {
    title: <div className="text-amber-500">吃健康早饭</div>,
    finishState: FinishState.FINISHED,
    icon: (
      <button
        className="flex place-items-center place-content-center w-10 h-10 rounded-full bg-amber-500"
        disabled
      >
        <BowlFood weight="duotone" className="text-white h-5 w-5" />
      </button>
    )
  },
  {
    title: <div className="text-green-500">静心</div>,
    finishState: FinishState.FINISHED_MORE,
    icon: (
      <button
        className="flex place-items-center place-content-center w-10 h-10 rounded-full bg-green-500"
        disabled
      >
        <Leaf weight="duotone" className="text-white h-5 w-5" />
      </button>
    )
  },
  {
    title: <div className="text-green-500">IAP 呼吸训练</div>,
    finishState: FinishState.FINISHED_MORE,
    icon: (
      <button
        className="flex place-items-center place-content-center w-10 h-10 rounded-full bg-green-500"
        disabled
      >
        <Wind weight="duotone" className="text-white h-5 w-5" />
      </button>
    )
  },
  {
    title: <div className="text-blue-500">抵抗诱惑</div>,
    finishState: FinishState.PENDING,
    icon: (
      <button
        className="flex place-items-center place-content-center w-10 h-10 rounded-full bg-blue-500"
        disabled
      >
        <ShieldChevron weight="duotone" className="text-white h-5 w-5" />
      </button>
    )
  },
  {
    title: <div className="text-red-500">清空 Todoist 待办箱</div>,
    finishState: FinishState.PENDING,
    icon: (
      <button
        className="flex place-items-center place-content-center w-10 h-10 rounded-full bg-red-500"
        disabled
      >
        <ListChecks weight="duotone" className="text-white h-5 w-5" />
      </button>
    )
  },
  {
    title: <div className="text-purple-500">10:30 以前睡觉</div>,
    finishState: FinishState.PENDING,
    icon: (
      <button
        className="flex place-items-center place-content-center w-10 h-10 rounded-full bg-purple-500"
        disabled
      >
        <MoonStars weight="duotone" className="text-white h-5 w-5" />
      </button>
    )
  }
]

// TODO: Display different icon based on view type
export function HomeView(): JSX.Element {
  const [selected, setSelected] = useState<Date>(new Date())

  const Row = ({ index, style }) => (
    <div style={style}>
      <div className="flex gap-4">
        <div className="icon">
          {index < FakeList.length ? (
            FakeList.at(index)?.icon
          ) : (
            <button
              className="flex place-items-center place-content-center w-10 h-10 rounded-full bg-gray-500"
              disabled
            >
              <Question weight="duotone" className="text-white h-5 w-5" />
            </button>
          )}
        </div>
        <div className="detail flex place-items-center">
          {index < FakeList.length ? FakeList.at(index)?.title : 'what'}
        </div>
        <div className="state flex flex-grow place-content-end place-items-center pr-5">
          {index < FakeList.length ? (
            FakeList.at(index)?.finishState === FinishState.FINISHED ? (
              <CheckCircle weight="duotone" className="text-gray-500 h-5 w-5" />
            ) : FakeList.at(index)?.finishState === FinishState.UNFINISHED ? (
              <Circle weight="duotone" className="text-gray-200 h-5 w-5" />
            ) : FakeList.at(index)?.finishState === FinishState.FINISHED_MORE ? (
              <SealCheck weight="duotone" className="text-orange-500 h-5 w-5" />
            ) : (
              <Circle weight="duotone" className="text-gray-500 h-5 w-5" />
            )
          ) : (
            <CheckCircle weight="duotone" className="text-gray-500 h-5 w-5" />
          )}
        </div>
      </div>
    </div>
  )

  const Example = (): JSX.Element => (
    <AutoResizer>
      {({ height, width }) => (
        <List height={height} itemCount={FakeList.length} itemSize={55} width={width}>
          {Row}
        </List>
      )}
    </AutoResizer>
  )

  return (
    <div className="flex flex-row h-full w-full select-none">
      <div className="flex flex-col">
        <div className="flex flex-col w-full h-full">
          <div className="date-pinker border-b">
            <DayPicker mode="single" locale={zhCN} selected={selected} onSelect={setSelected} />
          </div>
          <div className="flex flex-col w-full h-full historic-achievement">
            <div className="flex">
              <div className="text-xl font-bold pl-5 pt-5">
                {format(selected, 'M 月 d 日', {
                  locale: zhCN
                })}{' '}
                状态
              </div>
            </div>
            <div className="flex w-full h-full pl-5 mr-5 pt-3">
              <Example />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-l">
        <div className="text-2xl font pl-5 pt-5">当下</div>
      </div>
    </div>
  )
}
