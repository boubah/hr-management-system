import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useEmployeeStore from '../../../store/employeeStore';

export default function SkillsQualifications({ employeeId }) {
  const { employees, updateEmployee } = useEmployeeStore();
  const employee = employees.find(emp => emp.id === employeeId);
  
  const [newSkill, setNewSkill] = useState('');
  const [newQualification, setNewQualification] = useState({
    title: '',
    institution: '',
    year: ''
  });

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    
    const updatedSkills = [...employee.skills, newSkill];
    updateEmployee(employeeId, { skills: updatedSkills });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = employee.skills.filter(skill => skill !== skillToRemove);
    updateEmployee(employeeId, { skills: updatedSkills });
  };

  const handleAddQualification = (e) => {
    e.preventDefault();
    if (!newQualification.title || !newQualification.institution) return;

    const updatedQualifications = [...employee.qualifications, newQualification];
    updateEmployee(employeeId, { qualifications: updatedQualifications });
    setNewQualification({ title: '', institution: '', year: '' });
  };

  const handleRemoveQualification = (index) => {
    const updatedQualifications = employee.qualifications.filter((_, i) => i !== index);
    updateEmployee(employeeId, { qualifications: updatedQualifications });
  };

  if (!employee) return null;

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Compétences</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {employee.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-uims-red text-white"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 hover:text-white/80"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
          
          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Nouvelle compétence"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-uims-red hover:bg-uims-red/90"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Ajouter
            </button>
          </form>
        </div>
      </div>

      {/* Qualifications Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Qualifications</h3>
        <div className="space-y-4">
          <div className="grid gap-4">
            {employee.qualifications.map((qual, index) => (
              <div
                key={index}
                className="flex justify-between items-start p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{qual.title}</h4>
                  <p className="text-sm text-gray-500">
                    {qual.institution} • {qual.year}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveQualification(index)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddQualification} className="grid gap-4 sm:grid-cols-3">
            <input
              type="text"
              value={newQualification.title}
              onChange={(e) => setNewQualification(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Titre"
              className="rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
            <input
              type="text"
              value={newQualification.institution}
              onChange={(e) => setNewQualification(prev => ({ ...prev, institution: e.target.value }))}
              placeholder="Institution"
              className="rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={newQualification.year}
                onChange={(e) => setNewQualification(prev => ({ ...prev, year: e.target.value }))}
                placeholder="Année"
                className="rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-uims-red hover:bg-uims-red/90"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
