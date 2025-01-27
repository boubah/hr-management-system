import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CalendarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function CandidateCard({ candidate, index }) {
  return (
    <Draggable draggableId={candidate.id} index={index}>
      {(provided, snapshot) => (
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
      )}
    </Draggable>
  );
}
