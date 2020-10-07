import React from 'react';
import { useRouter } from 'next/router';
import Layout from './../../components/Layout';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik'
import * as Yup from 'yup'
import  Swal  from 'sweetalert2';

const OBTENER_CLIENTE = gql` 
query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      nombre
      apellido
      empresa
      telefono
      email
    }
  }
  
`

const ACTUALIZAR_CLIENTE = gql` 
mutation actualizarCliente($id: ID!, $input: ClienteInput) {
    actualizarCliente(id: $id, input: $input) {
      id
      nombre
      apellido
      email
    }
  }
  `

const EditarCliente = () => {

    const router = useRouter()
    const { query: { id } } = router
    


    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
            id
        }
    })

    const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE)


    const schemaValidation = Yup.object({
        nombre: Yup.string().required("El campo nombre no puede estar vacio"),
        apellido: Yup.string().required("El campo apellido no puede estar vacio"),
        empresa: Yup.string().required("El campo empresa no puede estar vacio"),
        email: Yup.string().required("El campo email no puede estar vacio").email("Email no valido "),
        telefono: Yup.string()
    })
    
    if (loading) return <h1> Cargando... </h1>
    
    let { obtenerCliente } = data


    // Modifica el cliente en la base de datos 
    const modificarCliente = async (valores) => {
        const { nombre, apellido, telefono, empresa, email } = valores
        try {
            const {data} = await actualizarCliente({
                variables: {
                    id,
                    input: {
                        nombre, apellido, telefono, empresa, email
                    }
                }
            })

            Swal.fire(
                'Actualizado!',
                'El cliente ha sido actualizado',
                'success'
            )
             router.push('/')

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Layout>
            <h1 className="text-2xl text-grey-800 font-light">  Editar Cliente </h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        validationSchema={schemaValidation}
                        enableReinitialize={true}
                        initialValues={obtenerCliente}
                        onSubmit={valores => {
                            modificarCliente(valores)
                        }
                        }
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
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                                Apellido
                                            </label>
                                            <input
                                                type="text"
                                                id="apellido"
                                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="Apellido del Usuario"
                                                value={props.values.apellido}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        {props.errors.apellido && props.touched.apellido ?
                                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                <p className="font-bold"> Error </p>
                                                <p> {props.errors.apellido} </p>
                                            </div>
                                            : null}

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                                Empresa
                                           </label>
                                            <input
                                                type="text"
                                                id="empresa"
                                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="Empresa"
                                                value={props.values.empresa}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        {props.errors.empresa && props.touched.empresa ?
                                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                <p className="font-bold"> Error </p>
                                                <p> {props.errors.empresa} </p>
                                            </div>
                                            : null}
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                                Email
                                         </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="Empresa"
                                                value={props.values.email}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        {props.errors.email && props.touched.email ?
                                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                <p className="font-bold"> Error </p>
                                                <p> {props.errors.email} </p>
                                            </div>
                                            : null}

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                                Telefono
                                        </label>
                                            <input
                                                type="text"
                                                id="telefono"
                                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="Telefono"
                                                value={props.values.telefono}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        <input type="submit"
                                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                            value="Editar Cliente "
                                        />

                                    </form>
                                )
                            }
                        }
                    </Formik>
                </div>
            </div>

        </Layout>
    );
}

export default EditarCliente;