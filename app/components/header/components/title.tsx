import Image from 'next/image';
import Logo from '@/public/logo/logo.svg';
import { TypographyH2 } from '@/shadcn/components/ui/typography-h2';

const Title = () => {
    const title = 'j u g g l e';

    return (
        <div className='flex flex-row justify-center gap-3 items-center mx-3'>
            <Image
                src={Logo}
                alt='logo'
                className='h-[30px] w-[30px]'
                priority={false}
            />
            <TypographyH2 className='h-[100%] w-auto flex gap-2 items-center border-b-0 pb-0 text-nowrap'>
                {title}
            </TypographyH2>
        </div>
    );
}

export default Title;