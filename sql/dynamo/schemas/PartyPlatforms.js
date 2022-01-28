const _table = {
  name: "partyPlatforms",
  keys: {
    partition: "partyId",
    sort: "topicId",
  },
  record: {
    topicBody: "topicBody",
    dateModified: "dateModified",
  },
};

module.exports = _table;
