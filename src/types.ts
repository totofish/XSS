// extension 內部通知事件
export enum ExtensionEvent {
  CHECK_STATE = 'CHECK_STATE',
}

// extension-ui 內部通知事件
export enum UiEvent {
  EMIT_CODE = 'EMIT_CODE',
}

export interface IScriptItem {
  title?: string;
  code?: string;
}

export interface SaveScriptItems {
  script1?: IScriptItem;
  script2?: IScriptItem;
  script3?: IScriptItem;
  script4?: IScriptItem;
  script5?: IScriptItem;
  script6?: IScriptItem;
  script7?: IScriptItem;
  script8?: IScriptItem;
  script9?: IScriptItem;
}

export type ScriptItemKeys = keyof SaveScriptItems;
