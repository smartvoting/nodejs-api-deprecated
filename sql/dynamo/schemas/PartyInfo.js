const _table = {
  name: "partyInfo",
  keys: {
    partition: "partyId",
    sort: "recordType",
  },
  record: {
    entryBody: "entryBody",
    dateModified: "dateModified",
  },
};

module.exports = _table;
