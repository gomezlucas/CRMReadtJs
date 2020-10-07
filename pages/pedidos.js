import React, { useState, useEffect } from 'react'
import Layout from './../components/Layout';
import Link from 'next/link'
import { useQuery, gql } from '@apollo/client';
import Pedido from './../components/Pedido';

const options = [
    { 'id': 'chocolate', 'nombre': 'chocolate' },
    { 'id': 'frutilla', 'nombre': 'frutilla' },
    { 'id': 'limon', 'nombre': 'limon' },
]

const OBTENER_PEDIDOS = gql`
query obtenerPedidosxVendedor {
    obtenerPedidosxVendedor{
      id
      total
      cliente{
          nombre
          apellido
          email
          telefono
      }
      vendedor
      fecha
      estado
      pedido{
          id
          cantidad
          nombre
      }
        }
  }
`

const Pedidos = () => {

    const { data, loading, error } = useQuery(OBTENER_PEDIDOS)

    if (loading) return "Cargando..."
    const { obtenerPedidosxVendedor } = data





    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-grey-800 font-light">  Pedidos</h1>
                <Link href="/nuevoPedido">
                    <a className="bg-blue-800 text-white font-bold py-2 px-3 mt-2 rounded inline-block hover:bg-blue-500">  Nuevo Pedido </a>
                </Link>
                {obtenerPedidosxVendedor.lenght > 0 ?
                    <p className="mt-5 text-center ">
                        No hay Pedidos aun
                    </p>
                    :
                    <>
                        {obtenerPedidosxVendedor.map(pedido => {
                            return <Pedido key={pedido.id} pedido={pedido} />
                        })}
                    </>
                }

            </Layout>
        </div>

    );
}

export default Pedidos;