import React, { useState } from 'react';
import { Calendar, BarChart3, PieChart as PieChartIcon, TrendingUp, Download, RefreshCw, Zap, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Sector } from 'recharts';

// Mock data for analytics
const mockMonthlyData = [
  { month: 'Jan', downloads: 120, users: 45, activeModules: 18 },
  { month: 'Feb', downloads: 150, users: 48, activeModules: 20 },
  { month: 'Mar', downloads: 200, users: 52, activeModules: 22 },
  { month: 'Apr', downloads: 180, users: 55, activeModules: 24 },
  { month: 'May', downloads: 250, users: 60, activeModules: 26 },
  { month: 'Jun', downloads: 280, users: 65, activeModules: 28 },
];

const mockModuleUsage = [
  { category: 'HR', count: 35 },
  { category: 'Finance', count: 25 },
  { category: 'Sales', count: 20 },
  { category: 'Operations', count: 15 },
  { category: 'IT', count: 5 },
];

const mockAIInsights = [
  {
    id: '1',
    title: 'User Engagement Patterns',
    description: 'Users are most active on Tuesdays and Wednesdays, with peak usage between 10am-2pm.',
    impact: 'high',
    category: 'usage',
    generatedAt: '2023-06-14T10:30:00',
  },
  {
    id: '2',
    title: 'Module Adoption Trend',
    description: 'HR modules have seen a 24% increase in adoption over the last month, particularly among enterprise clients.',
    impact: 'medium',
    category: 'adoption',
    generatedAt: '2023-06-13T14:45:00',
  },
  {
    id: '3',
    title: 'Potential Churn Risk',
    description: 'Three companies have shown decreased activity in the past two weeks, suggesting potential churn risk.',
    impact: 'high',
    category: 'retention',
    generatedAt: '2023-06-15T09:15:00',
  },
  {
    id: '4',
    title: 'Feature Utilization Gap',
    description: 'The advanced reporting features in Finance modules are underutilized, with only 15% of eligible users accessing them.',
    impact: 'medium',
    category: 'features',
    generatedAt: '2023-06-12T11:20:00',
  },
  {
    id: '5',
    title: 'Cross-Selling Opportunity',
    description: 'Companies using HR modules are highly likely to benefit from the Compliance Documentation Generator module.',
    impact: 'medium',
    category: 'sales',
    generatedAt: '2023-06-14T16:30:00',
  },
];

// Custom active shape for pie chart
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-20} textAnchor="middle" fill={fill} className="text-lg font-medium">
        {payload.category}
      </text>
      <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#333" className="text-sm">
        {`${value} modules`}
      </text>
      <text x={cx} y={cy} dy={30} textAnchor="middle" fill="#999" className="text-xs">
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

// Custom tooltip for bar chart
const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-blue-600">
          <span className="font-medium">Downloads:</span> {payload[0].value}
        </p>
        <p className="text-green-600">
          <span className="font-medium">Users:</span> {payload[1].value}
        </p>
      </div>
    );
  }

  return null;
};

const AnalyticsAI: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [insightFilter, setInsightFilter] = useState<string>('all');
  const [activePieIndex, setActivePieIndex] = useState(0);

  // Filter insights based on category
  const filteredInsights = insightFilter === 'all' 
    ? mockAIInsights 
    : mockAIInsights.filter(insight => insight.category === insightFilter);

  // Colors for pie chart
  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#6366F1', '#EC4899'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & AI Insights</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate('/admin/modules')}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button onClick={() => navigate('/admin/analytics')}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Time Range Selector */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Time Range:</span>
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 text-sm rounded-md ${timeRange === '7d' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => setTimeRange('7d')}
            >
              7 Days
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${timeRange === '30d' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => setTimeRange('30d')}
            >
              30 Days
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${timeRange === '90d' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => setTimeRange('90d')}
            >
              90 Days
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-md ${timeRange === '1y' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
              onClick={() => setTimeRange('1y')}
            >
              1 Year
            </button>
          </div>
        </div>
      </Card>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Download className="h-6 w-6 text-blue-800" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Downloads</h3>
              <p className="text-2xl font-semibold text-gray-900">1,280</p>
              <p className="text-xs text-green-600">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12.5% from last period
              </p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-800" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
              <p className="text-2xl font-semibold text-gray-900">530</p>
              <p className="text-xs text-green-600">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +8.2% from last period
              </p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-800" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Active Modules</h3>
              <p className="text-2xl font-semibold text-gray-900">28</p>
              <p className="text-xs text-green-600">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +4 from last period
              </p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Building className="h-6 w-6 text-amber-800" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Active Companies</h3>
              <p className="text-2xl font-semibold text-gray-900">6</p>
              <p className="text-xs text-green-600">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +1 from last period
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Monthly Trends">
          <div className="h-80 flex items-center justify-center">
            <div className="w-full h-full p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockMonthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis yAxisId="left" orientation="left" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <RechartsTooltip content={<CustomBarTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 10 }} />
                  <Bar yAxisId="left" dataKey="downloads" name="Downloads" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="users" name="Active Users" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
        
        <Card title="Module Usage by Category">
          <div className="h-80 flex items-center justify-center">
            <div className="w-full h-full p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activePieIndex}
                    activeShape={renderActiveShape}
                    data={mockModuleUsage}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    onMouseEnter={(_, index) => setActivePieIndex(index)}
                  >
                    {mockModuleUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    formatter={(value, entry, index) => {
                      return <span className="text-sm text-gray-700">{value}</span>;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
      
      {/* AI Insights */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <Brain className="h-6 w-6 text-blue-800" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">AI-Generated Insights</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              className="block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={insightFilter}
              onChange={(e) => setInsightFilter(e.target.value)}
            >
              <option value="all">All Insights</option>
              <option value="usage">Usage Patterns</option>
              <option value="adoption">Adoption Trends</option>
              <option value="retention">Retention Risks</option>
              <option value="features">Feature Utilization</option>
              <option value="sales">Sales Opportunities</option>
            </select>
            
            <Button size="sm" onClick={() => navigate('/admin/analytics')}>
              <Zap className="mr-2 h-4 w-4" />
              Generate New Insights
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredInsights.map((insight) => (
            <div key={insight.id} className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">{insight.title}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                  ${insight.impact === 'high' ? 'bg-red-100 text-red-800' : 
                    insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'}`}>
                  {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
                </span>
              </div>
              <p className="mt-2 text-gray-600">{insight.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Generated: {new Date(insight.generatedAt).toLocaleString()}
                </span>
                <div className="flex space-x-2">
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => navigate('/admin/requests')}
                  >
                    View Details
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredInsights.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No insights found for the selected category.</p>
            </div>
          )}
        </div>
      </Card>
      
      {/* Recommendations */}
      <Card title="AI Recommendations">
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-lg mr-3 flex-shrink-0">
                <Zap className="h-5 w-5 text-blue-800" />
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900">Optimize Module Onboarding</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Users who complete the interactive tutorial are 3x more likely to become regular users. 
                  Consider making the tutorial mandatory for all new module assignments.
                </p>
                <div className="mt-3 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/admin/modules')}
                  >
                    Implement
                  </Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start">
              <div className="p-2 bg-purple-100 rounded-lg mr-3 flex-shrink-0">
                <Zap className="h-5 w-5 text-purple-800" />
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900">Cross-Selling Opportunity</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Companies using HR modules would benefit from the Compliance Documentation Generator. 
                  Target these 4 companies with a special offer to increase adoption.
                </p>
                <div className="mt-3 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/admin/companies')}
                  >
                    View Companies
                  </Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start">
              <div className="p-2 bg-amber-100 rounded-lg mr-3 flex-shrink-0">
                <Zap className="h-5 w-5 text-amber-800" />
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900">Retention Risk Alert</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Initech Solutions has shown decreased activity in the past two weeks. 
                  Consider reaching out to their admin to offer assistance and prevent potential churn.
                </p>
                <div className="mt-3 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/admin/users')}
                  >
                    Contact Admin
                  </Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsAI;

// Missing component definition
const Users = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Package = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const Building = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);