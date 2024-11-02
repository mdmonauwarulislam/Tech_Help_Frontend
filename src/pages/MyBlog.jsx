import ModalWithEditor from "./ModalWithEditor";

function MyBlog() {
  return (
    <div className="px-4 pt-3">
      <h1 className="m-auto text-blue-700 font-bold">My Blogs</h1>
      <div className="flex justify-between border border-b-2 border-t-0 border-r-0 border-l-0 pb-3">
        <div className="flex gap-4">
          <button>Publish</button>
          <button>Draft</button>
        </div>
        <div>
          <ModalWithEditor />
        </div>
      </div>
    </div>
  );
}

export default MyBlog;
