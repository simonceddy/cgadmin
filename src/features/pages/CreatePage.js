/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddPageMutation } from './pagesAPI';
import ErrorMessage from '../../components/ErrorMessage';
import ErrorBoundary from '../../containers/ErrorBoundary';
import Tiptap from '../tiptap/Tiptap';

function CreatePage() {
  const [body, setBody] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [createPage, { isSuccess, error, isLoading }] = useAddPageMutation();

  const saveData = async () => {
    const result = await createPage({
      title: 'test title', body
    });
    if (result.data.success) {
      setMessage('Saved!');
    } else {
      setMessage('A problem occurred');
    }
    console.log(result);
  };
  return (
    <div>
      {error && <ErrorMessage error={error} />}
      <ErrorBoundary>
        <div className="col w-full">
          {message && (
          <div className="p-2 col border-cornflower-blue border-2 rounded-md justify-center items-center">
            <div className="mb-2 font-bold">{message}</div>
            <button
              className="border-2 border-cornflower-blue active:border-pastel-green hover:underline p-2 m-2"
              onClick={() => setMessage(null)}
              type="button"
            >
              OK
            </button>
          </div>
          )}
          <h1 className="text-xl m-2">
            Editing
            <span className="ml-1 font-bold">
              Title input goes here
            </span>
          </h1>
          {/* <UploadFile
          onUpload={() => {
            setMessage('uploading!');
          }}
        /> */}
          <div className="row w-full m-2 h-[400px]">
            <Tiptap content={body} setContent={setBody} />
          </div>
          <div>
            <button
              className="border-2 border-black hover:border-cornflower-blue active:border-pastel-green p-2 rounded-md m-2"
              type="button"
              onClick={() => {
                saveData();
              }}
            >
              Save
            </button>
            <button
              className="border-2 border-black hover:border-cornflower-blue active:border-pastel-green p-2 rounded-md m-2"
              type="button"
              onClick={() => {
                navigate('/pages');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default CreatePage;
