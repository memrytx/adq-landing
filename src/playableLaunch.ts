export function shouldOpenPlayableDirectly() {
  return window.matchMedia('(max-width: 1300px), (pointer: coarse)').matches
}

export function openPlayableDirectly(url: string) {
  window.location.assign(url)
}
