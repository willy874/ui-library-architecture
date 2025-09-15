import { useEffect, useLayoutEffect } from 'react'

export const canUseDom = () => !!(typeof window !== 'undefined' && window.document && window.document.createElement)

export const useInternalLayoutEffect = canUseDom()
  ? useLayoutEffect
  : useEffect
