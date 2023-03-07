import { FancyHolderOptions } from '../types'
import { initialOptions } from '../utils/initialization'
import { convertImage, createCanvas, isString } from '../utils'

export default class FancyHolder {
  private readonly options: FancyHolderOptions
  // private observer?: MutationObserver
  // private parentObserve?: MutationObserver
  // private readonly props?: Partial<FancyHolderOptions>
  private readonly target: Element | null
  private readonly canvas: HTMLCanvasElement

  constructor (args: Partial<FancyHolderOptions> = {}) {
    // this.props = args
    this.options = Object.assign({}, initialOptions, args)
    if (isString(this.options.target)) {
      this.target = document.querySelector(<string> this.options.target)
    } else {
      this.target = <Element> this.options.target
    }
    const style = getComputedStyle(<Element> this.target, null)
    const width = parseFloat(style.width)
    const height = parseFloat(style.height)
    this.canvas = createCanvas(width, height)
    document.body?.appendChild(this.canvas)
  }

  async create () {
    await this.draw()
    this.addTargetStyle()
    this.clearCanvas()
  }

  private draw (): Promise<HTMLCanvasElement> {
    const ctx = this.canvas.getContext('2d')
    if (ctx === null) {
      throw new Error('get context error')
    }

    // this.setStyle(ctx)
    return new Promise((resolve) => {
      switch (this.options.contentType) {
        case 'text':
          this.drawText(ctx, resolve)
          break
        // case 'multi-line-text':
        //   this.drawMultiLineText(ctx, resolve)
        //   break
        // case 'rich-text':
        //   this.drawRichText(ctx, resolve)
        //   break
      }
    })
  }

  private drawText (ctx: CanvasRenderingContext2D, resolve: Function) {
    this.setText(ctx, {
      text: this.options.content,
      x: 0,
      y: 0
      // maxWidth: this.options.textRowMaxWidth || this.options.width
    })
    resolve(ctx.canvas)
  }

  private setText (ctx: CanvasRenderingContext2D, params: { text: string; x: number; y: number; maxWidth?: number }) {
    let methodName: 'fillText' | 'strokeText' = 'fillText'
    if (this.options.textType === 'stroke') {
      methodName = 'strokeText'
    }
    ctx[methodName] && ctx[methodName](params.text, params.x, params.y, params.maxWidth)
  }

  private clearCanvas () {
    const ctx = this.canvas.getContext('2d')
    if (ctx === null) {
      throw new Error('get context error')
    }
    ctx.restore()
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // private attachShadowDom (image: string) {
  //   if (!this.target) {
  //     return
  //   }
  //   const shadowDom = this.target.attachShadow({ mode: 'open' })
  //   const shadowContainerDom = document.createElement('div')
  //   shadowContainerDom.style.cssText = `
  //     pointer-events: none;
  //     top: 0;
  //     bottom: 0;
  //     left: 0;
  //     right: 0;
  //     background-image: url(${image});
  //     -webkit-print-color-adjust: exact;
  //   `
  //   shadowDom.appendChild(shadowContainerDom)
  // }

  private addTargetStyle () {
    const image = convertImage(this.canvas)
    // @ts-ignore
    this.target.style.cssText = `
      background-image: url(${image});
    `
  }
}
