import { useState } from "react";
import { Check, ClipboardCheck, Lightbulb, Salad } from "lucide-react";
import { X } from "lucide-react";
import { addNote } from "@/API";
import { v4 } from 'uuid';
import ColorPicker from "./ColorPicker";

const NoteForm = ({ visible, visibleHandler, noteFormState, setNoteFormState, handleNoteFormSubmit }) => {
  const { text, tags, color } = noteFormState;

  const initialColor = color || '#feff9c';

  const [selectedCategories, setSelectedCategories] = useState([]);

  const onChangeTextHandler = (e) => {
    setNoteFormState((prev) => ({ ...prev, text: e.target.value.slice(0, 255) }));
  };

  const onChangeTagsHandler = (e) => {
    setNoteFormState((prev) => ({ ...prev, tags: e.target.value.split(',').slice(0, 255) }));
  };

  const setColorHandler = (selectedColor) => {
    setNoteFormState((prev) => ({ ...prev, color: selectedColor }));
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        // If category is already selected, remove it
        return prevCategories.filter((prevCategory) => prevCategory !== category);
      } else {
        // If category is not selected, add it
        return [...prevCategories, category];
      }
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newNote = {
      text: text,
      tags: tags,
      categories: selectedCategories,
      uuid: v4(),
      archived: false,
      color: initialColor, // Ensure the color is included in the new note
      user_id: localStorage.getItem('userId')
    };

    // Call the onSubmit prop function with the new note
    await addNote(newNote);
    handleNoteFormSubmit(newNote);

    // Reset the form state and hide the form
    setNoteFormState({
      text: '',
      tags: [],
    });
    setSelectedCategories([]);
    visibleHandler();
  };

  return (
    <div
      style={{ backgroundColor: initialColor || '#feff9c' }}  // Use initialColor here
      className={`mt-14 px-3 py-2 shadow-lg border border-b-1 fixed w-[350px] h-[350px] ${visible ? 'translate-x-0' : 'lg:-translate-x-[550px] -translate-x-[350px]'} ease-in-out duration-500`}
    >
      <X className='cursor-pointer absolute right-[9px]' onClick={visibleHandler}/>
      <form onSubmit={(e)=>submitHandler(e)}>
        <textarea
          placeholder='Write here..'
          onChange={onChangeTextHandler}
          value={text}
          className='resize-none bg-inherit w-full px-2 border-1 flex items-start justify-start  placeholder-gray-700 min-h-[250px] max-h-[250px]'
          maxLength={255}
        />
        <div className=' items-end'>
          <input
            type="text"
            placeholder='Tags (separate using "," (comma))'
            onChange={onChangeTagsHandler}
            value={tags.join(',')}
            className='bg-inherit w-full placeholder-slate-700'
            maxLength={255}
          />
          <ColorPicker selectedColor={initialColor} setColorHandler={(selectedColor) => setNoteFormState((prev) => ({ ...prev, color: selectedColor }))} />
          <div className="flex">
          <div
        className={`pl-5 flex hover:text-red-600 transition cursor-pointer ${selectedCategories.includes('Tasks') ? 'text-red-600' : ''}`}
        onClick={() => toggleCategory('Tasks')}
      >  
        <ClipboardCheck />
        <p className='ml-2'>Tasks</p>
      </div>
      <div
        className={`pl-5 flex hover:text-yellow-400 transition cursor-pointer ${selectedCategories.includes('Ideas') ? 'text-yellow-400' : ''}`}
        onClick={() => toggleCategory('Ideas')}
      >  
        <Lightbulb />
        <p className='ml-2'>Ideas</p>
      </div>
      <div
        className={`pl-5 flex hover:text-green-600 transition cursor-pointer ${selectedCategories.includes('Health') ? 'text-green-600' : ''}`}
        onClick={() => toggleCategory('Health')}
      >  
        <Salad />
        <p className='ml-2'>Health</p>
      </div>
          </div>
          <button className="absolute right-[9px] bottom-2">
            <Check/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
