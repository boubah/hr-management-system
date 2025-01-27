import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusIcon, CalendarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import CandidateForm from './CandidateForm';

const initialColumns = {
  nouveaux: {
    id: 'nouveaux',
    title: 'Nouveaux Candidats',
    color: 'bg-blue-100',
    candidates: []
  },
  preselection: {
    id: 'preselection',
    title: 'Présélection',
    color: 'bg-purple-100',
    candidates: []
  },
  entretien: {
    id: 'entretien',
    title: 'Entretien',
    color: 'bg-yellow-100',
    candidates: []
  },
  test: {
    id: 'test',
    title: 'Test Technique',
    color: 'bg-orange-100',
    candidates: []
  },
  offre: {
    id: 'offre',
    title: 'Offre',
    color: 'bg-green-100',
    candidates: []
  },
  embauche: {
    id: 'embauche',
    title: 'Embauché',
    color: 'bg-emerald-100',
    candidates: []
  },
  rejete: {
    id: 'rejete',
    title: 'Rejeté',
    color: 'bg-red-100',
    candidates: []
  }
};

const sampleCandidates = [
  {
    id: '1',
    name: 'Sophie Martin',
    position: 'Développeur Full Stack',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    status: 'nouveaux'
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    position: 'DevOps Engineer',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'entretien'
  }
];

function CandidateCard({ candidate, provided, snapshot }) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        opacity: snapshot.isDragging ? 0.8 : 1
      }}
      className="bg-white border rounded-lg p-4 mb-2 shadow-sm hover:shadow transition-shadow"
    >
      <div className="flex items-start space-x-3">
        <img
          src={candidate.photo}
          alt={candidate.name}
          className="h-10 w-10 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {candidate.name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {candidate.position}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>15 Jan 2024</span>
        </div>
        <div className="flex items-center">
          <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
          <span>3 notes</span>
        </div>
      </div>

      {candidate.nextInterview && (
        <div className="mt-2 text-xs">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-800">
            Entretien le {candidate.nextInterview}
          </span>
        </div>
      )}
    </div>
  );
}

export default function RecruitmentPipeline() {
  const [columns, setColumns] = useState(() => {
    const cols = { ...initialColumns };
    sampleCandidates.forEach(candidate => {
      if (cols[candidate.status]) {
        cols[candidate.status].candidates.push(candidate);
      }
    });
    return cols;
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddCandidate = (data) => {
    const newCandidate = {
      id: String(Date.now()),
      name: data.name,
      position: data.position,
      photo: 'https://randomuser.me/api/portraits/lego/1.jpg',
      status: 'nouveaux',
      ...data
    };

    setColumns(prev => ({
      ...prev,
      nouveaux: {
        ...prev.nouveaux,
        candidates: [...prev.nouveaux.candidates, newCandidate]
      }
    }));

    setIsFormOpen(false);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceCandidates = [...sourceCol.candidates];
    const destCandidates = source.droppableId === destination.droppableId
      ? sourceCandidates
      : [...destCol.candidates];

    const [removed] = sourceCandidates.splice(source.index, 1);
    destCandidates.splice(destination.index, 0, {
      ...removed,
      status: destination.droppableId
    });

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceCol,
        candidates: sourceCandidates
      },
      [destination.droppableId]: {
        ...destCol,
        candidates: destCandidates
      }
    });
  };

  return (
    <div className="h-full">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pipeline de Recrutement</h2>
          <p className="mt-1 text-sm text-gray-500">
            Faites glisser les candidats pour mettre à jour leur statut
          </p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un Candidat
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className={`rounded-t-lg px-4 py-2 ${column.color}`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{column.title}</h3>
                  <span className="text-sm text-gray-500">
                    {column.candidates.length}
                  </span>
                </div>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[calc(100vh-300px)] p-2 rounded-b-lg ${
                      snapshot.isDraggingOver ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    {column.candidates.map((candidate, index) => (
                      <Draggable
                        key={candidate.id}
                        draggableId={candidate.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <CandidateCard
                            candidate={candidate}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {isFormOpen && (
        <CandidateForm
          onSubmit={handleAddCandidate}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
