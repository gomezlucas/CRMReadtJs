import React, { useContext } from 'react';
import PedidoContext from './../../context/pedidos/PedidoContext';
import ProductoResumen from './ProductoResumen'
const ResumenPedido = () => {

    //context de pedidos 
    const pedidoContext = useContext(PedidoContext)
    const { productos } = pedidoContext

 
    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"> 3.- Ajusta  las cantidad del Producto  </p>

            { productos && productos.length > 0 ?
                <>

                    {
                        productos.map(producto => {
                            return (
                                <ProductoResumen
                                    key={producto.id}
                                    producto={producto}
                                />
                            )
                        })
                    }
                </>
                :
                <div className="text-sm mt-4">
                    No hay Productos
                 </div>


            }

        </>
    );
}

export default ResumenPedido;