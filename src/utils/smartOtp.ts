import CryptoJS from "crypto-js";
import base32 from "thirty-two";
import totp from "totp-generator";

const deviceId = "iPhone13pro,5";

export function createSharedKey(pin: string) {
  const msg = pin + deviceId;
  const msgEncode = CryptoJS.SHA256(msg).toString();
  const sharedKey = (base32 as any).encode(msgEncode).toString();
  console.log({ sharedKey });
  return sharedKey;
}
export function createSmartOtp(sharedKey: string) {
  const now = new Date().getTime();
  const smartOtp = totp(sharedKey, {
    digits: 6,
    timestamp: now,
    period: 60,
    algorithm: "SHA-512",
  });
  return { smartOtp, now };
}
