import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Tiptap from '../tiptap/Tiptap';
import { useFetchPageQuery, useUpdatePageMutation } from './pagesAPI';
import ErrorMessage from '../../components/ErrorMessage';
// import UploadFile from '../upload/UploadFile';
import ErrorBoundary from '../../containers/ErrorBoundary';

function EditPage() {
  const { slug } = useParams();
  const [body, setBody] = useState(null);
  const [message, setMessage] = useState(null);
  // console.log(slug);
  const {
    data, isLoading, error, isSuccess, refetch
  } = useFetchPageQuery({ slug });
  const [updatePage] = useUpdatePageMutation();

  const saveData = async () => {
    const result = await updatePage({
      title: data.title, slug: data.slug, id: data.id, body
    });
    if (result.data.success) {
      refetch();
      setMessage('Saved!');
    }
    console.log(result);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data.title) {
      console.log('set body');
      setBody(data.body || '');
      // console.log(body);
    }
  }, [isSuccess]);
  if (isLoading) return <div>Fetching data...</div>;
  if (error) return <ErrorMessage error={error} />;
  // console.log(body);
  return (
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
            {data.title}
          </span>
        </h1>
        {/* <UploadFile
          onUpload={() => {
            setMessage('uploading!');
          }}
        /> */}
        <div className="row w-full m-2 h-[400px]">
          {body && <Tiptap content={body} setContent={setBody} />}
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
  );
}

export default EditPage;
