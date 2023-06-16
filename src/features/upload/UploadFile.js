function UploadFile() {
  return (
    <div>
      <input
        type="file"
        onInput={(e) => {
          console.log(e.target.files);
        }}
      />
    </div>
  );
}

export default UploadFile;
