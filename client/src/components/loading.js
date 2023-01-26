const Placeholder = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-neutral-400 h-10 w-10"></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-neutral-400 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-neutral-400 rounded col-span-2"></div>
            <div className="h-2 bg-neutral-400 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-neutral-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex flex-row-reverse justify-between mt-20">
      <div className="flex flex-col p-4 w-80 mr-10 space-y-10 border border-neutral-400 shadow rounded-md">
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </div>
      <div className="flex flex-col m-auto mt-20 w-64 h-64 bg-black bg-transparent rounded-lg">
        <h1 className="text-neutral-400 text-4xl animate-pulse">Loading...</h1>
        <svg className="animate-spin h-56 w-56" viewBox="0 0 24 24"></svg>
      </div>
    </div>
  );
};

export default Loading;
