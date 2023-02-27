const BlogForm = ({
  addNewBlog,
  blogTitle,
  blogAuthor,
  blogUrl,
  updateTitle,
  updateAuthor,
  updateUrl
}) => {
  return (
    <form onSubmit={addNewBlog}>
      <div>
        title<input value={blogTitle} onChange={ updateTitle } />
      </div>
      <div>
        author<input value={blogAuthor} onChange={ updateAuthor } />
      </div>
      <div>
        url<input value={blogUrl} onChange={ updateUrl } />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
