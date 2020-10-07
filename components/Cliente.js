import React from 'react';
import Swal from 'sweetalert2'
import { gql, useMutation } from '@apollo/client'
import Router from 'next/router'


const ELIMINAR_CLIENTE = gql`
    mutation eliminarCliente($id:ID!){
            eliminarCliente(id: $id)
  }
`
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


const Cliente = ({ cliente }) => {
    const { nombre, apellido, empresa, email, id } = cliente

    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE,{
        update(cache){
            // obtener una copia del objeto de cache
            const {obtenerClientexVendedor} = cache.readQuery({query:OBTENER_CLIENTES })

            //reescribir el cache
            cache.writeQuery({
                query: OBTENER_CLIENTES, 
                data:{
                    obtenerClientexVendedor: obtenerClientexVendedor.filter( clienteActual => clienteActual.id !== id )
                }
            })
        }
    })

    const confirmarEliminar = (id) => {
        Swal.fire({
            title: `Desea Eliminar el Cliente? ${nombre} ${apellido}`,
            text: "No sera posible deshacer esta operacion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'

        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const { data } = await eliminarCliente({
                        variables: {
                            id
                        }
                    })
                    Swal.fire(
                        'Eliminado!',
                        'El cliente ha sido eliminado',
                        'success'
                    )
                } catch (e) {
                    console.log(e)
                }
            }
        })
    }


    const  editarCliente = (id) =>{
        Router.push({
            pathname: '/editarcliente/[id]',
            query: {id}
        })
    }

    return (
        <tr>
            <td className="border px-4 py-2 text-black "> {nombre} {apellido}</td>
            <td className="border px-4 py-2"> {empresa} </td>
            <td className="border px-4 py-2"> {email} </td>
            <td className="border px-4 py-2">
                <button
                    className="flex justify-center align-center bg-red-700 text-white font-bold py-1 px-2 w-full text-sm hover:bg-red-900 rounded"
                    onClick={() => confirmarEliminar(id)}
                >
                    Eliminar
                        <svg className="w-6 h-6 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    className="flex justify-center align-center bg-green-700 text-white font-bold py-1 px-2 w-full text-sm hover:bg-green-900 rounded"
                    onClick={() => editarCliente(id)}
                >
                    Editar
                    <svg className="w-6 h-6 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>                        
                </button>
            </td>
        </tr>
    );
}

export default Cliente;