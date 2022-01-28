const _table = {
  name: "agencyInfo",
  
  keys: {
    partition: "agencyCode",
    sort: "docType",
  },
  record: {
    bodyText: "bodyText",
    dateModified: "dateModified",
  },
};

module.exports = _table;
