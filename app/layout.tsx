import Nav from '@/components/Nav'
import '@/styles/global.css'

export const metadata = {
    title: 'Next App Promtopia',
    description: 'Discover and share AI prompt '
}

type Props = {
    children: React.ReactNode
}
function Layout({ children }: Props) {
    return (
        <html>
            <body>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </body>
        </html>
    )
}

export default Layout