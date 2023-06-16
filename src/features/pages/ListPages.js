import { Link } from 'react-router-dom';
import { useFetchPagesQuery } from './pagesAPI';
import ErrorMessage from '../../components/ErrorMessage';

function ListPages() {
  const { data, error, isLoading } = useFetchPagesQuery();
  if (isLoading) {
    return (
      <div>
        Loading
      </div>
    );
  }

  if (error) return <ErrorMessage error={error} />;

  // console.log(data);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {data.map((page) => (
        <Link
          className="p-1 m-1 text-xl hover:underline"
          to={`/edit/${page.slug}`}
          key={`${page.slug}`}
        >
          {page.title}
        </Link>
      ))}
    </div>
  );
}

export default ListPages;
