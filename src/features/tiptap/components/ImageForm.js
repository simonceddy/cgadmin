function ImageForm({ onInput }) {
  return (
    <div className="col p-2 border-2 border-cornflower-blue rounded-md ">
      <input type="file" onInput={onInput} />
    </div>
  );
}

export default ImageForm;
