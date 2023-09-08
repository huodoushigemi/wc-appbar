import { remove } from "./utils"

const queue = [] as (() => void)[]

const resolved = Promise.resolve()

export function enqueue(cb: () => void) {
  if (queue.includes(cb)) return
  queue.push(cb)
  resolved.then(() => {
    cb()
    remove(queue, cb)
  })
}