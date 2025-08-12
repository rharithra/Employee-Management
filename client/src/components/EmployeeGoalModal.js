import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { XMarkIcon, FlagIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const EmployeeGoalModal = ({ isOpen, onClose, goal }) => {
  const [formData, setFormData] = useState({
    progress: goal?.progress || 0,
    status: goal?.status || 'pending',
    notes: goal?.notes || ''
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (goal) {
      setFormData({
        progress: goal.progress || 0,
        status: goal.status || 'pending',
        notes: goal.notes || ''
      });
    }
  }, [goal]);

  const updateGoalMutation = useMutation(
    (data) => api.put(`/api/performance-goals/${goal.id}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('performanceGoals');
        if (formData.status === 'completed') {
          toast.success('🎉 Goal completed! Your manager has been notified.');
        } else {
          toast.success('Goal progress updated successfully!');
        }
        onClose();
      },
      onError: (error) => {
        console.error('Goal update error:', error);
        toast.error(error.response?.data?.message || 'Failed to update goal');
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.progress < 0 || formData.progress > 100) {
      toast.error('Progress must be between 0 and 100%');
      return;
    }

    // Auto-complete goal if progress is 100%
    const dataToSubmit = {
      ...formData,
      status: formData.progress === 100 ? 'completed' : formData.status
    };

    updateGoalMutation.mutate(dataToSubmit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value) || 0 : value
    }));
  };

  const markAsCompleted = () => {
    setFormData(prev => ({
      ...prev,
      status: 'completed',
      progress: 100
    }));
  };

  if (!isOpen || !goal) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'in_progress':
        return <ClockIcon className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />;
      default:
        return <FlagIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const isOverdue = goal.targetDate && new Date(goal.targetDate) < new Date() && goal.status !== 'completed';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(goal.status)}
              <h2 className="text-xl font-bold">Goal Progress Update</h2>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Goal Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                  {goal.priority?.charAt(0).toUpperCase() + goal.priority?.slice(1)} Priority
                </span>
                {isOverdue && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-red-600 bg-red-100">
                    Overdue
                  </span>
                )}
              </div>
            </div>
            
            {goal.description && (
              <p className="text-gray-700 mb-3">{goal.description}</p>
            )}
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Category:</span>
                <span className="ml-2 text-gray-800">{goal.category || 'Not specified'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Target Date:</span>
                <span className={`ml-2 ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-800'}`}>
                  {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString() : 'Not set'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Assigned by:</span>
                <span className="ml-2 text-gray-800">{goal.setter?.firstName} {goal.setter?.lastName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Current Status:</span>
                <span className="ml-2 text-gray-800 capitalize">{goal.status?.replace('_', ' ')}</span>
              </div>
            </div>
          </div>

          {/* Current Progress */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-3">Current Progress</h4>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{goal.progress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ${
                  goal.progress >= 100 ? 'bg-green-500' :
                  goal.progress >= 75 ? 'bg-blue-500' :
                  goal.progress >= 50 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${Math.min(goal.progress, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Update Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Progress (0-100%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="progress"
                  value={formData.progress}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter progress percentage"
                />
                <div className="absolute right-3 top-2 text-gray-400">%</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any notes about your progress..."
              />
            </div>

            {/* Quick Complete Button */}
            {formData.status !== 'completed' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-green-800">Mark as Completed</h5>
                    <p className="text-sm text-green-600">Set progress to 100% and status to completed</p>
                  </div>
                  <button
                    type="button"
                    onClick={markAsCompleted}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                    <span>Complete Goal</span>
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateGoalMutation.isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
              >
                {updateGoalMutation.isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <FlagIcon className="h-4 w-4" />
                    <span>Update Progress</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeGoalModal; 