import { ChainId, Token, Pair, TokenAmount, WBNB, Price } from '../src';

describe('Pair', () => {
  const BUSD = new Token(ChainId.MAINNET, '0xe9e7cea3dedca5984780bafc599bd69add087d56', 18, 'BUSD', 'BUSD Token');
  const CAKE = new Token(ChainId.MAINNET, '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', 18, 'Cake', 'PancakeSwap Token');

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(() => new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(WBNB[ChainId.TESTNET], '100'), false)).toThrow(
        'CHAIN_IDS'
      );
    });
  });

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      expect(Pair.getAddress(BUSD, CAKE, false)).toEqual('0xbDA9B353A8A8653DdA15d5DbB27E84Df9038Fe24');
    });
  });

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(CAKE, '100'), true).token0).toEqual(CAKE);
      expect(new Pair(new TokenAmount(CAKE, '100'), new TokenAmount(BUSD, '100'), true).token0).toEqual(CAKE);
    });
  });
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(CAKE, '100'), true).token1).toEqual(BUSD);
      expect(new Pair(new TokenAmount(CAKE, '100'), new TokenAmount(BUSD, '100'), true).token1).toEqual(BUSD);
    });
  });
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(CAKE, '101'), true).reserve0).toEqual(
        new TokenAmount(CAKE, '101')
      );
      expect(new Pair(new TokenAmount(CAKE, '101'), new TokenAmount(BUSD, '100'), true).reserve0).toEqual(
        new TokenAmount(CAKE, '101')
      );
    });
  });
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(CAKE, '101'), true).reserve1).toEqual(
        new TokenAmount(BUSD, '100')
      );
      expect(new Pair(new TokenAmount(CAKE, '101'), new TokenAmount(BUSD, '100'), true).reserve1).toEqual(
        new TokenAmount(BUSD, '100')
      );
    });
  });

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(new Pair(new TokenAmount(BUSD, '101'), new TokenAmount(CAKE, '100'), true).token0Price).toEqual(
        new Price(CAKE, BUSD, '100', '101')
      );
      expect(new Pair(new TokenAmount(CAKE, '100'), new TokenAmount(BUSD, '101'), true).token0Price).toEqual(
        new Price(CAKE, BUSD, '100', '101')
      );
    });
  });

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(new Pair(new TokenAmount(BUSD, '101'), new TokenAmount(CAKE, '100'), true).token1Price).toEqual(
        new Price(BUSD, CAKE, '101', '100')
      );
      expect(new Pair(new TokenAmount(CAKE, '100'), new TokenAmount(BUSD, '101'), true).token1Price).toEqual(
        new Price(BUSD, CAKE, '101', '100')
      );
    });
  });

  describe('#priceOf', () => {
    const pair = new Pair(new TokenAmount(BUSD, '101'), new TokenAmount(CAKE, '100'), true);
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(CAKE)).toEqual(pair.token0Price);
      expect(pair.priceOf(BUSD)).toEqual(pair.token1Price);
    });

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WBNB[ChainId.MAINNET])).toThrow('TOKEN');
    });
  });

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(CAKE, '101'), true).reserveOf(BUSD)).toEqual(
        new TokenAmount(BUSD, '100')
      );
      expect(new Pair(new TokenAmount(CAKE, '101'), new TokenAmount(BUSD, '100'), true).reserveOf(BUSD)).toEqual(
        new TokenAmount(BUSD, '100')
      );
    });

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(new TokenAmount(CAKE, '101'), new TokenAmount(BUSD, '100'), true).reserveOf(WBNB[ChainId.MAINNET])
      ).toThrow('TOKEN');
    });
  });

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(CAKE, '100'), true).chainId).toEqual(ChainId.MAINNET);
      expect(new Pair(new TokenAmount(CAKE, '100'), new TokenAmount(BUSD, '100'), true).chainId).toEqual(ChainId.MAINNET);
    });
  });
  describe('#involvesToken', () => {
    expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(CAKE, '100'), true).involvesToken(BUSD)).toEqual(true);
    expect(new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(CAKE, '100'), true).involvesToken(CAKE)).toEqual(true);
    expect(
      new Pair(new TokenAmount(BUSD, '100'), new TokenAmount(CAKE, '100'), true).involvesToken(WBNB[ChainId.MAINNET])
    ).toEqual(false);
  });
});
