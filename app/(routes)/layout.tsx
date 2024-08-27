import Navbar from '@/components/layout/Navbar'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-[100vh] dark:bg-[#1f1f1f]'>
      <Navbar />
      <main className='h-full pt-14'>{children}</main>
    </div>
  )
}

export default layout
