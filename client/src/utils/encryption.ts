import CryptoJS from "crypto-js";

export const encryptData = (data: string): string => {
  const ciphertext = CryptoJS.AES.encrypt(
    data,
    import.meta.env.VITE_KEY
  ).toString();
  return ciphertext;
};
export const decryptData = (data: string): string => {
  const bytes = CryptoJS.AES.decrypt(data, import.meta.env.VITE_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
