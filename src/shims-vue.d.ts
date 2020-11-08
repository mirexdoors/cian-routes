declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare namespace browser.tabs {
  export function create(tabInfo: chrome.tabs.CreateProperties): Promise<void>
  export function query(queryInfo: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]>
}
