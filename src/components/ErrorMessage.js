function ErrorMessage({ error }) {
  return (
    <div className="bg-black text-lime-200 flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl text-red-700">
        There was an error!
      </h1>
      <div>
        {error.name}
      </div>
      <div>
        {error.stack}
      </div>
    </div>
  );
}

export default ErrorMessage;
