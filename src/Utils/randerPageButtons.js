export const RenderPageButtons = (currentPage, pageCounts, setCurrentPage) => {
  let buttons = [];

  for (let i = 0; i < pageCounts; i++) {
    if (currentPage === 1) {
      if (
        i === currentPage - 1 ||
        i === currentPage ||
        i === currentPage + 1 ||
        i === currentPage + 2 ||
        i === currentPage + 3
      ) {
        buttons.push(
          <button
            className={currentPage === i + 1 ? "active" : null}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        );
      }
    } else if (currentPage === 2) {
      if (
        i === currentPage - 2 ||
        i === currentPage - 1 ||
        i === currentPage ||
        i === currentPage + 1 ||
        i === currentPage + 2 ||
        i === currentPage + 3
      ) {
        buttons.push(
          <button
            className={currentPage === i + 1 ? "active" : null}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        );
      }
    } else if (currentPage === pageCounts) {
      if (
        i === currentPage - 4 ||
        i === currentPage - 3 ||
        i === currentPage - 2 ||
        i === currentPage - 1 ||
        i === currentPage
      ) {
        buttons.push(
          <button
            className={currentPage === i + 1 ? "active" : null}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        );
      }
    } else if (currentPage === pageCounts - 1) {
      if (
        i === currentPage - 4 ||
        i === currentPage - 3 ||
        i === currentPage - 2 ||
        i === currentPage - 1 ||
        i === currentPage
      ) {
        buttons.push(
          <button
            className={currentPage === i + 1 ? "active" : null}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        );
      }
    } else if (currentPage === pageCounts - 2) {
      if (
        i === currentPage - 3 ||
        i === currentPage - 2 ||
        i === currentPage - 1 ||
        i === currentPage ||
        i === currentPage + 1
      ) {
        buttons.push(
          <button
            className={currentPage === i + 1 ? "active" : null}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        );
      }
    } else {
      if (
        i === currentPage - 2 ||
        i === currentPage - 1 ||
        i === currentPage ||
        i === currentPage + 1 ||
        i === currentPage + 2
      ) {
        buttons.push(
          <button
            className={currentPage === i + 1 ? "active" : null}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        );
      }
    }
  }

  return buttons;
};
