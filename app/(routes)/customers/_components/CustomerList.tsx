import { Doc } from '@/convex/_generated/dataModel'
import CustomerItem from './CustomerItem'

interface Props {
  customers: Doc<'customers'>[]
  active: Doc<'customers'> | null
  handleClick: (_id: Doc<'customers'>) => void
}

const CustomerList = ({ customers, active, handleClick }: Props) => {
  return (
    <div className='w-full flex-1 overflow-y-auto'>
      {customers?.length ? (
        <table className='w-full overflow-y-auto table-auto'>
          <thead>
            <tr>
              <th>No</th>
              <th>Mijoz ismi</th>
              <th>Telefon raqami</th>
              <th>Qarz</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((doc, i) => (
              <CustomerItem
                key={doc._id}
                {...doc}
                i={i}
                handleClick={handleClick}
                active={active}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center text-xl flex-1 mt-8'>
          Sizda hech qanday mijoz mavjud emas
        </p>
      )}
    </div>
  )
}

export default CustomerList
