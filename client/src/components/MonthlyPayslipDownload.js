import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { 
  CalendarIcon, 
  ArrowDownTrayIcon, 
  DocumentArrowDownIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { api } from '../utils/api';
import { generatePayslipPDF } from '../utils/pdfGenerator';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const MonthlyPayslipDownload = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);

  // Get current year and past 2 years for dropdown
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];
  
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  // Fetch users for admin/manager view
  const { data: usersData } = useQuery('users', () =>
    api.get('/api/users').then(res => res.data),
    { enabled: user?.role !== 'employee' }
  );

  // Fetch payroll data based on filters
  const { data: payrollData, isLoading, refetch } = useQuery(
    ['monthlyPayroll', selectedMonth, selectedYear, selectedEmployee],
    async () => {
      const response = await api.get('/api/payroll');
      const allPayrolls = response.data;
      
      // Filter by month, year, and employee
      let filteredPayrolls = allPayrolls.filter(payroll => 
        payroll.month === selectedMonth && payroll.year === selectedYear
      );

      // For employees, only show their own payrolls
      if (user?.role === 'employee') {
        filteredPayrolls = filteredPayrolls.filter(payroll => 
          payroll.employeeId === user.id
        );
      } else if (selectedEmployee) {
        // For admin/manager, filter by selected employee
        filteredPayrolls = filteredPayrolls.filter(payroll => 
          payroll.employeeId === parseInt(selectedEmployee)
        );
      }

      return filteredPayrolls;
    },
    { enabled: isOpen }
  );

  const handleDownloadSingle = async (payroll) => {
    setDownloading(true);
    try {
      await generatePayslipPDF(payroll);
      toast.success(`Payslip downloaded for ${payroll.employee?.firstName} ${payroll.employee?.lastName}`);
    } catch (error) {
      console.error('Error downloading payslip:', error);
      toast.error('Failed to download payslip');
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadAll = async () => {
    if (!payrollData || payrollData.length === 0) {
      toast.error('No payrolls found for the selected period');
      return;
    }

    setDownloadingAll(true);
    let successCount = 0;
    let failureCount = 0;

    for (const payroll of payrollData) {
      try {
        await generatePayslipPDF(payroll);
        successCount++;
        // Add small delay to prevent browser overwhelming
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error downloading payslip for ${payroll.employee?.firstName}:`, error);
        failureCount++;
      }
    }

    setDownloadingAll(false);
    
    if (successCount > 0) {
      toast.success(`Downloaded ${successCount} payslip(s) successfully!`);
    }
    if (failureCount > 0) {
      toast.error(`Failed to download ${failureCount} payslip(s)`);
    }
  };

  const getSelectedMonthName = () => {
    return months.find(m => m.value === selectedMonth)?.name || '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DocumentArrowDownIcon className="h-6 w-6" />
              <h2 className="text-xl font-bold">Monthly Payslip Download</h2>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <p className="mt-2 text-green-100">Download payslips for any month and year</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Select Period</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Month Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Month
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {months.map(month => (
                    <option key={month.value} value={month.value}>
                      {month.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee Selection (for admin/manager) */}
              {user?.role !== 'employee' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee (Optional)
                  </label>
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All Employees</option>
                    {usersData?.users?.filter(u => u.role === 'employee').map(employee => (
                      <option key={employee.id} value={employee.id}>
                        {employee.firstName} {employee.lastName} ({employee.employeeId})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={refetch}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Loading...' : 'Search Payrolls'}
              </button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-900">
                  Payrolls for {getSelectedMonthName()} {selectedYear}
                </h4>
                <p className="text-sm text-blue-700">
                  {isLoading ? 'Loading...' : `${payrollData?.length || 0} payroll(s) found`}
                </p>
              </div>
              
              {payrollData && payrollData.length > 1 && (
                <button
                  onClick={handleDownloadAll}
                  disabled={downloadingAll}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
                >
                  {downloadingAll ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Downloading All...</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownTrayIcon className="h-4 w-4" />
                      <span>Download All ({payrollData.length})</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Payroll List */}
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading payrolls...</p>
            </div>
          ) : payrollData && payrollData.length > 0 ? (
            <div className="space-y-3">
              {payrollData.map((payroll) => (
                <div key={payroll.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <UserIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">
                          {payroll.employee?.firstName} {payroll.employee?.lastName}
                        </h5>
                        <p className="text-sm text-gray-600">
                          Employee ID: {payroll.employee?.employeeId} • Net Salary: ₹{payroll.netSalary?.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Generated: {new Date(payroll.generatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleDownloadSingle(payroll)}
                      disabled={downloading}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
                    >
                      {downloading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <ArrowDownTrayIcon className="h-4 w-4" />
                          <span>Download PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <DocumentArrowDownIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Payrolls Found</h3>
              <p className="text-gray-600">
                No payrolls were generated for {getSelectedMonthName()} {selectedYear}
                {selectedEmployee && usersData ? 
                  ` for ${usersData.users.find(u => u.id === parseInt(selectedEmployee))?.firstName}` : 
                  ''
                }.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try selecting a different month/year or ensure payrolls have been generated for this period.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPayslipDownload; 