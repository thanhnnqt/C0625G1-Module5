export default function Pagination({ currentPage, totalPages, onPageChange }) {

    const numbers = [];
    for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
    }

    return (
        <nav className="mt-3">
            <ul className="pagination justify-content-center mt-4">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}>
                        Previous
                    </button>
                </li>
                {numbers.map((n) => (
                    <li
                        key={n}
                        className={`page-item ${n === currentPage ? "active" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(n)}>
                            {n}
                        </button>
                    </li>
                ))}
                <li
                    className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                    }`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}
