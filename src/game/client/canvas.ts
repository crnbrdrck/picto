export class Canvas {
  // Class to handle the manipulation of the canvas, for drawing and clearing etc

  // The canvas element
  private canvas : HTMLCanvasElement

  // Maintain arrays of numbers to keep track of click coords
  private clicks : number[][]

  // The drawing context
  private context : CanvasRenderingContext2D

  // Maintain which clicks are drags and which are not
  private drags : boolean[]

  // Keep a flag for whether or not we are currently drawing something
  private isPainting : boolean = false

  /**
   * Create an instance of our Canvas wrapper
   * @param elementId - The id of the canvas element to retrieve
   */
  constructor(elementId : string) {
    // Set up necessary array
    this.clicks = []
    this.drags = []

    // Get the canvas and the context
    this.canvas = document.getElementById(elementId) as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')

    // Set the canvas height and width to be the computed height and width
    this.resize()
    // Set resize to happen on window resizing
    window.addEventListener('resize', () => { this.resize() }, false)

    // Set up the drawing vars
    this.context.strokeStyle = '#000'
    this.context.lineWidth = 5
    this.context.lineJoin = 'round'

    // Create event listeners for drawing
    this.canvas.addEventListener('mousedown', (e) => { this.mouseDown(e) }, false)
    this.canvas.addEventListener('mousemove', (e) => { this.mouseMove(e) }, false)
    this.canvas.addEventListener('mouseup', () => { this.stopPainting() }, false)
    this.canvas.addEventListener('mouseleave', () => { this.stopPainting() }, false)

    // Listen for the clear event to clear data
    this.canvas.addEventListener('clear-canvas', () => { this.clear() }, false)
  }

  private clear() {
    // Delete data from the arrays
    this.clicks = []
    this.drags = []

    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private resize() {
    // Resize the canvas object using the computed style, since we use vh/vw
    const style = getComputedStyle(this.canvas)
    this.canvas.height = +(style.height.split('px')[0])
    this.canvas.width = +(style.width.split('px')[0])
  }

  private mouseDown(e : MouseEvent) {
    // Update the clicks array with x and y coords on the canvas
    this.isPainting = true
    this.addClick(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop, false)
    this.draw()
  }

  private mouseMove(e : MouseEvent) {
    // Add click points while dragging if we're currently painting
    if (this.isPainting) {
      this.addClick(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop, true)
      this.draw()
    }
  }

  private stopPainting() {
    this.isPainting = false
  }

  private addClick(x : number, y : number, drag : boolean) {
    // Adds a new click to the arrays
    this.clicks.push([x, y])
    this.drags.push(drag)
  }

  private draw() {
    // Handles updating the canvas with new drawing
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw the lines
    let click : number[]
    let i : string | number
    let drag : boolean
    for (i in this.clicks) {
      i = +i
      this.context.beginPath()
      click = this.clicks[i]
      drag = this.drags[i]
      // Move to the previous spot (if there was one) and if we're in the middle of a move
      if (drag && i > 0) {
        this.context.moveTo(this.clicks[i - 1][0], this.clicks[i - 1][1])
      }
      else {
        this.context.moveTo(click[0], click[1])
      }

      // Draw a line to the current spot
      this.context.lineTo(click[0], click[1])
      this.context.stroke()
      this.context.closePath()
    }
  }
}
