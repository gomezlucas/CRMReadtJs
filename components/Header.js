import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';



const OBTENER_USUARIO = gql`
query obtenerUsuario{
    obtenerUsuario{
      id
      nombre
  }
  }
`




const Header = () => {

    const router = useRouter()
    const { data, loading, error } = useQuery(OBTENER_USUARIO)


    if (loading) return null

    if (!data) {
        router.push('/login')
        return null 
    }

    const { nombre, apellido } = data.obtenerUsuario


    const cerrarSesion = () => {
        localStorage.removeItem('token')
        router.push('/login')
        }

    return (
        <div className="sm:flex sm:justify-between mb-6">
            <p className="mb-5 lg:mb-0"> Hello {nombre} {apellido}</p>
            <button
                className="bg-blue-800 font-bold w-full sm:w-auto text-white rounded px-3 py-1 text-xs uppercase shadow-md hover:bg-blue-500 w-full lg:w-auto text-center"
                type="button"
                onClick={() => cerrarSesion()}
            > Cerrar Sesion </button>
        </div>
    )

}


export default Header
