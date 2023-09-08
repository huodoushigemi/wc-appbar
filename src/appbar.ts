import { enqueue } from "./scheduler"
import { getScrollParent, h, clamp, useRaf } from "./utils"

const defaultProps = {
  minh: 56,
  maxh: 0,
  floating: false,
  pinned: false,
  snap: false,
  elevation: '0 4px 8px -2px #00000020'
}

type Props = typeof defaultProps

const camlize = (s: string) => s.replace(/-\w/g, (e => e.slice(1).toUpperCase()))
const hyphenate = (s: string) => s.replace(/(.)([A-Z])/g, (_, s: string, w: string) => s + '-' + w.toLowerCase())

export class AppbarElement extends HTMLElement {
  static get observedAttributes() { return Object.keys(defaultProps).map(hyphenate) }

  declare minh: number
  declare maxh: number
  declare floating: boolean
  declare pinned: boolean
  declare snap: boolean
  declare elevation: string

  props = { ...defaultProps }

  #scrollEl!: HTMLElement | Window

  #box!: HTMLDivElement
  #hostStyle!: HTMLStyleElement
  #size = [0, 0]

  /**
   * Value range `[0, maxh]`
   */
  offset = 0

  #deltaY = 0
  #dirOff = 0

  #timer!: number
  #raf!: ReturnType<typeof useRaf>

  get _maxh() {
    return Math.max(this.minh, this.maxh)
  }
  
  /**
   * Value range `[0, maxh]`
   */
  get shrinkOffset() {
    return this._maxh - this.offset
  }

  /**
   * Value range `[minh, maxh]`
   */
  get shrinkH() {
    return this._maxh - this.h
  }

  /**
   * Value range `[-minh, 0]`
   */
  get y() {
    return this.pinned ? 0 : Math.min(this.offset - this.minh, 0)
  }

  /**
   * Value range `[minh, maxh]`
   */
  get h() {
    return clamp(this.offset, this.minh, this._maxh)
  }

  constructor() {
    super()
    const root = this.attachShadow({ mode: 'open' })
    root.appendChild(this.#hostStyle = h('style'))
  }

  connectedCallback() {
    // console.log('connectedCallback');
    new ResizeObserver(([e]) => {
      this.#size[0] = e.contentRect.width
      this.#size[1] = e.contentRect.height
      this.#onScroll()
    }).observe(this)

    this.#scrollEl = getScrollParent(this)
    this.#scrollEl.addEventListener('scroll', this.#onScroll, { passive: true })

    this.#box = h('div', null, [h('slot')])
    this.shadowRoot!.appendChild(this.#box)

    this.offset = this._maxh
  }

  disconnectedCallback() {
    this.#scrollEl.removeEventListener('scroll', this.#onScroll)
  }

  attributeChangedCallback<K extends keyof Props>(k: K, old: any, val: Props[K]) {
    // console.log('attributeChangedCallback');
    // @ts-ignore
    if (typeof defaultProps[k] === 'boolean') val = val !== 'false' ? true : false
    else val = defaultProps[k].constructor(val)

    this.props[k] = val

    this.isConnected && enqueue(this.#onScroll)
  }

  #prevScrollY = 0
  get #scrollY(): number {
    return this.#scrollEl instanceof HTMLElement ? this.#scrollEl.scrollTop : this.#scrollEl.scrollY
  }

  #onScroll = () => {
    const { props, _maxh: maxh } = this
    const scrollY = this.#scrollY

    const { floating, snap } = props
    const _dy = this.#deltaY
    const dy = this.#deltaY = -this.#prevScrollY + (this.#prevScrollY = scrollY)

    // 方向变化
    if ((_dy > 0 && dy < 0) || (_dy < 0 && dy > 0)) this.#dirOff = 0
    this.#dirOff += dy

    this.offset = floating ? clamp(this.offset - dy, 0, maxh) : Math.max(0, maxh - scrollY)

    if (floating && snap && Math.abs(this.#dirOff) > 10) {
      // todo > animate
      this.#raf?.pause()
      clearTimeout(this.#timer)
      this.#timer = setTimeout(() => {
        const so = this.offset, eo = dy < 0 ? maxh : Math.max(maxh - scrollY, 0)
        
        this.#raf = useRaf(() => {
          const { r } = this.#raf
          this.offset = so + (eo - so) * r
          enqueue(this.render)
        })
        this.#raf.resume()
      }, 50)
    }
    
    enqueue(this.render)
  }
  
  render = () => {
    const { props, h, y, style, offset, shrinkOffset, shrinkH, minh, _maxh: maxh } = this
    Object.assign(this.#box.style, {
      position: 'fixed',
      width: `${this.#size[0]}px`,
      height: `${h}px`,
      boxSizing: 'border-box',
      boxShadow: props.pinned || (props.floating && this.offset != 0) ? props.elevation : '',
      transform: `translateY(${y}px)`
    })

    this.#hostStyle.innerHTML = `:host { position: relative; display: block; height: ${maxh}px; }`

    style.setProperty('--wc-appbar-minh', minh + '')
    style.setProperty('--wc-appbar-maxh', maxh + '')
    style.setProperty('--wc-appbar-offset', offset + '')
    style.setProperty('--wc-appbar-shrink-offset', shrinkOffset + '')
    style.setProperty('--wc-appbar-shrink-h', shrinkH + '')
    style.setProperty('--wc-appbar-h', h + '')
    style.setProperty('--wc-appbar-y', y + '')

    this.dispatchEvent(new Event('update'))
  }
}

Object.keys(defaultProps).forEach(prop => {
  Object.defineProperty(AppbarElement.prototype, prop, {
    // @ts-ignore
    get() { return this.props[prop] ?? defaultProps[prop] },
    // @ts-ignore
    set(v) { this.setAttribute(prop, typeof defaultProps[prop] === 'boolean' ? (v ?? defaultProps[prop]) : v) }
  })
})
