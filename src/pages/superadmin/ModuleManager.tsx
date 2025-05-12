import React, { useState, useCallback, useMemo } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Download, Tag, X } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ModuleForm from '../../components/modules/ModuleForm';
import ConfirmationDialog from '../../components/modules/ConfirmationDialog';
import { modules as mockModules } from '../../data/mockData';
import { Module, ModuleCategory } from '../../types';

// Form validation types
interface FormErrors {
  title?: string;
  description?: string;
  version?: string;
  size?: string;
  file?: string;
}

// Form data type
interface ModuleFormData {
  id?: string;
  title: string;
  description: string;
  category: ModuleCategory;
  version: string;
  size: string;
  requiredRole: 'developer' | 'company_admin' | 'viewer';
  status: 'active' | 'inactive' | 'draft' | 'archived';
  file: File | null;
}

// Initial form state
const initialFormState: ModuleFormData = {
  title: '',
  description: '',
  category: 'Finance & Accounting',
  version: '1.0.0',
  size: '0',
  requiredRole: 'developer',
  status: 'active',
  file: null,
};

const ModuleManager: React.FC = () => {
  // State for modules data
  const [modules, setModules] = useState<Module[]>(mockModules);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // State for selected module and form data
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ModuleFormData>(initialFormState);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  // State for loading indicators
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Get unique categories from modules - memoized
  const categories = useMemo(() => {
    return ['all', ...new Set(modules.map(module => module.category))];
  }, [modules]);
  
  // Filter modules based on search and filters - memoized
  const filteredModules = useMemo(() => {
    return modules.filter(module => {
      const matchesSearch = 
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || module.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || module.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [modules, searchTerm, categoryFilter, statusFilter]);

  // Form validation function
  const validateForm = (data: ModuleFormData): FormErrors => {
    const errors: FormErrors = {};
    
    if (!data.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!data.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!data.version.trim()) {
      errors.version = 'Version is required';
    } else if (!/^\d+\.\d+\.\d+$/.test(data.version)) {
      errors.version = 'Version must be in format x.y.z';
    }
    
    if (!data.size.trim()) {
      errors.size = 'Size is required';
    } else if (isNaN(parseFloat(data.size)) || parseFloat(data.size) < 0) {
      errors.size = 'Size must be a positive number';
    }
    
    // File validation only for new modules
    if (!data.id && !data.file) {
      errors.file = 'Module file is required';
    }
    
    return errors;
  };

  // Reset form state
  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setFormErrors({});
    setSelectedModuleId(null);
  }, []);

  // Handle form field changes
  const handleFormChange = useCallback((field: keyof ModuleFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field if it exists
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  }, [formErrors]);

  // Handle edit button click
  const handleEditClick = useCallback((moduleId: string) => {
    const moduleToEdit = modules.find(m => m.id === moduleId);
    if (moduleToEdit) {
      setFormData({
        id: moduleToEdit.id,
        title: moduleToEdit.title,
        description: moduleToEdit.description,
        category: moduleToEdit.category,
        version: moduleToEdit.version,
        size: moduleToEdit.size,
        requiredRole: moduleToEdit.requiredRole,
        status: moduleToEdit.status,
        file: null,
      });
      setSelectedModuleId(moduleId);
      setShowEditModal(true);
    }
  }, [modules]);

  // Handle delete button click
  const handleDeleteClick = useCallback((moduleId: string) => {
    setSelectedModuleId(moduleId);
    setShowDeleteConfirm(true);
  }, []);

  // Handle add module submission
  const handleAddModule = useCallback(async () => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a new module and add it to the modules array
      const newId = `${Date.now()}`; // More unique than sequential IDs
      const newModuleData: Module = {
        id: newId,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        version: formData.version,
        releaseDate: new Date(),
        size: formData.size,
        downloadCount: 0,
        requiredRole: formData.requiredRole,
        status: formData.status,
        lastUpdated: new Date(),
      };
      
      setModules(prev => [...prev, newModuleData]);
      setShowAddModal(false);
      resetForm();
      
      // Show success notification (would implement with a toast library)
      console.log('Module added successfully');
    } catch (error) {
      console.error('Error adding module:', error);
      // Show error notification (would implement with a toast library)
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, resetForm]);

  // Handle update module
  const handleUpdateModule = useCallback(async () => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    if (!selectedModuleId) return;
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedModules = modules.map(module => {
        if (module.id === selectedModuleId) {
          return {
            ...module,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            version: formData.version,
            size: formData.size,
            requiredRole: formData.requiredRole,
            status: formData.status,
            lastUpdated: new Date(),
          };
        }
        return module;
      });
      
      setModules(updatedModules);
      setShowEditModal(false);
      resetForm();
      
      // Show success notification (would implement with a toast library)
      console.log('Module updated successfully');
    } catch (error) {
      console.error('Error updating module:', error);
      // Show error notification (would implement with a toast library)
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, modules, resetForm, selectedModuleId]);

  // Handle module deletion
  const handleDeleteModule = useCallback(async () => {
    if (!selectedModuleId) return;
    
    try {
      setIsDeleting(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedModules = modules.filter(module => module.id !== selectedModuleId);
      setModules(updatedModules);
      setShowDeleteConfirm(false);
      setSelectedModuleId(null);
      
      // Show success notification (would implement with a toast library)
      console.log('Module deleted successfully');
    } catch (error) {
      console.error('Error deleting module:', error);
      // Show error notification (would implement with a toast library)
    } finally {
      setIsDeleting(false);
    }
  }, [modules, selectedModuleId]);

  // Handle modal close
  const handleCloseAddModal = useCallback(() => {
    setShowAddModal(false);
    resetForm();
  }, [resetForm]);

  const handleCloseEditModal = useCallback(() => {
    setShowEditModal(false);
    resetForm();
  }, [resetForm]);

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Module Manager</h1>
          <Button 
            onClick={() => setShowAddModal(true)}
            aria-label="Add new module"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Module
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
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search modules"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  aria-label="Filter by category"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-gray-400" />
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Modules Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200" aria-label="Modules table">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Module Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredModules.map((module) => (
                  <tr key={module.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-900 font-semibold" aria-hidden="true">{module.title.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{module.title}</div>
                          <div className="text-sm text-gray-500">{module.description.substring(0, 60)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {module.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${module.status === 'active' ? 'bg-green-100 text-green-800' : module.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                        {module.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {module.downloadCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(module.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900" 
                          onClick={() => handleEditClick(module.id)}
                          aria-label={`Edit ${module.title}`}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900" 
                          onClick={() => handleDeleteClick(module.id)}
                          aria-label={`Delete ${module.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-gray-600 hover:text-gray-900"
                          aria-label={`Download ${module.title}`}
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredModules.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No modules found matching your criteria.</p>
            </div>
          )}
        </Card>
        
        {/* Module Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Total Modules</h3>
              <p className="mt-2 text-3xl font-bold text-blue-900">{modules.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Active Modules</h3>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {modules.filter(m => m.status === 'active').length}
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Total Downloads</h3>
              <p className="mt-2 text-3xl font-bold text-purple-600">
                {modules.reduce((sum, module) => sum + module.downloadCount, 0)}
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Add New Module Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-module-title"
        >
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 pb-3 border-b">
              <h3 id="add-module-title" className="text-xl font-semibold text-gray-900">Add New Module</h3>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={handleCloseAddModal}
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <ModuleForm
              formData={formData}
              formErrors={formErrors}
              isSubmitting={isSubmitting}
              onChange={handleFormChange}
              onSubmit={handleAddModule}
              onClose={handleCloseAddModal}
            />
          </div>
        </div>
      )}

      {/* Edit Module Modal */}
      {showEditModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-module-title"
        >
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 pb-3 border-b">
              <h3 id="edit-module-title" className="text-xl font-semibold text-gray-900">Edit Module</h3>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={handleCloseEditModal}
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <ModuleForm
              formData={formData}
              formErrors={formErrors}
              isEdit={true}
              isSubmitting={isSubmitting}
              onChange={handleFormChange}
              onSubmit={handleUpdateModule}
              onClose={handleCloseEditModal}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        title="Confirm Deletion"
        message="Are you sure you want to delete this module? This action cannot be undone."
        confirmLabel="Delete Module"
        confirmVariant="danger"
        onConfirm={handleDeleteModule}
        onCancel={() => setShowDeleteConfirm(false)}
        isConfirming={isDeleting}
      />
    </>
  );
};

export default ModuleManager;