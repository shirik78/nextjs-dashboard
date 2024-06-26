import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import Image from 'next/image';
import { TableRowSkeleton } from '@/app/ui/skeletons';
import { fetchCustomers }  from '@/app/lib/data';

export const metadata:Metadata = {
    title:'Customers'
}

export default  async function Page() {
    const customers  = await fetchCustomers();
  return (
          <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Customers
            </h1>
            {customers?.map((customer)=>{
                return (   
                <Suspense fallback = {<TableRowSkeleton/>} key={customer.id}>
                  <div className="mb-2 w-full rounded-md bg-white p-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={customer.image_url}
                              className="rounded-full"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{customer.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    </div>
                  </Suspense>
            );
            })}
            
          </main>
  )
}