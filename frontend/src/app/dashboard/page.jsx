'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activePresentations: 0,
    storageUsed: 0,
    revenue: 0
  });
  const [users, setUsers] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    serverStatus: 98,
    databaseLoad: 65
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const usersResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`);
      setUsers(usersResponse.data);
      // Update stats based on actual data
      setStats({
        totalUsers: usersResponse.data.length,
        activePresentations: 856, // This would come from your PPT endpoint
        storageUsed: 756,
        revenue: 52489
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Error loading dashboard data');
    }
  };

  const handleUserAction = async (action, userId) => {
    try {
      if (action === 'delete') {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/delete/${userId}`);
        toast.success('User deleted successfully');
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error performing user action:', error);
      toast.error('Error performing action');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>
          <p className="text-blue-600">Welcome back, Administrator</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p className="text-gray-600 text-sm mb-1">Total Users</p>
            <p className="text-2xl font-bold text-blue-900">{stats.totalUsers}</p>
            <p className="text-green-500 text-sm">↑ 12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p className="text-gray-600 text-sm mb-1">Active Presentations</p>
            <p className="text-2xl font-bold text-blue-900">{stats.activePresentations}</p>
            <p className="text-green-500 text-sm">↑ 8% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p className="text-gray-600 text-sm mb-1">Storage Used</p>
            <p className="text-2xl font-bold text-blue-900">{stats.storageUsed} GB</p>
            <p className="text-yellow-500 text-sm">75% of total capacity</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p className="text-gray-600 text-sm mb-1">Revenue</p>
            <p className="text-2xl font-bold text-blue-900">₹{stats.revenue}</p>
            <p className="text-green-500 text-sm">↑ 15% from last month</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Management Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-blue-900">User Management</h2>
                <button 
                  onClick={() => toast.success('Refreshing user data...')} 
                  className="text-blue-600 hover:text-blue-700"
                >
                  Refresh
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">User</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Created At</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button 
                            onClick={() => handleUserAction('delete', user._id)}
                            className="text-red-600 hover:text-red-700 mr-3"
                          >
                            Delete
                          </button>
                          <button className="text-blue-600 hover:text-blue-700">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">System Health</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Server Status</span>
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${systemHealth.serverStatus}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Database Load</span>
                    <span className="text-sm font-medium text-yellow-600">Medium</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${systemHealth.databaseLoad}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => toast.success('Feature coming soon!')}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Add New User
                </button>
                <button 
                  onClick={() => toast.success('Generating reports...')}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Generate Reports
                </button>
                <button 
                  onClick={() => toast.success('Opening settings...')}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  System Settings
                </button>
                <button 
                  onClick={() => toast.success('Fetching logs...')}
                  className="w-full px-4 py-2 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  View Logs
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'User account created', time: '2 minutes ago', type: 'create' },
                  { action: 'System backup completed', time: '1 hour ago', type: 'success' },
                  { action: 'Payment processed', time: '3 hours ago', type: 'payment' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'create' ? 'bg-blue-500' :
                      activity.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
