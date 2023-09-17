import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

interface AppState {
  currentViewIndex: number
  isMaximized: boolean
  viewInstances: Array<ViewInstance>
  setCurrentViewIndex: (index: number) => void
  removeViewInstanceByIndex: (index: number) => void
}

export enum ViewType {
  Home,
  Other
}

interface IViewInstance {
  type: ViewType
  uuid: string
  title: string
}

export class ViewInstance implements IViewInstance {
  type: ViewType
  uuid: string
  title: string

  constructor(type: ViewType, uuid: string, title: string) {
    this.type = type
    this.uuid = uuid
    this.title = title
  }
}

export const useViewStore = create<AppState>()(
  subscribeWithSelector((set) => ({
    currentViewIndex: 0,
    isMaximized: false,
    viewInstances: [new ViewInstance(ViewType.Home, uuidv4(), '首页')],
    setCurrentViewIndex: (index: number): void => set(() => ({ currentViewIndex: index })),
    removeViewInstanceByIndex: (index: number): void =>
      set((state) => ({
        viewInstances: state.viewInstances.filter((_data, idx) => idx !== index)
      }))
  }))
)
