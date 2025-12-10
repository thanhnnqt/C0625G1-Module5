import './globals.css';
import Link from 'next/link';

export const metadata = {
    title: 'Next Login Demo',
    description: 'Basic login with routing in Next.js 2025',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <nav style={{
            backgroundColor: '#f0f0f0',
            padding: '10px 20px',
            display: 'flex',
            gap: '20px',
        }}>
            <Link className='text-red-600' href="/">Home</Link>
            <Link className='text-red-600' href="/about">About Us</Link>
            <Link className='text-red-600' href="/blog">Blog</Link>
            <Link className='text-red-600' href="/login">Logout</Link>
        </nav>
        <main style={{ padding: '30px', maxWidth: '960px', margin: '0 auto' }}>
            {children}
        </main>
        </body>
        </html>
    );
}