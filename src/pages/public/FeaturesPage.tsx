import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ModuleLibrary from '../../components/modules/ModuleLibrary';

const FeaturesPage: React.FC = () => {
  const location = useLocation();
  const modulesRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);

  // Scroll to the section based on the hash in the URL
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const section = hash.substring(1); // Remove the # character
        const sectionRef = {
          modules: modulesRef,
          analytics: analyticsRef,
          team: teamRef,
          security: securityRef
        }[section];

        if (sectionRef && sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Powerful Features for Your Business</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover how our platform can help streamline your operations, improve team collaboration, and drive business growth.
          </p>
        </div>
      </div>

      {/* Features Navigation */}
      <div className="sticky top-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 space-x-8 no-scrollbar">
            <a href="#modules" className="text-blue-600 font-medium whitespace-nowrap">Module Library</a>
            <a href="#analytics" className="text-gray-600 hover:text-blue-600 font-medium whitespace-nowrap">Analytics & Reports</a>
            <a href="#team" className="text-gray-600 hover:text-blue-600 font-medium whitespace-nowrap">Team Management</a>
            <a href="#security" className="text-gray-600 hover:text-blue-600 font-medium whitespace-nowrap">Security Features</a>
          </div>
        </div>
      </div>

      {/* Module Library Section */}
      <div id="modules" ref={modulesRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Module Library</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-center">
            Browse our extensive collection of business modules designed to enhance your productivity and streamline operations.
          </p>
          <ModuleLibrary />
        </div>
      </div>

      {/* Analytics Section */}
      <div id="analytics" ref={analyticsRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Analytics & Reports</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-center">
            Gain valuable insights into your business performance with our comprehensive analytics and reporting tools.
          </p>
          {/* Analytics content would go here */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-500 text-center">Analytics features coming soon...</p>
          </div>
        </div>
      </div>

      {/* Team Management Section */}
      <div id="team" ref={teamRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Team Management</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-center">
            Efficiently manage your team, assign roles, and track performance with our team management tools.
          </p>
          {/* Team management content would go here */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <p className="text-gray-500 text-center">Team management features coming soon...</p>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div id="security" ref={securityRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Security Features</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-center">
            Protect your business data with our enterprise-grade security features and compliance tools.
          </p>
          {/* Security content would go here */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-500 text-center">Security features coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;