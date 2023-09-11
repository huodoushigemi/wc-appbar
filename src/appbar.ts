import { enqueue } from "./scheduler"
import { getScrollParent, h, clamp, useRaf } from "./utils"

const SIZE = Symbol('SIZE')

interface SizeableElement extends HTMLElement {
  [SIZE]: [number, number]
}

const defaultProps = {
  minh: 56,
  maxh: 0,
  floating: false,
  pinned: false,
  snap: false,
  elevation: '0 4px 8px -2px #00000020',
}

type Props = typeof defaultProps

const camlize = (s: string) => s.replace(/-\w/g, (e => e.slice(1).toUpperCase()))
const hyphenate = (s: string) => s.replace(/(.)([A-Z])/g, (_, s: string, w: string) => s + '-' + w.toLowerCase())

export class AppbarElement extends HTMLElement implements SizeableElement {
  static get observedAttributes() { return Object.keys(defaultProps).map(hyphenate) }

  declare minh: number
  declare maxh: number
  declare floating: boolean
  declare pinned: boolean
  declare snap: boolean
  declare elevation: string

  props = { ...defaultProps }

  #scrollEl!: HTMLElement | Window

  #box!: HTMLElement
  #bottom!: SizeableElement
  #hostStyle!: HTMLStyleElement
  ;[SIZE]: [number, number] = [0, 0]

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
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.#scrollEl = getScrollParent(this)
    this.#scrollEl.addEventListener('scroll', this.#onScroll, { passive: true })
    
    this.shadowRoot!.replaceChildren(
      this.#box = h('div', null, [
        h('slot'),
        // @ts-ignore
        this.#bottom = h('div', { [SIZE]: [0, 0], style: 'position: absolute; bottom: 0; width: 100%;' }, [
          h('slot', { name: 'bottom' })
        ]),
      ]),
      this.#hostStyle = h('style')
    )

    const sizeObs = new ResizeObserver((es) => {
      es.forEach((e) => {
        (e.target as SizeableElement)[SIZE] = [e.contentRect.width, e.contentRect.height]
      })
      this.#onScroll()
    })

    sizeObs.observe(this)
    sizeObs.observe(this.#bottom)

    this.offset = this._maxh
  }

  disconnectedCallback() {
    this.#scrollEl.removeEventListener('scroll', this.#onScroll)
    this.shadowRoot!.replaceChildren()
  }

  attributeChangedCallback<K extends keyof Props>(k: K, old: any, val: Props[K]) {
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
    // bottom height
    const bh = this.#bottom[SIZE][1]

    // Box Style
    Object.assign(this.#box.style, {
      position: 'fixed',
      width: `${this[SIZE][0]}px`,
      height: `${h + bh}px`,
      boxShadow: props.pinned || (props.floating && this.offset != 0) ? props.elevation : '',
      transform: `translateY(${y}px)`,
      zIndex: 1,
      background: 'var(--wc-appbar-bg)'
    })

    const _0 = `:host { position: relative; display: block; height: ${maxh + bh}px; }`
    if (this.#hostStyle.innerHTML != _0) this.#hostStyle.innerHTML = _0

    // Css Var
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
