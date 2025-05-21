'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  HiOutlineUserGroup, 
  HiOutlineDocumentText, 
  HiOutlineChatAlt2, 
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineRefresh
} from 'react-icons/hi';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPresentations: 0,
    totalFeedback: 0,
    recentFeedback: [],
    recentUsers: [],
    recentPresentations: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [users, feedback, presentations] = await Promise.all([
        axios.get('http://localhost:5000/user/getall'),
        axios.get('http://localhost:5000/feedback/getall'),
        axios.get('http://localhost:5000/api/ppt/getall')
      ]);

      setStats({
        totalUsers: users.data.length,
        totalPresentations: presentations.data.length,
        totalFeedback: feedback.data.length,
        recentFeedback: feedback.data.slice(-5).reverse(),
        recentUsers: users.data.slice(-5).reverse(),
        recentPresentations: presentations.data.slice(-5).reverse()
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
    setIsLoading(false);
  };
  

  const StatCard = ({ title, value, icon: Icon, color, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            <p className="text-sm text-gray-500">{title}</p>
          </div>
        </div>
        <div className={`h-12 w-1 rounded-full ${color}`} />
      </div>
    </motion.div>
  );

  const ActivityCard = ({ title, items, icon: Icon, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-gray-500" />
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="space-y-3 max-h-[280px] overflow-y-auto">
        {items.map((item, index) => (         
           <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + index * 0.1 }}       
            className="flex flex-col border-b border-gray-100 pb-2 last:border-0"
          >
            <div className="flex justify-between items-start mb-1.5">
              <p className="font-medium text-gray-800 leading-snug text-sm">
                {title === "Recent Feedback" ? item.message : (item.name || item.title)}
              </p>
              <span className="px-1.5 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full ml-2 shrink-0">
                {format(new Date(item.createdAt), 'HH:mm')}
              </span>
            </div>
            <div className="flex items-center text-xs">
              <HiOutlineClock className="w-3.5 h-3.5 text-gray-400 mr-1" />
              <p className="text-gray-500">
                {format(new Date(item.createdAt), 'MMM dd, yyyy')}
              </p>
              {title === "Recent Feedback" && (
                <>
                  <span className="text-gray-300 mx-1.5">•</span>
                  <p className="text-gray-500">By {item.name}</p>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
  
  return (    <div className="p-8 ml-64 min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <HiOutlineRefresh className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={HiOutlineUserGroup}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          delay={0.1}
        />
        <StatCard
          title="Total Presentations"
          value={stats.totalPresentations}
          icon={HiOutlineDocumentText}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          delay={0.2}
        />
        <StatCard
          title="Total Feedback"
          value={stats.totalFeedback}
          icon={HiOutlineChatAlt2}
          color="bg-gradient-to-r from-green-500 to-green-600"
          delay={0.3}
        />
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActivityCard
          title="Recent Users"
          items={stats.recentUsers}
          icon={HiOutlineUserGroup}
          delay={0.4}
        />
        <ActivityCard
          title="Recent Presentations"
          items={stats.recentPresentations}
          icon={HiOutlineDocumentText}
          delay={0.5}
        />
        <ActivityCard
          title="Recent Feedback"
          items={stats.recentFeedback}
          icon={HiOutlineChatAlt2}
          delay={0.6}
        />
      </div>
    </div>
  );
};

export default Dashboard;