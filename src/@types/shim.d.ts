declare global {
  interface ParentNode {
    querySelector<S extends string>(selector: S): ParseSelector<S> | null

    querySelectorAll<S extends string>(
      selector: S
    ): NodeListOf<ParseSelector<S>>
  }
  interface ShadowRoot {
    querySelector<S extends string>(selector: S): ParseSelector<S> | null

    querySelectorAll<S extends string>(
      selector: S
    ): NodeListOf<ParseSelector<S>>
  }

  interface Element {
    closest<S extends string>(selector: S): ParseSelector<S> | null
  }
}
