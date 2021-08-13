import { ChainId } from '../constants';
import { Currency } from './currency';
import { Token } from './token';
import { Pair } from './pair';
import { Price } from './fractions/price';
export declare function encodePathToken(token: Token, pancakeswap: boolean): string;
export declare class Route {
    readonly pairs: Pair[];
    readonly path: Token[];
    readonly input: Currency;
    readonly output: Currency;
    readonly midPrice: Price;
    readonly encodedPath: string[];
    constructor(pairs: Pair[], input: Currency, output?: Currency);
    get chainId(): ChainId;
}
