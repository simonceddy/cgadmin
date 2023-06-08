import { useFetchBlogQuery } from './blogAPI';

function ListBlogPosts() {
  const { data, error, isLoading } = useFetchBlogQuery();
  if (isLoading) {
    return (
      <div>
        Loading
      </div>
    );
  }

  if (error) {
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

  console.log(data);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-black text-lime-200">
      {data.map((post) => (
        <div key={`${post.slug}`}>{post.title}</div>
      ))}
    </div>
  );
}

export default ListBlogPosts;
