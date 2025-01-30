import React from 'react';

export default function SkillsMatrix() {
  const skills = [
    { category: 'Technique', skills: ['React', 'Node.js', 'TypeScript', 'AWS'] },
    { category: 'Soft Skills', skills: ['Communication', 'Leadership', 'Travail d\'équipe'] },
    { category: 'Management', skills: ['Gestion de projet', 'Mentorat', 'Stratégie'] }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Matrice des Compétences</h3>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {skills.map((category) => (
          <div key={category.category} className="border-t border-gray-200">
            <div className="bg-gray-50 px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {category.category}
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {category.skills.map((skill) => (
                    <div key={skill} className="relative">
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <h4 className="text-sm font-medium text-gray-900">{skill}</h4>
                        <div className="mt-2">
                          <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                              <div>
                                <span className="text-xs font-semibold inline-block text-uims-red">
                                  Niveau
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-uims-red">
                                  75%
                                </span>
                              </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-100">
                              <div
                                style={{ width: '75%' }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-uims-red"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
