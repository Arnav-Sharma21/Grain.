import { createContext, useContext } from 'react'

export const CylindricalStackContext = createContext({
  scrollToCard: () => {},
  activeIndex: 0,
  totalCards: 0,
})

export const useCylindricalStack = () => useContext(CylindricalStackContext)
