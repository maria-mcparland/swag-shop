import { decryptData, encryptData } from "./encryption";

export const updatePointsValue = (newBalance: number) => {
  const encryptedNewBalance = encryptData(newBalance.toString());
  return encryptedNewBalance;
};

export const writePointsToLocalStorage = (balance: number) => {
  const encryptedBalance = encryptData(balance.toString());
  localStorage.setItem("points", encryptedBalance);
};

export const gatherPointsFromLocalStorage = () => {
  const encryptedBalance = localStorage.getItem("points");
  if (!encryptedBalance) {
    writePointsToLocalStorage(0);
    return 0;
  }
  return parseInt(decryptData(encryptedBalance));
};

export const updatePointsInUrl = (balance: number) => {
  const params = new URLSearchParams();
  const encrypt = encryptData(balance.toString());
  params.set("points", encrypt);
  return params.toString();
};

export const convertAsteroidsPointsToBalance = (points: number) => {
  return Math.round((points / 100 + Number.EPSILON) * 100) / 100;
};
