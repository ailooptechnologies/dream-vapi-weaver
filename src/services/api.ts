
export const createCampaign = async (campaignData: any) => {
  // This is a mock implementation. In a real app, this would make an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: campaignData });
    }, 1000);
  });
};
