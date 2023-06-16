function UploadFile({ onUpload }) {
  return (
    <div>
      <input
        type="file"
        onInput={(e) => {
          console.log(e.target.files);
          if (onUpload) onUpload(e.target.files);
        }}
      />
    </div>
  );
}

export default UploadFile;
