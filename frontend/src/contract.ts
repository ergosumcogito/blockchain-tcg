import { BrowserProvider, Contract } from "ethers";
import TCG1155ABI from "./abi/TCG1155.json";

// Replace with the address where you deployed the contract
export const CONTRACT_ADDRESS = "0xPASTE_YOUR_ADDRESS";

// Returns a connected contract instance
export async function getContract(): Promise<Contract> {
  if (!window.ethereum) throw new Error("MetaMask not found");

  // Create ethers provider and signer
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new Contract(CONTRACT_ADDRESS, TCG1155ABI, signer);
}
