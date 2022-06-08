import * as crypto from "crypto";
// import * as CryptoJs from "crypto-js";
// import { totp } from "./totp";

const deviceId = "iPhone13pro,2";

export function createSharedKey(pin: string) {
  const msg = pin + deviceId;
  return crypto.createHash("sha256").update(msg).digest("base64");
}
export function createSmartOtp(sharedKey: string) {
  // const now = new Date().getTime();
  // const newOtp = totp({
  //   secret: sharedKey,
  //   time: now,
  //   codeDigits: 6,
  // });
  // return { newOtp, now };
}
