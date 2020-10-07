import React, { PureComponent, useEffect } from 'react';
import Layout from './../components/Layout';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import { gql, useQuery } from '@apollo/client';





const MEJORES_VENDEDORES = gql`
    query mejoresVendedores {
        mejoresVendedores {
        vendedor {
        nombre
        apellido
      }
      total
    }
  }
`


const MejoresVendedores = () => {


    const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES)

    useEffect(() => {
        startPolling(1000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])


    if (loading) return "cargando..."


    const vendedoresGrafica = data.mejoresVendedores.map((vendedor, index) => {
        return { ...vendedor.vendedor[0], total: vendedor.total }
    })



    return (
        <Layout>
            <h1 className="text-2xl text-grey-800 font-light">  Mejores Vendedores</h1>
            <ResponsiveContainer
            width={'99%'}
            height={550}
            >
                <BarChart
                    width={600}
                    height={500}
                    data={vendedoresGrafica}
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

export default MejoresVendedores;