import CryptoJS from "crypto-js";

export const encryptData = (data: string): string => {
  console.log(import.meta.env.VITE_KEY);

  const ciphertext = CryptoJS.AES.encrypt(
    data,
    import.meta.env.VITE_KEY
  ).toString();
  return ciphertext;
};
export const decryptData = (data: string): string => {
  console.log(import.meta.env.VITE_KEY);
  const bytes = CryptoJS.AES.decrypt(data, import.meta.env.VITE_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
