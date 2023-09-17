export enum ChannelType {
  PlaceHolder = 'Just placeholder'
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
