import { useState, useEffect, useCallback } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Note from '@/components/Note';
import NoteForm from '@/components/NoteForm';
import Archived from '@/components/Archived';
import { deleteNote } from '@/API';
import { readNotes } from '@/API';

const PlatformPage = () => {
  const [visible, setVisible] = useState(false);
  const [archivedOpen, setArchivedOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState([]);
  const [noteList, setNoteList] = useState([]);
  const [archivedNoteList, setArchivedNoteList] = useState([]);
  const [noteFormState, setNoteFormState] = useState({
    text: '',
    tags: [],
  });

  

  
  const fetchNotes = useCallback(async () => {
    try {
      const { archivedNotes, nonArchivedNotes } = await readNotes();

      const allNotes = [...nonArchivedNotes, ...archivedNotes];
  
      const filteredNotes = allNotes.filter(note => {
        return (
          (note.text.toLowerCase().includes(filterText.toLowerCase()) || note.tags.some(tag => tag.toLowerCase().includes(filterText.toLowerCase()))) &&
          (filterCategory.length === 0 || filterCategory.every(category => note.categories.includes(category)))
        );
      });
  
      // Split the filtered notes into non-archived and archived notes
      const filteredNonArchivedNotes = filteredNotes.filter(note => !note.archived);
      const filteredArchivedNotes = filteredNotes.filter(note => note.archived);
  
      setNoteList(filteredNonArchivedNotes);
      setArchivedNoteList(filteredArchivedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }, [filterText, filterCategory]);
  
  
  const handleCategoryClick = useCallback((category) => {
    setFilterCategory((prevCategories) => {
      const isCategorySelected = prevCategories.includes(category);
      
      if (isCategorySelected) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  }, []);
  
  const handleFilterChange = (filterText) => {
    setFilterText(filterText);
  };
  
  const archivedOpenHandler = () => {
    setArchivedOpen(!archivedOpen);
  };

  const visibleHandler = () => {
    if (visible) {
      setNoteFormState({
        text: '',
        tags: [],
      });
    }
    setVisible(!visible);
  };

  const handleNoteFormSubmit = async () => {
    await fetchNotes();
    setVisible(false);
  };
  
  const handleNoteDelete = async (deletedId) => {
    try {
      await deleteNote(deletedId);
      
      setNoteList((prevNotes) => prevNotes.filter((note) => note.uuid !== deletedId));
      setArchivedNoteList((prevArchivedNotes) => prevArchivedNotes.filter((note) => note.uuid !== deletedId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  
  const handleNoteUpdate = async () => {
    await fetchNotes();
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchNotes();
    };

    fetchData();
  }, [fetchNotes]);


  return (
    <div className='flex bg-slate-100 h-screen w-full  flex-col'>
      <NavBar
        platform={true}
        visibleHandler={visibleHandler}
        archivedOpenHandler={archivedOpenHandler}
        handleFilterChange={handleFilterChange}
        handleCategoryClick={handleCategoryClick}
        filterCategory={filterCategory}
      />

      <NoteForm
        visible={visible}
        visibleHandler={visibleHandler}
        noteFormState={noteFormState}
        setNoteFormState={setNoteFormState}
        handleNoteFormSubmit={handleNoteFormSubmit}
      />
      <div className='flex bg-slate-100 h-screen w-full pt-[7rem] px-[3.5rem] flex-wrap justify-start'>
        {Array.isArray(noteList) && noteList.length > 0 ? (
          noteList?.map((note, index) => (
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
      <Archived
        archivedOpen={archivedOpen}
        archivedNoteList={archivedNoteList}
        handleNoteDelete={handleNoteDelete}
        handleNoteUpdate={handleNoteUpdate}
      ></Archived>
    </div>
  );
};

export default PlatformPage;