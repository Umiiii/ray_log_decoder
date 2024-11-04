
import { struct, u8 } from "@solana/buffer-layout";
import { u64, u128, publicKey } from "@solana/buffer-layout-utils";
import { PublicKey } from "@solana/web3.js";


const LOG_TO_INSTRUCTION_MAP = {
  Init: "initialize",
  Init2: "initialize2",
  Deposit: "deposit",
  Withdraw: "withdraw",
  SwapBaseIn: "swapBaseIn",
  SwapBaseOut: "SwapBaseOut",
};

interface InitLog {
  logType: number;
  time: bigint;
  pcDecimals: bigint;
  coinDecimals: number;
  pcLotSize: bigint;
  coinLotSize: bigint;
  pcAmount: bigint;
  coinAmount: bigint;
  market: PublicKey;
}

const InitLogLayout = struct<InitLog>([
  u8("logType"),
  u64("time"),
  u8("pcDecimals"),
  u8("coinDecimals"),
  u64("pcLotSize"),
  u64("coinLotSize"),
  u64("pcAmount"),
  u64("coinAmount"),
  publicKey("market"),
]);

interface DepositLog {
  logType: number;
  maxCoin: bigint;
  maxPc: bigint;
  base: bigint;
  poolCoin: bigint;
  poolPc: bigint;
  poolLp: bigint;
  calcPnlX: bigint;
  calcPnlY: bigint;
  deductCoin: bigint;
  deductPc: bigint;
  mintLp: bigint;
}

const DepositLogLayout = struct<DepositLog>([
  u8("logType"),
  u64("maxCoin"),
  u64("maxPc"),
  u64("base"),
  u64("poolCoin"),
  u64("poolPc"),
  u64("pcAmount"),
  u64("poolLp"),
  u128("calcPnlX"),
  u128("calcPnlY"),
  u64("deductCoin"),
  u64("deductPc"),
  u64("mintLp"),
]);

interface WithdrawLog {
  logType: number;
  withdrawLp: bigint;
  userLp: bigint;
  poolCoin: bigint;
  poolPc: bigint;
  poolLp: bigint;
  calcPnlX: bigint;
  calcPnlY: bigint;
  outCoin: bigint;
  outPc: bigint;
}

const WithdrawLogLayout = struct<WithdrawLog>([
  u8("logType"),
  u64("withdrawLp"),
  u64("userLp"),
  u64("poolCoin"),
  u64("poolPc"),
  u64("poolLp"),
  u128("calcPnlX"),
  u128("calcPnlY"),
  u64("outCoin"),
  u64("outPc"),
]);

interface SwapBaseInLog {
  logType: number;
  amountIn: bigint;
  minimumOut: bigint;
  direction: bigint;
  userSource: bigint;
  poolCoin: bigint;
  poolPc: bigint;
  outAmount: bigint;
}

const SwapBaseInLogLayout = struct<SwapBaseInLog>([
  u8("logType"),
  u64("amountIn"),
  u64("minimumOut"),
  u64("direction"),
  u64("userSource"),
  u64("poolCoin"),
  u64("poolPc"),
  u64("outAmount"),
]);

interface SwapBaseOutLog {
  logType: number;
  maxIn: bigint;
  amountOut: bigint;
  direction: bigint;
  userSource: bigint;
  poolCoin: bigint;
  poolPc: bigint;
  directIn: bigint;
}

const SwapBaseOutLogLayout = struct<SwapBaseOutLog>([
  u8("logType"),
  u64("maxIn"),
  u64("amountOut"),
  u64("direction"),
  u64("userSource"),
  u64("poolCoin"),
  u64("poolPc"),
  u64("directIn"),
]);

export class RaydiumAmmLogsParser {
  parse(rayLog: string): any {
    if (!rayLog) {
      return;
    }
    
    const base64Log = rayLog.replace("ray_log: ", "");
    const raydiumEventData = Buffer.from(base64Log, "base64");

    const discriminator = u8().decode(raydiumEventData);
    switch (discriminator) {
      case 0: {
        const logData = InitLogLayout.decode(raydiumEventData);
        return { name: "init", data: logData };
      }
      case 1: {
        const logData = DepositLogLayout.decode(raydiumEventData);
        return { name: "deposit", data: logData };
      }
      case 2: {
        const logData = WithdrawLogLayout.decode(raydiumEventData);
        return { name: "withdraw", data: logData };
      }
      case 3: {
        const logData = SwapBaseInLogLayout.decode(raydiumEventData);
        return { name: "swapBaseIn", data: logData };
      }
      case 4: {
        const logData = SwapBaseOutLogLayout.decode(raydiumEventData);
        return { name: "swapBaseOut", data: logData };
      }
    }
    return;
  }
}