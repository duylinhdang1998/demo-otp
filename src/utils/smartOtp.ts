import CryptoJS from "crypto-js";
import base32 from "thirty-two";
import totp from "totp-generator";

const deviceId = "iPhone13pro,2";

export function createSharedKey(pin: string) {
  const msg = pin + deviceId;
  const msgEncode = CryptoJS.SHA256(msg).toString();
  return window.btoa(msgEncode);
}
export function createSmartOtp(sharedKey: string) {
  const now = new Date().getTime();

  const aaa = (base32 as any).encode(sharedKey).toString();
  console.log({ aaa });
  // console.log({ window });
  const smartOtp = totp(aaa, {
    digits: 6,
    timestamp: now,
  });
  console.log({ smartOtp });
  return { smartOtp, now };
}
