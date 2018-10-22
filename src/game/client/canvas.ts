export class Canvas {
  // Class to handle the manipulation of the canvas, for drawing and clearing etc

  // The canvas element
  private canvas : HTMLCanvasElement

  // The drawing context
  private context : CanvasRenderingContext2D

  /**
   * Create an instance of our Canvas wrapper
   * @param elementId - The id of the canvas element to retrieve
   */
  constructor(elementId : string) {
    console.log(document.getElementById('picto-canvas'))
    this.canvas = document.getElementById(elementId) as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')
  }
}
