import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

// Mock data for companies
const mockCompanies = [
  {
    id: '1',
    name: 'Acme Corporation',
    plan: 'enterprise',
    status: 'active',
    users: 125,
    modulesAssigned: 18,
    lastActive: '2023-06-15T10:30:00',
    subscriptionEnd: '2024-06-15T00:00:00',
  },
  {
    id: '2',
    name: 'Globex Industries',
    plan: 'professional',
    status: 'active',
    users: 47,
    modulesAssigned: 12,
    lastActive: '2023-06-14T16:45:00',
    subscriptionEnd: '2024-03-20T00:00:00',
  },
  {
    id: '3',
    name: 'Initech Solutions',
    plan: 'basic',
    status: 'inactive',
    users: 8,
    modulesAssigned: 5,
    lastActive: '2023-05-30T09:15:00',
    subscriptionEnd: '2023-08-30T00:00:00',
  },
  {
    id: '4',
    name: 'Umbrella Corp',
    plan: 'enterprise',
    status: 'active',
    users: 230,
    modulesAssigned: 24,
    lastActive: '2023-06-15T11:20:00',
    subscriptionEnd: '2024-12-15T00:00:00',
  },
  {
    id: '5',
    name: 'Stark Industries',
    plan: 'professional',
    status: 'active',
    users: 85,
    modulesAssigned: 15,
    lastActive: '2023-06-14T14:30:00',
    subscriptionEnd: '2024-05-10T00:00:00',
  },
  {
    id: '6',
    name: 'Wayne Enterprises',
    plan: 'enterprise',
    status: 'trial',
    users: 35,
    modulesAssigned: 20,
    lastActive: '2023-06-15T09:45:00',
    subscriptionEnd: '2023-07-15T00:00:00',
  },
];

const CompanyMonitor: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter companies based on search and filters
  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === 'all' || company.plan === planFilter;
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });

  // Calculate days remaining in subscription
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Company Monitor</h1>
        <Button onClick={() => navigate('/admin/companies')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Company
        </Button>
      </div>
      
      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
              >
                <option value="all">All Plans</option>
                <option value="basic">Basic</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="trial">Trial</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Companies Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Total Companies</h3>
            <p className="mt-2 text-3xl font-bold text-blue-900">{mockCompanies.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Active Companies</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {mockCompanies.filter(c => c.status === 'active').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Trial Companies</h3>
            <p className="mt-2 text-3xl font-bold text-amber-500">
              {mockCompanies.filter(c => c.status === 'trial').length}
            </p>
          </div>
        </Card>
      </div>
      
      {/* Companies Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modules
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompanies.map((company) => {
                const daysRemaining = getDaysRemaining(company.subscriptionEnd);
                return (
                  <tr key={company.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-900 font-semibold">{company.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">
                            Last active: {new Date(company.lastActive).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${company.plan === 'enterprise' ? 'bg-purple-100 text-purple-800' : 
                          company.plan === 'professional' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {company.plan.charAt(0).toUpperCase() + company.plan.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${company.status === 'active' ? 'bg-green-100 text-green-800' : 
                          company.status === 'trial' ? 'bg-amber-100 text-amber-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {company.users}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {company.modulesAssigned}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(company.subscriptionEnd).toLocaleDateString()}
                      </div>
                      <div className="text-sm">
                        {daysRemaining <= 30 ? (
                          <span className="text-red-600 flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            {daysRemaining} days left
                          </span>
                        ) : (
                          <span className="text-green-600 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {daysRemaining} days left
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredCompanies.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No companies found matching your criteria.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CompanyMonitor;