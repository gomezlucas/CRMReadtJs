import React, { useEffect, useState, useContext } from 'react';

import Select from 'react-select'
import { gql ,useQuery } from '@apollo/client';

import PedidoContext from './../../context/pedidos/PedidoContext';


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
 
const AsignarCliente = () => {
    const [cliente, setCliente] = useState([])

    // Context de Pedidos 
    const pedidoContext = useContext(PedidoContext)
    const {agregarCliente } = pedidoContext
 

    useEffect(() => {
        agregarCliente(cliente)
    }, [cliente])
    
    const {data, loading, error} = useQuery(OBTENER_CLIENTES)

    if (loading) return null

    
    const {obtenerClientexVendedor} = data
    

    const seleccionarCliente = clientes =>{
        setCliente(clientes)
    }
    return (
        <>
        <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"> 1.- Asigna un cliente al Pedido </p>   
        <Select
           options={obtenerClientexVendedor}
             onChange={ opcion => seleccionarCliente(opcion) }
            getOptionValue={option=> option.id}
            getOptionLabel={option => option.nombre}
            placeholder="Busque o seleccione cliente"
            noOptionsMessage={()=> "No hay resultados"}

        />
        </>
    );
}

export default AsignarCliente;