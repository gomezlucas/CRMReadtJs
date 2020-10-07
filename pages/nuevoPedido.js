import React, { useContext, useState } from 'react';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProducto from '../components/pedidos/AsignarProducto';
import Layout from './../components/Layout';
import ResumenPedido from '../components/pedidos/ResumenPedido'
import TotalPedido from './../components/pedidos/TotalPedido';
// Context de pedidos
import PedidoContext from './../context/pedidos/PedidoContext';
import { useMutation, gql } from '@apollo/client';
import {useRouter} from 'next/router'

import  Swal  from 'sweetalert2';


const NUEVO_PEDIDO = gql`
mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
  
`

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

const NuevoPedido = () => {

    // Utilizar context y extraer sus funciones y valores
    const pedidoContext = useContext(PedidoContext)
    const { productos, total, cliente } = pedidoContext

    // Mutuation para nuevo Pedido
    const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
        update(cache, {data:{nuevoPedido}}){
            const {obtenerPedidosxVendedor} = cache.readQuery({
                query: OBTENER_PEDIDOS
            })

            cache.writeQuery({
                query: OBTENER_PEDIDOS,
                data:{
                    obtenerPedidosxVendedor: [...obtenerPedidosxVendedor, nuevoPedido]
                }
            })
        } 
    })

    //State para mensaje 
    const [mensaje, setMensaje] = useState('')

    //routing 
    const router = useRouter()

    const validarPedido = () => {
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length ? 'opacity-50 cursor-not-allowed' : ''
    }

    const crearNuevoPedido = async () => {
        const pedido = productos.map(({ __typename, existencia, creado, ...producto }) => producto)
        const { id } = cliente
         try {

            const { data } = await nuevoPedido({
                variables: {
                    input: {
                        cliente: id,
                        total,
                        pedido
                    }
                }
            })
             //alerta 
            Swal.fire(
                "Correcto",
                "El pedido se registro correctamente",
                "success"

            )
            
            //router
            router.push('/pedidos')


        } catch (e) {
            setMensaje(e.message)

            setTimeout(() => {
                setMensaje('')
            }, 3000);
        }
    }

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-1 mt-4 w-full max-w-lg text-center mx-auto ">
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <Layout>
            <h1 className="text-2xl text-grey-800 font-light"> Crear Nuevo Pedido </h1>
            {mensaje && mostrarMensaje()}

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProducto />
                    <ResumenPedido />
                    <TotalPedido />

                    <button type="button"
                        className={`bg-gray-800  w-full mt-5 p-2 text-white  uppercase font-bold hover:bg-blue-700 ${validarPedido()}`}
                        onClick={() => crearNuevoPedido()}
                    >

                        Agregar Pedido
                    </button>
                </div>

            </div>

        </Layout>

    );
}

export default NuevoPedido

