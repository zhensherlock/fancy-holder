import { FancyHolderOptions } from '../types'
import { initialOptions } from '../utils/initialization'

export default class FancyHolder {
  private readonly options: FancyHolderOptions
  // private observer?: MutationObserver
  // private parentObserve?: MutationObserver
  private readonly props?: Partial<FancyHolderOptions>
  // private canvas: HTMLCanvasElement

  constructor (args: Partial<FancyHolderOptions> = {}) {
    this.props = args
    this.options = Object.assign({}, initialOptions, args)
    console.log(this.options, this.props)
  }
}
