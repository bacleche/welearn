import Navbar from '@/components/object/Navbar'
import Footer from '@/components/object/Footer'

export default function VitrineLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}