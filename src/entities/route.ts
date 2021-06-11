import { ChainId } from '../constants'
import invariant from 'tiny-invariant'

import { Currency, ETHER } from './currency'
import { Token, WETH } from './token'
import { Pair } from './pair'
import { Price } from './fractions/price'

export function encodePathToken(token: Token, sushi: boolean) {
  return [
    '0x',
    token.address.slice(2).padStart(62, '0'),
    sushi ? '01' : '00'
  ].join('');
}

export class Route {
  public readonly pairs: Pair[]
  public readonly path: Token[]
  public readonly input: Currency
  public readonly output: Currency
  public readonly midPrice: Price
  public readonly encodedPath: string[]


  public constructor(pairs: Pair[], input: Currency, output?: Currency) {
    invariant(pairs.length > 0, 'PAIRS')
    invariant(
      pairs.every(pair => pair.chainId === pairs[0].chainId),
      'CHAIN_IDS'
    )
    invariant(
      (input instanceof Token && pairs[0].involvesToken(input)) ||
        (input === ETHER && pairs[0].involvesToken(WETH[pairs[0].chainId])),
      'INPUT'
    )
    invariant(
      typeof output === 'undefined' ||
        (output instanceof Token && pairs[pairs.length - 1].involvesToken(output)) ||
        (output === ETHER && pairs[pairs.length - 1].involvesToken(WETH[pairs[0].chainId])),
      'OUTPUT'
    )

    const path: Token[] = [input instanceof Token ? input : WETH[pairs[0].chainId]]
    const encodedPath: string[] = [
      encodePathToken(path[0], pairs[0].sushi)
    ]
    for (const [i, pair] of pairs.entries()) {
      const currentInput = path[i]
      invariant(currentInput.equals(pair.token0) || currentInput.equals(pair.token1), 'PATH')
      const output = currentInput.equals(pair.token0) ? pair.token1 : pair.token0
      path.push(output)
      let sushi = false;
      if (i < pairs.length - 1) {
        sushi = pairs[i + 1].sushi;
      }
      encodedPath.push(encodePathToken(output, sushi))
    }

    this.pairs = pairs
    this.path = path
    this.encodedPath = encodedPath
    this.midPrice = Price.fromRoute(this)
    this.input = input
    this.output = output ?? path[path.length - 1]
  }

  public get chainId(): ChainId {
    return this.pairs[0].chainId
  }
}
