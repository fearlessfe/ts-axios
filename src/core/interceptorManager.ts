import { ResolvedFn, RejectedFn } from "../types"

interface Intercetor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Intercetor<T>|null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  eject(id: number): void {
    if(this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  forEach(fn: (intercetor: Intercetor<T>)=>void):void {
    this.interceptors.forEach(intercetor => {
      if(intercetor!== null) {
        fn(intercetor)
      }
    })
  }
}
