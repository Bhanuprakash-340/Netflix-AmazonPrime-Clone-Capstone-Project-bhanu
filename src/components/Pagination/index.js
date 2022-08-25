import './index.css'

const Pagination = ({pageHandler, activePage, perPage}) => {
  const pageNumbers = []

  for (let i = 1; i < Math.ceil(perPage.length / 12) + 1; i += 1) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination-container">
      {pageNumbers.map(each => (
        <button
          type="button"
          className={`page-no active-${activePage}`}
          key={each}
          onClick={() => pageHandler(each)}
        >
          {each}
        </button>
      ))}
    </div>
  )
}

export default Pagination
