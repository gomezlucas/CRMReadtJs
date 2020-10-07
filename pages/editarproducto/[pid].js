import React from 'react';
import Layout from './../../components/Layout';
import { useRouter } from 'next/router';
import { Formik } from 'formik'
import * as Yup from 'yup'
import { gql, useQuery, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

const OBTENER_PRODUCTO = gql`
query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      precio
      existencia
    }
  }
  
`

const ACTUALIZAR_PRODUCTO = gql`
mutation actualizarProducto($id: ID!, $input: ProductoInput){
    actualizarProducto(id: $id, input: $input){
      nombre
      existencia
      precio
      id
    }
  }
`



const EditarProducto = () => {
    const router = useRouter()
    const { query: { id } } = router

    const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
        variables: {
            id
        }
    })

    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO)

    const schemaValidation = Yup.object({
        nombre: Yup.string().required('El campo Nombre no puede estar vacio'),
        existencia: Yup.number()
            .required('El Campo Existencia no puede ser vacio')
            .positive('No se aceptan numeros negativos')
            .integer("Deben ser numeros enteros")
        ,
        precio: Yup.number().required('El campo precio no puede estar vacio')
            .positive('No se aceptan numeros negativos')
    })


    if (loading) return <h2> Cargando... </h2>

    if (!data) return 'accion no  permitida'
    
    const { obtenerProducto } = data

    const actualizarProductosInfo = async (valores) => {
        const { nombre, precio, existencia } = valores
        try {
            const { data } = await actualizarProducto({
                variables: {
                    id,
                    input: {
                        nombre, existencia, precio
                    }
                }
            })

            console.log(data)

            //mostrar alert 
            Swal.fire(
                'Actualizado!',
                'El cliente ha sido actualizado',
                'success'
            )
            //redireccionar 
            router.push('/productos')
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <Layout>
            <h1 className="text-2xl text-grey-800 font-light"> Editar Producto </h1>
            <Formik
                validationSchema={schemaValidation}
                enableReinitialize={true}
                initialValues={obtenerProducto}
                onSubmit={valores => {
                    actualizarProductosInfo(valores)
                }}
            >

                {
                    props => {
                        return (
                            <form
                                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={props.handleSubmit}
                            >

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                        Nombre
                        </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Nombre del Usuario"
                                        value={props.values.nombre}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.errors.nombre && props.touched.nombre ?
                                    <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> {props.errors.nombre} </p>
                                    </div>
                                    : null}


                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                                        Existencia
                        </label>
                                    <input
                                        type="number"
                                        id="existencia"
                                        className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Existencia del Producto"
                                        value={props.values.existencia}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.errors.existencia && props.touched.existencia ?
                                    <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> {props.errors.existencia} </p>
                                    </div>
                                    : null}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                        Precio
                        </label>
                                    <input
                                        type="number"
                                        id="precio"
                                        className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Precio"
                                        value={props.values.precio}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.errors.precio && props.touched.precio ?
                                    <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> {props.errors.precio} </p>
                                    </div>
                                    : null}


                                <input type="submit"
                                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                    value="Actualizar Producto"
                                />

                            </form>
                        )
                    }
                }

            </Formik>
        </Layout>

    );
}

export default EditarProducto;