import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client';

import PedidoContext from './../../context/pedidos/PedidoContext';


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

const AsignarProducto = () => {

  const [productos, setProductos] = useState([])

    //context de pedidos 
    const pedidoContext = useContext(PedidoContext)
    const {agregarProducto} = pedidoContext

    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS)


 

    useEffect(()=>{
        agregarProducto(productos)
    },[productos])

    const seleccionarProducto = (producto) => {
      if (!producto) {
        producto = []
      }
        setProductos(producto)
    }

    if (loading) return null

    const { obtenerProductos } = data

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"> 2.- Asigna productos al Pedido </p>
            <Select
                options={obtenerProductos}
                onChange={opcion => seleccionarProducto(opcion)}
                isMulti={true}
                getOptionValue={option => option.id}
                getOptionLabel={option => `${option.nombre} - ${option.existencia} disponibles`}
                placeholder="Busque o seleccione cliente"
                noOptionsMessage={() => "No hay resultados"}

            />
        </>

    );
}

export default AsignarProducto;