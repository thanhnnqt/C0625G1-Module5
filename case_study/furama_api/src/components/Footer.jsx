export default function Footer() {
    return (
        <footer className="bg-light text-center text-muted py-3 mt-4 border-top">
            <div className="container-fluid">
                <p className="mb-0">
                    © {new Date().getFullYear()} Furama Resort — Module 5 ReactJS Case Study
                </p>
            </div>
        </footer>
    );
}
