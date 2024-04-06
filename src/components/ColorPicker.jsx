const ColorPicker = ({ selectedColor, setColorHandler }) => {
  const colors = ['#feff9c', '#ffadad', '#caffbf', '#a0c4ff', '#bdb2ff'];

  return (
    <div className="flex mt-2">
      {colors.map((color, index) => (
        <div
          key={index}
          onClick={() => setColorHandler(color)}
          className={`w-6 h-6 rounded-full cursor-pointer mx-1 ${selectedColor === color ? 'border-4 border-black' : ''}`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
