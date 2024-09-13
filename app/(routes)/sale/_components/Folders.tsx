import { useQuery } from 'convex/react'

// import SupplierProduct from './SupplierProduct'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'

const Folder = ({
  folder,
  setFolder,
}: {
  folder: Id<'categories'> | null
  setFolder: (id: Id<'categories'>) => void
}) => {
  const folders = useQuery(api.documents.getCategories)

  return (
    <div className='flex-1 max-h-[100vh] overflow-y-auto'>
      <p className='px-4 py-2 font-bold text-xl'>Papkalar</p>
      {folders?.map((doc) => (
        <div
          key={doc._id}
          className={cn(
            'flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 border-t',
            doc._id === folder ? 'bg-gray-100' : ''
          )}
          onClick={() => setFolder(doc._id)}
        >
          {doc.name}
        </div>
      ))}
    </div>
  )
}

export default Folder
