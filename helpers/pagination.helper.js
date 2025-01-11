module.exports = (objectPagination, countRecord, query) => {
  objectPagination.totalPages = Math.ceil(
    countRecord / objectPagination.limitedPage
  );

  if (query.page) {
    objectPagination.currentPage = Number(query.page);
    if (query.limited) objectPagination.limitedPage = query.limited;
    objectPagination.skipPage = Number(
      (objectPagination.currentPage - 1) * objectPagination.limitedPage
    );
  }

  return objectPagination;
};
