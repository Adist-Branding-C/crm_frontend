/// <reference types="vite/client" />

declare module '*.jsx' {
  import { ComponentType } from 'react'

  const Component: ComponentType<any>

  export default Component
}

declare module '*.css';