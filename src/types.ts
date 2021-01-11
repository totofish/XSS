// extension 內部通知事件
export enum ExtensionEvent {
  CHECK_STATE = 'CHECK_STATE',
}

// extension-ui 內部通知事件
export enum UiEvent {
  EMIT_CODE = 'EMIT_CODE',
}

export enum MenuItemId {
  ABOUT_XSS = 'about-xss',
  EXPORT_SCRIPTS = 'export-scripts',
}

export interface IScriptItem {
  title: string;
  code: string;
}
