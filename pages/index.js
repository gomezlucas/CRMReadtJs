import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Cliente from '../components/Cliente'

const OBTENER_CLIENTES = gql`
query obtenerClientexVendedor{
  obtenerClientexVendedor{
  nombre
  empresa
    apellido
     id
    email
  }
  }
`


const Home = () => {

  //consulta de Apollo
  const router = useRouter()
  const { data, loading, error } = useQuery(OBTENER_CLIENTES)

  if (loading) {
    return <h2> Cargando...</h2>
  }

  if (!data) {
    router.push('/login')
    return null
  }


  return (
    <div >
      <Layout>
        <h1 className="text-2xl text-grey-800 font-light"> Clientes </h1>
        <Link href="/nuevoCliente">
          <a className="bg-blue-800 text-white font-bold py-2 px-3 mt-2 rounded inline-block hover:bg-blue-500">  Nuevo Cliente </a>
        </Link>

        <div className="overflow-x-scroll"> 
          <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2"> Nombre </th>
              <th className="w-1/5 py-2"> Empresa </th>
              <th className="w-1/5 py-2"> Email </th>
              <th className="w-1/5 py-2"> Eliminar </th>
              <th className="w-1/5 py-2"> Editar </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {
              data.obtenerClientexVendedor.map(cliente => {
                return (
                  <Cliente cliente={cliente} key={cliente.id} />
                )
              })
            }
          </tbody>
        </table></div>
      </Layout>
    </div>
  )
}

export default Home