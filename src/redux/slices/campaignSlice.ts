
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CampaignState {
  name?: string;
  description?: string;
  ageRange?: string;
  location?: string;
  interests?: string;
  script?: string;
  callToAction?: string;
  startDate?: string;
  endDate?: string;
  budget?: string;
  testResults?: any[];
  status?: 'draft' | 'testing' | 'active';
}

const initialState: CampaignState = {};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setCampaignData: (state, action: PayloadAction<CampaignState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCampaignData } = campaignSlice.actions;
export default campaignSlice.reducer;
