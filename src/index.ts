import { Controller } from "@hotwired/stimulus"

interface Option {
  offset?: number
  behavior?: string
}

export default class ScrollTo extends Controller<HTMLAnchorElement> {
  offsetValue: number
  behaviorValue: string
  hasOffsetValue: boolean

  static values = {
    offset: Number,
    behavior: String,
  }

  initialize(): void {
    this.scroll = this.scroll.bind(this)
  }

  connect(): void {
    this.element.addEventListener("click", this.scroll)
  }

  disconnect(): void {
    this.element.removeEventListener("click", this.scroll)
  }

  scroll(event: Event): void {
    const id: string = this.element.hash.replace(/^#/, "")
    const target = document.getElementById(id)

    if (target) {
      event.preventDefault()

      const elementPosition: number = target.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition: number = elementPosition - this.offset

      // eslint-disable-next-line no-undef
      window.scrollTo(<ScrollToOptions>{
        top: offsetPosition,
        behavior: this.behavior,
      })
    } else {
      console.warn(`[stimulus-scroll-to] The element with the id: "${id}" does not exist on the page.`)
      return
    }
  }

  get offset(): number {
    if (this.hasOffsetValue) {
      return this.offsetValue
    }

    if (this.defaultOptions.offset !== undefined) {
      return this.defaultOptions.offset
    }

    return 10
  }

  get behavior(): string {
    return this.behaviorValue || this.defaultOptions.behavior || "smooth"
  }

  get defaultOptions(): Option {
    return {}
  }
}
