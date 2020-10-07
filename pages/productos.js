import React from 'react'
import Layout from './../components/Layout';
import { gql, useQuery } from '@apollo/client'
import Producto from '../components/Producto'
import Link from 'next/link'
 

const OBTENER_PRODUCTOS = gql`
query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
      creado
    }
  }
  `

const Productos = () => {

    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)


    if (loading) return <h2> Cargando...  </h2>

 
    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-grey-800 font-light">  Productos</h1>
                <Link href="/nuevoProducto">
                    <a className="bg-blue-800 text-white font-bold py-2 px-3 mt-2 rounded inline-block hover:bg-blue-500">  Nuevo Producto </a>
                </Link>
                <div className="overflow-x-scroll"> 

                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                            <th className="w-1/5 py-2"> Nombre </th>
                            <th className="w-1/5 py-2"> Existencia </th>
                            <th className="w-1/5 py-2"> Precio </th>
                            <th className="w-1/5 py-2"> Eliminar </th>
                            <th className="w-1/5 py-2"> Editar </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            data.obtenerProductos.map(producto => {
                                return <Producto producto={producto} key={producto.id} />
                            })
                        }
                    </tbody>
                </table>
                </div>
            </Layout>

        </div>

    );
}

export default Productos;