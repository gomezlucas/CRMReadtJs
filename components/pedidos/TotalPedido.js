import React, {useContext} from 'react';
import PedidoContext from './../../context/pedidos/PedidoContext';
 
const TotalPedido = () => {


     // Utilizar context y extraer sus funciones y valores
     const pedidoContext = useContext(PedidoContext)
     console.log('pedidod', pedidoContext)
    const {total} = pedidoContext
 
 
     return (
        <div className="flex items-center mt-5 justify-between bg-white p-3">
            <h2 className="text-gray-800 font-bold text-lg"> Total </h2>
            <p className="tex-gray-800 mt-0 font-bold"> $ {total}</p>
        </div>

    );
}

export default TotalPedido

