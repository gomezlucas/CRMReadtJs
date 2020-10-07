import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer'

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from '../../types'

const PedidoState = ({ children }) => {

    // state de pedidos

    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState)

    // Modifica el cliente  
    const agregarCliente = (cliente) => {
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    // Modifica el producto
    const agregarProducto = productosSeleccionados => {
        let nuevoState 

        if(state.productos.length > 0 ){
            
            nuevoState = productosSeleccionados.map( producto =>{
                const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id )
                console.log(nuevoObjeto, 'nuevoobje')    
                return {...producto, ...nuevoObjeto}

            })
        }else {
            nuevoState = productosSeleccionados 
        }


        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload:  nuevoState 

        })
    }

    // Modifica la cantidad del producto
    const modificarCantidad = (newProducto) =>{
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: newProducto
        })
    }

    // Actualiza el Total 
    const actualizarTotal = () =>{
        console.log('calculando')
        dispatch({
            type: ACTUALIZAR_TOTAL
        })
    }


    return (
        <PedidoContext.Provider
            value={
                {
                    productos: state.productos,
                    cliente: state.cliente, 
                    total: state.total,
                    agregarCliente,
                    agregarProducto,
                    modificarCantidad,
                    actualizarTotal,
                }
            }
        >
            {children}
        </PedidoContext.Provider>
    )
}


export default PedidoState