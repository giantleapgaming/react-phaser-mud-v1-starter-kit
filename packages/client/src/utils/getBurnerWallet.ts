import { Wallet } from "ethers";

export const getBurnerWallet = () => {
 const privateKey = sessionStorage.getItem("user-burner-wallet");
 if (privateKey) return new Wallet(privateKey);

 const burnerWallet = Wallet.createRandom();
 sessionStorage.setItem("user-burner-wallet", burnerWallet.privateKey);
 return burnerWallet;
};
