import React, { PureComponent, useEffect } from 'react';
import Layout from './../components/Layout';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import { gql, useQuery } from '@apollo/client';


const MEJORES_CLIENTES = gql`
query mejoresClientes{
    mejoresClientes{
      cliente{
        nombre
        empresa
        email
      }
      total
    }
    }
    `

const MejoresClientes = () => {

    const {data, loading, error} = useQuery(MEJORES_CLIENTES)


    if (loading) return 'Cargando...'

    console.log(data.mejoresClientes)

    const clientesGrafica = data.mejoresClientes.map((cliente, index)=>{
        return {...cliente.cliente[0], total : cliente.total}
    })
    console.log(clientesGrafica, 'grafica')

    return (
        <Layout>
            <h1 className="text-2xl text-grey-800 font-light">  Mejores Clientes</h1>
            <ResponsiveContainer 
            width={'99%'}
            height={550}
            >
            <BarChart
                width={600}
                height={500}
                data={clientesGrafica}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
        </Layout>

    );
}

export default MejoresClientes;