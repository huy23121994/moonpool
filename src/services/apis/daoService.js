import ENV from "src/configs/env";
import { checkIsObjectEmpty } from "src/utils/validators";

export async function fetchCampaigns(statuses = []) {
  let endpoint = `${ENV.APIS.DAO}/campaigns`;

  if (statuses.length) {
    statuses.forEach((status, index) => {
      endpoint = `${endpoint}${index === 0 ? '?' : '&'}status=${status.toLowerCase()}`;
    });
  }

  const res = await fetch(endpoint).then(res => res.json());

  return (res.success && res.data) ? res.data : [];
}

export async function fetchCampaignById(proposalId) {
  try {
    let endpoint = `${ENV.APIS.DAO}/campaigns/${proposalId}`;
    const res = await fetch(endpoint).then(res => res.json());
    return (res.success && res.data) ? res.data : null;
  } catch(e) {
    return null;
  }
}

export async function fetchVotes(address) {
  try {
    const res = await fetch(`${ENV.APIS.DAO}/stakers/${address}/votes`).then(res => res.json());
    return (res.success && res.data) ? res.data : [];
  } catch (e) {
    return [];
  }
}

export async function fetchDaoInfo() {
  const res = await fetch(`${ENV.APIS.DAO}/dao-info`).then(res => res.json())
  return res.data
}

export async function fetchHistories(address) {
  const res = await fetch(`${ENV.APIS.DAO}/stakers/${address}/actions`).then(res => res.json())
  return (res.success && res.data) ? res.data : []
}

export async function fetchRewards(address) {
  let res = await fetch(`${ENV.APIS.DAO}/stakers/${address}/rewards`).then(res => res.json());
  res.unclaimedRewards = 0;

  if (res.success && res.data && res.data.length) {
    res.unclaimedRewards = res.data.reduce((total, reward) => {
      const unclaimedAmount = reward.amount;
      if (!reward.claimed && unclaimedAmount) return total + unclaimedAmount;
      return total;
    }, 0);
  }

  return res;
}

export async function fetchStakerInfo(address, epoch) {
  const res = await fetch(`${ENV.APIS.DAO}/stakers/${address}?epoch=${epoch}`).then(res => res.json())
  return res.data
}

export async function fetchAddressName(address) {
  try {
    const res = await fetch(`${ENV.APIS.DAO}/wallet_info/${address}`).then(res => res.json());

    if (res.success && !checkIsObjectEmpty(res.data)) {
      res.data.address = address;
      return res.data;
    }

    return {};
  } catch (e) {
    return {};
  }
}
