export enum ChannelType {
  PlaceHolder = 'Just placeholder',
  Window = 'Receive window status from node process'
}

export class WindowMessage {
  maximized: boolean
  constructor(maximized: boolean) {
    this.maximized = maximized
  }
}

export class NormalUrlMessage {
  url: string
  title: string
  webId: number
  constructor(url: string, title: string, webId: number) {
    this.url = url
    this.title = title
    this.webId = webId
  }
}
