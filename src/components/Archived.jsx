import React from 'react';
import Note from './Note';

const Archived = ({ archivedNoteList, archivedOpen, handleNoteDelete, handleNoteUpdate }) => {
  return (
    <div
      className={`${
        archivedOpen
          ? 'transform translate-y-0 opacity-100'
          : 'transform translate-y-full opacity-0'
      } fixed bottom-0 left-0 w-full bg-slate-200 h-[440px] border-slate-200 border-1 border-t ease-in-out duration-700 transition-all overflow-auto`}
    >
      <div className='flex flex-wrap justify-start pt-[1.7rem] px-[3.5rem]'>
        {Array.isArray(archivedNoteList) && archivedNoteList.length > 0 ? (
          archivedNoteList?.map((note, index) => (
            <Note
              key={note.uuid}
              id={note.uuid}
              text={note.text}
              tags={note.tags}
              categories={note.categories}
              archived={note.archived}
              color={note.color}
              index={index}
              handleNoteDelete={handleNoteDelete}
              handleNoteUpdate={handleNoteUpdate}
            />
          ))
        ) : (
          <p className='flex items-center justify-center w-full'>No notes available.</p>
        )}
      </div>
    </div>
  );
};
export default Archived;