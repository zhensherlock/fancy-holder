export const isString = (value: any): boolean => {
  return typeof value === 'string'
}
export const convertImage = (canvas: HTMLCanvasElement): string => {
  return canvas.toDataURL('image/png', 1)
}

export const createCanvas = (width: number, height: number): HTMLCanvasElement => {
  const ratio = window.devicePixelRatio || 1
  const canvas = document.createElement('canvas')
  canvas.width = width * ratio // actual rendered pixel
  canvas.height = height * ratio // actual rendered pixel
  canvas.style.width = `${width}px` // control display size
  canvas.style.height = `${height}px` // control display size
  canvas.getContext('2d')?.setTransform(ratio, 0, 0, ratio, 0, 0)
  return canvas
}
