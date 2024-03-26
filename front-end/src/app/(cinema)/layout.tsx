import Header from '../ui/header/header';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'cinema',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div>{children}</div>
        </>
    );
}