import { RejectedFn, ResolvedFn } from '../types'

interface Intercetor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private intercetors: Array<Intercetor<T>>

  constructor() {
    this.intercetors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.intercetors.push({
      resolved,
      rejected
    })
    return this.intercetors.length - 1
  }

  eject(id: number): void {
    if(this.intercetors[id]) {
      this.intercetors[id] = null
    }
  }

  forEach(fn:(intercepter: Intercetor<T>)=>void) : void {
    this.intercetors.forEach(intercetor => {
      if(intercetor !== null) {
        fn(intercetor)
      }
    })
  }

}
