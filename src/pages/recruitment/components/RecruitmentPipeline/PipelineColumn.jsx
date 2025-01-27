import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import CandidateCard from './CandidateCard';

export default function PipelineColumn({ column }) {
  return (
    <div className="flex-shrink-0 w-80">
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
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
