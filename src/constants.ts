import JSBI from 'jsbi';

// exports for external consumption
export type BigintIsh = JSBI | bigint | string;

export enum ChainId {
  MAINNET = 56,
  TESTNET = 97,
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export const FACTORY_ADDRESS_APE = '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6';

export const FACTORY_ADDRESS_CAKE = '0xBCfCcbde45cE874adCB698cC183deBcF17952812';

export const INIT_CODE_HASH_APE = '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b';

export const INIT_CODE_HASH_CAKE = '0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66';

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000);

// exports for internal consumption
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const TWO = JSBI.BigInt(2);
export const THREE = JSBI.BigInt(3);
export const FIVE = JSBI.BigInt(5);
export const TEN = JSBI.BigInt(10);
export const _100 = JSBI.BigInt(100);
export const _997 = JSBI.BigInt(997);
export const _1000 = JSBI.BigInt(1000);

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
};
