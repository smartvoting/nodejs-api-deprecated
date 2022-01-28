const _table = {
  name: "partyBlogs",
  keys: {
    partition: "partyId",
    sort: "blogId",
  },
  record: {
    datePosted: "datePosted",
    dateModified: "dateModified",
    blogBody: "blogBody",
    writerId: "writerId",
  },
};

module.exports = _table;
