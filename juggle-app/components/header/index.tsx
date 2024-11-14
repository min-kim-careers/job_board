import Link from 'next/link';
import Navbar from './components/navbar';
import Search from './components/search';
import Title from './components/title';

const Header = () => {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row items-center justify-between py-2'>
                <Link href='/'>
                    <Title />
                </Link>
                <Navbar />
            </div>
            <Search />
        </div>
    );
};

export default Header;
