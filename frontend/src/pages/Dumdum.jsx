
import React, { useEffect, useState } from 'react';
const Dumdum = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8084/users' )
          .then(res => res.json())
          .then(data => setData(data))
          .catch(err => console.log(err));
  
         
    }, []);

  return (
    <div>
       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className="px-16 py-3">
              <span className="sr-only">Id</span>
            </th>
         
            <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                       Name
                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div></th>

                    <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                    password
                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div></th>
                    <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                     email
                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div></th>
                    </tr>    </thead>
                    <tbody>
                  
                  
                    {data.map((d, i) => (
            <tr key={i}>
                <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{d.id}</td>
            
              <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{d.name}</td>
              <td className="px-6 py-4 font-semibold text-lg text-gray-900 dark:text-white">{d.email}</td>
              <td className="px-6 py-4 text-lg">{d.password}</td>
           
                  </tr>
                   ) )}
                  
                    </tbody>
                  
                  </table>
    </div>
  )
}

export default Dumdum
