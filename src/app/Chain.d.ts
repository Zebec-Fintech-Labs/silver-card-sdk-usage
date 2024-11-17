export interface Chain {
  name: string
  chainId?: number
  img: string | StaticImageData
  chainSymbol: string
}

export interface ChainContextProps {
  currentChain: Chain
  setChain: (chain: Chain) => void
  chainLists: Chain[]
}
