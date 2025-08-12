import React, { useState } from 'react';
import { X, Calculator, TrendingUp, Award, Target, Users } from 'lucide-react';

const KPIModal = ({ isOpen, onClose, onSave, currentKPI = null }) => {
  const [kpiData, setKpiData] = useState({
    // Category 1: Performance Quality (0-25 points)
    qualityScore: currentKPI?.qualityScore || 0,
    qualityWeight: 25,
    
    // Category 2: Productivity (0-25 points)
    productivityScore: currentKPI?.productivityScore || 0,
    productivityWeight: 25,
    
    // Category 3: Team Collaboration (0-25 points)
    collaborationScore: currentKPI?.collaborationScore || 0,
    collaborationWeight: 25,
    
    // Category 4: Goal Achievement (0-25 points)
    goalScore: currentKPI?.goalScore || 0,
    goalWeight: 25,
    
    // Incentive calculation settings
    baseIncentiveRate: currentKPI?.baseIncentiveRate || 1000, // Base incentive per point
    maxIncentive: currentKPI?.maxIncentive || 50000 // Maximum incentive cap
  });

  const calculateTotalKPI = () => {
    const total = 
      (kpiData.qualityScore * kpiData.qualityWeight / 100) +
      (kpiData.productivityScore * kpiData.productivityWeight / 100) +
      (kpiData.collaborationScore * kpiData.collaborationWeight / 100) +
      (kpiData.goalScore * kpiData.goalWeight / 100);
    return Math.min(total, 100); // Cap at 100
  };

  const calculateIncentive = () => {
    const totalKPI = calculateTotalKPI();
    const incentive = (totalKPI / 100) * kpiData.baseIncentiveRate * 100;
    return Math.min(incentive, kpiData.maxIncentive);
  };

  const handleInputChange = (field, value) => {
    const numValue = Math.max(0, Math.min(100, parseFloat(value) || 0));
    setKpiData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSave = () => {
    const totalKPI = calculateTotalKPI();
    const incentiveAmount = calculateIncentive();
    
    const kpiResult = {
      ...kpiData,
      totalKPI,
      incentiveAmount,
      calculatedDate: new Date().toISOString()
    };
    
    onSave(kpiResult);
    onClose();
  };

  if (!isOpen) return null;

  const totalKPI = calculateTotalKPI();
  const incentiveAmount = calculateIncentive();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="h-6 w-6" />
              <h2 className="text-xl font-bold">KPI Performance Calculator</h2>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="mt-2 text-blue-100">Evaluate performance across 4 key categories</p>
        </div>

        <div className="p-6 space-y-6">
          {/* KPI Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Category 1: Quality */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <Award className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Quality Performance</h3>
                <span className="text-sm text-blue-600">({kpiData.qualityWeight}%)</span>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Score (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={kpiData.qualityScore}
                  onChange={(e) => handleInputChange('qualityScore', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter quality score"
                />
                <div className="text-xs text-gray-500">
                  Work quality, accuracy, attention to detail
                </div>
              </div>
            </div>

            {/* Category 2: Productivity */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Productivity</h3>
                <span className="text-sm text-green-600">({kpiData.productivityWeight}%)</span>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Score (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={kpiData.productivityScore}
                  onChange={(e) => handleInputChange('productivityScore', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter productivity score"
                />
                <div className="text-xs text-gray-500">
                  Task completion, efficiency, output volume
                </div>
              </div>
            </div>

            {/* Category 3: Team Collaboration */}
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center space-x-2 mb-3">
                <Users className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-purple-800">Team Collaboration</h3>
                <span className="text-sm text-purple-600">({kpiData.collaborationWeight}%)</span>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Score (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={kpiData.collaborationScore}
                  onChange={(e) => handleInputChange('collaborationScore', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter collaboration score"
                />
                <div className="text-xs text-gray-500">
                  Teamwork, communication, support to colleagues
                </div>
              </div>
            </div>

            {/* Category 4: Goal Achievement */}
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-orange-800">Goal Achievement</h3>
                <span className="text-sm text-orange-600">({kpiData.goalWeight}%)</span>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Score (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={kpiData.goalScore}
                  onChange={(e) => handleInputChange('goalScore', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter goal achievement score"
                />
                <div className="text-xs text-gray-500">
                  Meeting targets, project completion, deadlines
                </div>
              </div>
            </div>
          </div>

          {/* Calculation Settings */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Incentive Calculation Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Base Incentive Rate (₹ per point)</label>
                <input
                  type="number"
                  min="0"
                  value={kpiData.baseIncentiveRate}
                  onChange={(e) => setKpiData(prev => ({ ...prev, baseIncentiveRate: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Maximum Incentive Cap (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={kpiData.maxIncentive}
                  onChange={(e) => setKpiData(prev => ({ ...prev, maxIncentive: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h3 className="font-bold text-lg text-gray-800 mb-4">KPI Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{totalKPI.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Total KPI Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">₹{incentiveAmount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Performance Incentive</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${totalKPI >= 80 ? 'text-green-600' : totalKPI >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {totalKPI >= 80 ? 'Excellent' : totalKPI >= 60 ? 'Good' : 'Needs Improvement'}
                </div>
                <div className="text-sm text-gray-600">Performance Rating</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Calculator className="h-4 w-4" />
              <span>Apply KPI & Calculate Incentive</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIModal; 