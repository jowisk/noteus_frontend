import { useState } from 'react';
import { Check, X, Edit, ClipboardCheck, Lightbulb, Salad } from 'lucide-react';
import { deleteNote, updateNote } from '@/API';
import ColorPicker from './ColorPicker';

const Note = ({ text, tags, categories, id, archived, handleNoteDelete, handleNoteUpdate, color, selectedCategories }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(text.slice(0, 255));
  const [updatedTags, setUpdatedTags] = useState(tags.join(', ').slice(0, 255));
  const [selectedColor, setSelectedColor] = useState(color);
  const [updatedCategories, setUpdatedCategories] = useState(categories);

  const handleUpdateNote = async () => {
    try {
      const truncatedText = updatedText.slice(0, 255);
      const truncatedTags = updatedTags.slice(0, 255);

      await updateNote(id, {
        text: truncatedText,
        tags: truncatedTags.split(', '),
        categories: updatedCategories,
        color: selectedColor,
      });

      handleNoteUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleArchiveNote = async () => {
    try {
      await updateNote(id, { archived: true });
      handleNoteUpdate();
    } catch (error) {
      console.error('Error archiving note:', error);
    }
  };

  const handleUnarchiveNote = async () => {
    try {
      await updateNote(id, { archived: false });
      handleNoteUpdate();
    } catch (error) {
      console.error('Error unarchiving note:', error);
    }
  };

  const setColorHandler = (color) => {
    setSelectedColor(color);
  };

  const toggleCategory = (category) => {
    setUpdatedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        // If category is already selected, remove it
        return prevCategories.filter((prevCategory) => prevCategory !== category);
      } else {
        // If category is not selected, add it
        return [...prevCategories, category];
      }
    });
  };

  const getCategoryIcon = (category) => {
  switch (category) {
    case 'Tasks':
      return <ClipboardCheck />;
    case 'Ideas':
      return <Lightbulb />;
    case 'Health':
      return <Salad />;
    default:
      return null;
  }
};

const getCategoryColor = (category) => {
  // Add logic to return specific colors based on category
  switch (category) {
    case 'Tasks':
      return '#e53935';
    case 'Ideas':
      return '#ffee58';
    case 'Health':
      return '#43a047';
    default:
      return 'black'; // Default color
  }
};

  return (
    <div style={{ backgroundColor: selectedColor }} className='w-[350px] h-[350px] shadow-lg px-3 py-2 flex flex-col justify-between m-2'>
      <div className='w-full flex justify-between'>
        <button onClick={archived ? handleUnarchiveNote : handleArchiveNote}>
          {archived ? 'Unarchive' : 'Archive'}
        </button>
        <X className='cursor-pointer' onClick={() => handleNoteDelete(id)} />
      </div>
      {isEditing ? (
        <>
          <textarea
            className='resize-none bg-inherit w-full px-2 border-1 flex items-start h-[180px]'
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value.slice(0, 255))}
            maxLength={255}
          />
          <input
            type='text'
            value={updatedTags}
            onChange={(e) => setUpdatedTags(e.target.value.slice(0, 255))}
            maxLength={255}
            placeholder='tags...'
            className='bg-inherit rounded-sm border-1 border px-2'
          />
          <div className="flex justify-evenly">
            <div
              className={`border border-1 border-slate-900 rounded-lg p-2 flex hover:text-red-600 transition cursor-pointer ${updatedCategories.includes('Tasks') ? 'text-red-600 bg-slate-100/25' : 'bg-slate-100/10'}`}
              onClick={() => toggleCategory('Tasks')}
            >  
              <ClipboardCheck />
              <p className='ml-2'>Tasks</p>
            </div>
            <div
              className={`border border-1 border-slate-900 rounded-lg p-2 flex hover:text-yellow-400 transition cursor-pointer ${updatedCategories.includes('Ideas') ? 'text-yellow-400 bg-slate-100/25' : 'bg-slate-100/10'}`}
              onClick={() => toggleCategory('Ideas')}
            >  
              <Lightbulb />
              <p className='ml-2'>Ideas</p>
            </div>
            <div
              className={`border border-1 border-slate-900 rounded-lg p-2 flex hover:text-green-600 transition cursor-pointer ${updatedCategories.includes('Health') ? 'text-green-600 bg-slate-100/25' : 'bg-slate-100/10'}`}
              onClick={() => toggleCategory('Health')}
            >  
              <Salad />
              <p className='ml-2'>Health</p>
            </div>
          </div>
          <ColorPicker selectedColor={selectedColor} setColorHandler={setColorHandler} />
          <div className='flex justify-end'>
            <button onClick={handleUpdateNote}>
              <Check />
            </button>
          </div>
        </>
      ) : (
        <div className='flex flex-col justify-start items='>
          <p className='break-all h-[200px] resize-none text bg-inherit w-full  border-1 flex items-start justify-start'>
            {text}
          </p>
          <div className='flex flex-col items-start'>
            <div className='flex justify-start w-1/2 items-center'>
              <p className='mr-2'>Tags:</p>
              {tags?.map((tag, index) => (
                <p className='p-2 border-1 border rounded-lg bg-slate-100/15' key={index}>{tag}</p>
              ))}
            </div>
            <div className='flex justify-around'>
              {categories?.map((category, index) => (
                <div key={index} className={`border border-1 bg-slate-100/25 border-slate-900 rounded-lg p-2 flex hover:text-red-600 transition cursor-pointer`} style={{ color: getCategoryColor(category) }}>
                  {getCategoryIcon(category)}
                  <p className='ml-2'>{category}</p>
                </div>
              ))}
            </div>
            <div className='flex justify-end w-full'>
              <button onClick={() => setIsEditing(true)}>
                <Edit />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default Note;
