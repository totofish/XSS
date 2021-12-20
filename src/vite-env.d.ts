/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DARK_THEME: string
  readonly VITE_NOTICE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
