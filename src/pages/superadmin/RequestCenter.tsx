import React, { useState } from 'react';
import { Search, Filter, MessageCircle, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

// Mock data for support requests
const mockRequests = [
  {
    id: '1',
    title: 'Need help with module assignment',
    description: 'We are trying to assign modules to our new team members but getting an error message.',
    type: 'support',
    status: 'open',
    priority: 'high',
    company: 'Acme Corporation',
    companyId: '1',
    submittedBy: 'John Smith',
    submittedAt: '2023-06-14T10:30:00',
    lastUpdated: '2023-06-14T14:45:00',
  },
  {
    id: '2',
    title: 'Feature request: Bulk module assignment',
    description: 'It would be helpful to have a feature to assign modules to multiple users at once.',
    type: 'feature',
    status: 'under_review',
    priority: 'medium',
    company: 'Globex Industries',
    companyId: '2',
    submittedBy: 'Sarah Johnson',
    submittedAt: '2023-06-10T09:15:00',
    lastUpdated: '2023-06-12T11:20:00',
  },
  {
    id: '3',
    title: 'Module download failing',
    description: 'Users are unable to download the HR Onboarding module. The download starts but then fails at 50%.',
    type: 'bug',
    status: 'in_progress',
    priority: 'critical',
    company: 'Umbrella Corp',
    companyId: '4',
    submittedBy: 'Emily Rodriguez',
    submittedAt: '2023-06-15T08:30:00',
    lastUpdated: '2023-06-15T10:15:00',
  },
  {
    id: '4',
    title: 'Account access issue',
    description: 'One of our admins cannot access certain settings in their account.',
    type: 'support',
    status: 'open',
    priority: 'medium',
    company: 'Stark Industries',
    companyId: '5',
    submittedBy: 'David Wilson',
    submittedAt: '2023-06-14T16:20:00',
    lastUpdated: '2023-06-14T16:20:00',
  },
  {
    id: '5',
    title: 'Feature request: Advanced analytics dashboard',
    description: 'We would like to see more detailed analytics about module usage and user engagement.',
    type: 'feature',
    status: 'planned',
    priority: 'low',
    company: 'Wayne Enterprises',
    companyId: '6',
    submittedBy: 'Jessica Lee',
    submittedAt: '2023-06-08T14:45:00',
    lastUpdated: '2023-06-13T09:30:00',
  },
  {
    id: '6',
    title: 'Billing discrepancy',
    description: 'Our latest invoice shows charges for modules we haven\'t used.',
    type: 'billing',
    status: 'resolved',
    priority: 'high',
    company: 'Acme Corporation',
    companyId: '1',
    submittedBy: 'Robert Taylor',
    submittedAt: '2023-06-12T11:10:00',
    lastUpdated: '2023-06-14T15:30:00',
  },
  {
    id: '7',
    title: 'Module content error',
    description: 'The Compliance Documentation Generator module has outdated information in section 3.2.',
    type: 'bug',
    status: 'open',
    priority: 'medium',
    company: 'Initech Solutions',
    companyId: '3',
    submittedBy: 'Michael Chen',
    submittedAt: '2023-06-13T10:20:00',
    lastUpdated: '2023-06-13T10:20:00',
  },
];

const RequestCenter: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  // Filter requests based on search and filters
  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || request.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  // Get the selected request details
  const selectedRequestDetails = selectedRequest 
    ? mockRequests.find(r => r.id === selectedRequest) 
    : null;

  // Helper function to get status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-purple-100 text-purple-800';
      case 'planned':
        return 'bg-indigo-100 text-indigo-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get priority badge styling
  const getPriorityBadgeClass = (priority: string) => {
    switch(priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get type badge styling
  const getTypeBadgeClass = (type: string) => {
    switch(type) {
      case 'support':
        return 'bg-blue-100 text-blue-800';
      case 'feature':
        return 'bg-purple-100 text-purple-800';
      case 'bug':
        return 'bg-red-100 text-red-800';
      case 'billing':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to format status for display
  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Request Center</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate('/admin/requests')}>
            <Clock className="mr-2 h-4 w-4" />
            View History
          </Button>
          <Button onClick={() => navigate('/admin/requests')}>
            <MessageCircle className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>
      
      {/* Request Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Total Requests</h3>
            <p className="mt-2 text-3xl font-bold text-blue-900">{mockRequests.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Open Requests</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {mockRequests.filter(r => r.status === 'open').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Critical Issues</h3>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {mockRequests.filter(r => r.priority === 'critical').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Resolved</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {mockRequests.filter(r => r.status === 'resolved').length}
            </p>
          </div>
        </Card>
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
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="support">Support</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="billing">Billing</option>
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
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="under_review">Under Review</option>
                <option value="planned">Planned</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Request List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request List */}
        <div className="lg:col-span-1">
          <Card title="Requests" className="h-full">
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {filteredRequests.map((request) => (
                <div 
                  key={request.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${selectedRequest === request.id ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                  onClick={() => setSelectedRequest(request.id)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{request.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadgeClass(request.priority)}`}>
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">{request.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadgeClass(request.type)}`}>
                      {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(request.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
              
              {filteredRequests.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">No requests found matching your criteria.</p>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        {/* Request Details */}
        <div className="lg:col-span-2">
          <Card title="Request Details" className="h-full">
            {selectedRequestDetails ? (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-gray-900">{selectedRequestDetails.title}</h2>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(selectedRequestDetails.status)}`}>
                        {formatStatus(selectedRequestDetails.status)}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadgeClass(selectedRequestDetails.priority)}`}>
                        {selectedRequestDetails.priority.charAt(0).toUpperCase() + selectedRequestDetails.priority.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="mr-4">ID: #{selectedRequestDetails.id}</span>
                    <span className="mr-4">Submitted: {new Date(selectedRequestDetails.submittedAt).toLocaleString()}</span>
                    <span>Updated: {new Date(selectedRequestDetails.lastUpdated).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-900 font-semibold">{selectedRequestDetails.submittedBy.charAt(0)}</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{selectedRequestDetails.submittedBy}</p>
                      <p className="text-xs text-gray-500">{selectedRequestDetails.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{selectedRequestDetails.description}</p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Clock className="mr-2 h-4 w-4" />
                      Change Status
                    </Button>
                    {selectedRequestDetails.status !== 'resolved' ? (
                      <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Resolved
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                        <XCircle className="mr-2 h-4 w-4" />
                        Reopen
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Escalate
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Log</h3>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-900 font-semibold">S</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">System</p>
                        <p className="text-sm text-gray-500">Status changed to <span className="font-medium">In Progress</span></p>
                        <p className="text-xs text-gray-400">{new Date(selectedRequestDetails.lastUpdated).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-900 font-semibold">A</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Admin</p>
                        <p className="text-sm text-gray-500">Request received and assigned to support team</p>
                        <p className="text-xs text-gray-400">{new Date(selectedRequestDetails.submittedAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Request Selected</h3>
                <p className="text-gray-500 max-w-md">
                  Select a request from the list to view its details, or use the filters to find specific requests.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestCenter;