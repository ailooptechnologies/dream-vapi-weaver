
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCampaignData } from '../redux/slices/campaignSlice';
import { RootState } from '../redux/store';
import { toast } from 'react-hot-toast';
import { createCampaign } from '../services/api';

const Campaign = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const campaignData = useSelector((state: RootState) => state.campaign);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic-info");
  
  const tabs = [
    "basic-info",
    "target-audience",
    "script",
    "schedule",
    "confirmation"
  ];

  const getNextTab = (currentTab: string) => {
    const currentIndex = tabs.indexOf(currentTab);
    return tabs[currentIndex + 1];
  };

  const handleTabAction = (currentTab: string) => {
    if (currentTab === "confirmation") {
      navigate('/campaign/testing');
    } else {
      const nextTab = getNextTab(currentTab);
      setActiveTab(nextTab);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setCampaignData({ ...campaignData, [name]: value }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic-info">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Campaign Name</label>
              <input
                type="text"
                name="name"
                value={campaignData.name || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={campaignData.description || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => handleTabAction("basic-info")}>
              Create & Next
            </Button>
          </div>
        </TabsContent>

        {/* Target Audience Tab */}
        <TabsContent value="target-audience">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Target Age Range</label>
              <select
                name="ageRange"
                value={campaignData.ageRange || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Age Range</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Target Location</label>
              <input
                type="text"
                name="location"
                value={campaignData.location || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Interests</label>
              <input
                type="text"
                name="interests"
                value={campaignData.interests || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Comma-separated interests"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => handleTabAction("target-audience")}>
              Create & Next
            </Button>
          </div>
        </TabsContent>

        {/* Script Tab */}
        <TabsContent value="script">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Campaign Script</label>
              <textarea
                name="script"
                value={campaignData.script || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={8}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Call to Action</label>
              <input
                type="text"
                name="callToAction"
                value={campaignData.callToAction || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => handleTabAction("script")}>
              Create & Next
            </Button>
          </div>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={campaignData.startDate || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={campaignData.endDate || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Budget</label>
              <input
                type="number"
                name="budget"
                value={campaignData.budget || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => handleTabAction("schedule")}>
              Create & Next
            </Button>
          </div>
        </TabsContent>

        {/* Confirmation Tab */}
        <TabsContent value="confirmation">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Campaign Summary</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p><strong>Name:</strong> {campaignData.name}</p>
              <p><strong>Description:</strong> {campaignData.description}</p>
              <p><strong>Target Age:</strong> {campaignData.ageRange}</p>
              <p><strong>Location:</strong> {campaignData.location}</p>
              <p><strong>Start Date:</strong> {campaignData.startDate}</p>
              <p><strong>End Date:</strong> {campaignData.endDate}</p>
              <p><strong>Budget:</strong> ${campaignData.budget}</p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => handleTabAction("confirmation")}>
              Test Campaign
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Campaign;
