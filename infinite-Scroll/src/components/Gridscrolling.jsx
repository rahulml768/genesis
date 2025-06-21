import React,{useEffect,useState} from 'react'

const Gridscrolling = () => {
  const[data,setData] = useState([])

  const fecthData = async()=>{
    const res = await fetch("https://randomuser.me/api?page=1&results=16")
    const result = await res.json();
    if(result){
      console.log(result.results);
      setData((prevData) => [...prevData,...result.results])
    }
  }


  const handleScroll = (e)=>{
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const innerHeight =window.innerHeight

    if(scrollTop + innerHeight >= scrollHeight -2){
      console.log(scrollTop +innerHeight ,scrollHeight)
      fecthData();
    }
  }

  useEffect(()=>{
    fecthData()
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  },[])

  

  const coloumns = ["image","name","email"]
  return (
    <div>
      <table className ="w-full">
        <thead className='bg-gray-200'>
          <tr className ="grid-grid-cols-4">
            {
              coloumns.map((col,index)=>{
                return(
                  <th key ={index} className="p-4 text-left text-gray-700 font-semibold uppercase">
                    {col}
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody onScroll={()=>handleScroll()} className="grid grid-cols-4 gap-4">
          <tr className="grid-grid-cols-4 gap-4">
            <td className="p-4 text-gray-700">
              {
                data.map((item,index)=>{
                  return(
                    <div key={index} className="flex item-center flex-row">
                      <img src={item.picture.large} alt={item.name.first} className="w-12 h-12 rounded-full mr-4" />
                      <div className='flex flex-row'>
                        <p className="text-gray-900 font-semibold">{item.name.first} {item.name.last}</p>
                        <p className="text-gray-600">{item.email}</p>
                      </div>
                    </div>
                  )
                })
              }
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default Gridscrolling