import React, { useState, useCallback } from 'react';
import { Search, Filter, Check, Edit, Trash2, Mail, Shield, AlertCircle, X, UserPlus } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

// Mock data for company registrations
const mockCompanies = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'admin@acmecorp.com',
    contactPerson: 'John Smith',
    registrationDate: '2023-06-15T10:30:00',
    status: 'active',
    usersCount: 8,
    lastActive: '2023-06-15T10:30:00',
    isBlocked: false,
  },
  {
    id: '2',
    name: 'Globex Industries',
    email: 'info@globex.com',
    contactPerson: 'Sarah Johnson',
    registrationDate: '2023-06-14T16:45:00',
    status: 'active',
    usersCount: 5,
    lastActive: '2023-06-14T16:45:00',
    isBlocked: false,
  },
  {
    id: '3',
    name: 'Initech Solutions',
    email: 'admin@initech.com',
    contactPerson: 'Michael Chen',
    registrationDate: '2023-05-30T09:15:00',
    status: 'inactive',
    usersCount: 0,
    lastActive: '2023-05-30T09:15:00',
    isBlocked: true,
  },
  {
    id: '4',
    name: 'Umbrella Corp',
    email: 'contact@umbrella.org',
    contactPerson: 'Emily Rodriguez',
    registrationDate: '2023-06-15T11:20:00',
    status: 'active',
    usersCount: 12,
    lastActive: '2023-06-15T11:20:00',
    isBlocked: false,
  },
  {
    id: '5',
    name: 'Stark Industries',
    email: 'info@stark.com',
    contactPerson: 'David Wilson',
    registrationDate: '2023-06-14T14:30:00',
    status: 'active',
    usersCount: 3,
    lastActive: '2023-06-14T14:30:00',
    isBlocked: false,
  },
  {
    id: '6',
    name: 'Wayne Enterprises',
    email: 'info@wayne.com',
    contactPerson: 'Jessica Lee',
    registrationDate: '2023-06-10T09:15:00',
    status: 'pending',
    usersCount: 0,
    lastActive: null,
    isBlocked: false,
  },
];

interface Company {
  id: string;
  name: string;
  email: string;
  contactPerson: string;
  registrationDate: string;
  status: 'active' | 'inactive' | 'pending';
  usersCount: number;
  lastActive: string | null;
  isBlocked: boolean;
}

interface EditModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (company: Company) => void;
}

const EditModal: React.FC<EditModalProps> = ({ company, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Company>(
    company || {
      id: '',
      name: '',
      email: '',
      contactPerson: '',
      registrationDate: new Date().toISOString(),
      status: 'pending',
      usersCount: 0,
      lastActive: null,
      isBlocked: false,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Company</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface MessageModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: (company: Company, message: string) => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ company, isOpen, onClose, onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (company) {
      onSend(company, message);
      setMessage('');
    }
  };

  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Send Message to {company.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 h-32"
              required
              placeholder="Type your message here..."
            />
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ConfirmationModalProps {
  title: string;
  message: string;
  isOpen: boolean;
  confirmLabel: string;
  confirmVariant?: 'primary' | 'danger';
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  isOpen,
  confirmLabel,
  confirmVariant = 'danger',
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center text-red-600 mb-4">
          <AlertCircle className="h-6 w-6 mr-2" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            type="button"
          >
            Cancel
          </Button>
          <Button 
            variant={confirmVariant}
            onClick={onConfirm}
            type="button"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

const UserManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Filter companies based on search and filters
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle approving a company registration
  const handleApproveClick = useCallback((company: Company) => {
    setSelectedCompany(company);
    setShowApproveConfirm(true);
  }, []);

  const handleApproveConfirm = useCallback(() => {
    if (selectedCompany) {
      setCompanies(prev => 
        prev.map(company => 
          company.id === selectedCompany.id ? { ...company, status: 'active' } : company
        )
      );
      setShowApproveConfirm(false);
      setSelectedCompany(null);
      // In a real application, you would send an API request here
    }
  }, [selectedCompany]);

  // Handle editing a company
  const handleEditClick = useCallback((company: Company) => {
    setSelectedCompany(company);
    setShowEditModal(true);
  }, []);

  const handleEditSave = useCallback((updatedCompany: Company) => {
    setCompanies(prev => 
      prev.map(company => 
        company.id === updatedCompany.id ? updatedCompany : company
      )
    );
    setShowEditModal(false);
    setSelectedCompany(null);
    // In a real application, you would send an API request here
  }, []);

  // Handle deleting a company
  const handleDeleteClick = useCallback((company: Company) => {
    setSelectedCompany(company);
    setShowDeleteConfirm(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (selectedCompany) {
      setCompanies(prev => prev.filter(company => company.id !== selectedCompany.id));
      setShowDeleteConfirm(false);
      setSelectedCompany(null);
      // In a real application, you would send an API request here
    }
  }, [selectedCompany]);

  // Handle messaging a company
  const handleMessageClick = useCallback((company: Company) => {
    setSelectedCompany(company);
    setShowMessageModal(true);
  }, []);

  const handleSendMessage = useCallback((company: Company, message: string) => {
    // In a real application, you would send an API request here
    alert(`Message sent to ${company.name}: ${message}`);
    setShowMessageModal(false);
    setSelectedCompany(null);
  }, []);

  // Handle blocking/unblocking a company
  const handleBlockClick = useCallback((company: Company) => {
    setSelectedCompany(company);
    setShowBlockConfirm(true);
  }, []);

  const handleBlockConfirm = useCallback(() => {
    if (selectedCompany) {
      setCompanies(prev => 
        prev.map(company => 
          company.id === selectedCompany.id ? { ...company, isBlocked: !company.isBlocked } : company
        )
      );
      setShowBlockConfirm(false);
      setSelectedCompany(null);
      // In a real application, you would send an API request here
    }
  }, [selectedCompany]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Company Manager</h1>
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
              placeholder="Search by company, email, or contact person..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search companies"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </Card>
      
      {/* Company Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Total Companies</h3>
            <p className="mt-2 text-3xl font-bold text-blue-900">{companies.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Active Companies</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {companies.filter(c => c.status === 'active').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Pending Registrations</h3>
            <p className="mt-2 text-3xl font-bold text-amber-500">
              {companies.filter(c => c.status === 'pending').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Blocked Companies</h3>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {companies.filter(c => c.isBlocked).length}
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
                  Contact Person
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className={company.isBlocked ? 'bg-red-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-900 font-semibold">{company.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-500">{company.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{company.contactPerson}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${company.status === 'active' ? 'bg-green-100 text-green-800' : 
                        company.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </span>
                    {company.isBlocked && (
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Blocked
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(company.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {company.usersCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {company.lastActive ? new Date(company.lastActive).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {company.status === 'pending' && (
                        <button 
                          className="text-green-600 hover:text-green-900"
                          onClick={() => handleApproveClick(company)}
                          aria-label="Approve company"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => handleEditClick(company)}
                        aria-label="Edit company"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteClick(company)}
                        aria-label="Delete company"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => handleMessageClick(company)}
                        aria-label="Message company"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button 
                        className={`${company.isBlocked ? 'text-amber-600 hover:text-amber-900' : 'text-purple-600 hover:text-purple-900'}`}
                        onClick={() => handleBlockClick(company)}
                        aria-label={company.isBlocked ? 'Unblock company' : 'Block company'}
                      >
                        <Shield className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCompanies.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No companies found matching your criteria.</p>
          </div>
        )}
      </Card>

      {/* Edit Modal */}
      <EditModal 
        company={selectedCompany}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCompany(null);
        }}
        onSave={handleEditSave}
      />

      {/* Message Modal */}
      <MessageModal
        company={selectedCompany}
        isOpen={showMessageModal}
        onClose={() => {
          setShowMessageModal(false);
          setSelectedCompany(null);
        }}
        onSend={handleSendMessage}
      />

      {/* Delete Confirmation */}
      <ConfirmationModal
        title="Confirm Deletion"
        message={selectedCompany ? `Are you sure you want to delete ${selectedCompany.name}? This action cannot be undone.` : ''}
        isOpen={showDeleteConfirm}
        confirmLabel="Delete"
        confirmVariant="danger"
        onClose={() => {
          setShowDeleteConfirm(false);
          setSelectedCompany(null);
        }}
        onConfirm={handleDeleteConfirm}
      />

      {/* Block Confirmation */}
      <ConfirmationModal
        title={selectedCompany?.isBlocked ? "Unblock Company" : "Block Company"}
        message={selectedCompany ? 
          selectedCompany.isBlocked ?
            `Are you sure you want to unblock ${selectedCompany.name}?` :
            `Are you sure you want to block ${selectedCompany.name}? This will prevent all users from accessing the system.` 
          : ''}
        isOpen={showBlockConfirm}
        confirmLabel={selectedCompany?.isBlocked ? "Unblock" : "Block"}
        confirmVariant={selectedCompany?.isBlocked ? "primary" : "danger"}
        onClose={() => {
          setShowBlockConfirm(false);
          setSelectedCompany(null);
        }}
        onConfirm={handleBlockConfirm}
      />

      {/* Approve Confirmation */}
      <ConfirmationModal
        title="Approve Company"
        message={selectedCompany ? `Are you sure you want to approve ${selectedCompany.name}?` : ''}
        isOpen={showApproveConfirm}
        confirmLabel="Approve"
        confirmVariant="primary"
        onClose={() => {
          setShowApproveConfirm(false);
          setSelectedCompany(null);
        }}
        onConfirm={handleApproveConfirm}
      />
    </div>
  );
};

export default UserManager;