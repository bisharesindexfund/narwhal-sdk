import { ChainId, WBNB, Token, Fetcher } from '../src';

// TODO: replace the provider in these tests
describe.skip('data', () => {
  it('Token', async () => {
    const token = await Fetcher.fetchTokenData(ChainId.MAINNET, '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'); // CAKE
    expect(token.decimals).toEqual(18);
  });


  it('Pair', async () => {
    const token = new Token(ChainId.MAINNET, '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82', 18); // CAKE
    const pair = await Fetcher.fetchPairData(WBNB[ChainId.MAINNET], token, true);
    console.log('it ~ pair', pair);
    expect(pair.liquidityToken.address).toEqual('0x8B22F85d0c844Cf793690F6D9DFE9F11Ddb35449');
  });
});
