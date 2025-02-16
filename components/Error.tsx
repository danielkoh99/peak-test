export default function GenericError({ children }: { children: React.ReactNode }) {
    return (
        <div className='text-center text-lg text-red-600'>
            {children}
        </div>
    )
}
