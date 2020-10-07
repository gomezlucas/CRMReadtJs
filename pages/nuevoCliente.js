import React, { useState } from 'react';
import Layout from './../components/Layout';
import { gql, useMutation } from '@apollo/client';
import { useFormik } from 'formik'
import { useRouter } from 'next/router';
import * as Yup from 'yup'


const NUEVO_CLIENTE = gql`
mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
  

`

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


const NuevoCliente = () => {


    // Mututation para crear nuevo usuario y update de cache 
    const [crearNuevoCliente] = useMutation(NUEVO_CLIENTE, {
        update(cache, { data: { nuevoCliente } }) {
            //Obtener el objeto de cache para actualizar   
            const { obtenerClientexVendedor } = cache.readQuery({ query: OBTENER_CLIENTES })
            // Reescribimos el cache ( el cache nunca se debe modificar)
            cache.writeQuery({
                query: OBTENER_CLIENTES,
                data: {
                    obtenerClientexVendedor: [
                        ...obtenerClientexVendedor, nuevoCliente
                    ]
                }
            }
            )
        }


    })



    // Estate para el mensaje desde el Server 
    const [mensaje, setMensaje] = useState(null)

    // Routing 
    const router = useRouter()

    // Validacion del formulario    
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("El campo nombre no puede estar vacio"),
            apellido: Yup.string().required("El campo apellido no puede estar vacio"),
            empresa: Yup.string().required("El campo empresa no puede estar vacio"),
            email: Yup.string().required("El campo email no puede estar vacio").email("Email no valido "),
            telefono: Yup.string()
        }),
        onSubmit: async valores => {
            const { nombre, apellido, email, empresa, telefono } = valores
            try {
                const { data } = await crearNuevoCliente({
                    variables: {
                        input: {
                            nombre, apellido, email, empresa, telefono
                        }
                    }
                })
                setMensaje('Usuario creado exitosamente')

                setTimeout(() => {
                    router.push('/')
                }, 3000);


            } catch (e) {
                setMensaje(e.message)

                setTimeout(() => {
                    setMensaje(null)
                }, 3000);
            }
        }
    })


    const mostrarMensaje = () => {
        return (
            <div className="bg-gray-100 py-2 px-1 mb-2 w-full max-w-md text-center mx-auto ">
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <Layout>
            <h1 className="text-2xl text-grey-800 font-light"> Nuevo Cliente </h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        {mensaje && mostrarMensaje()}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Nombre del Usuario"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.nombre && formik.touched.nombre ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.nombre} </p>
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
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.apellido && formik.touched.apellido ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.apellido} </p>
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
                                value={formik.values.empresa}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.empresa && formik.touched.empresa ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.empresa} </p>
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
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.email && formik.touched.email ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.email} </p>
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
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <input type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Crear Nuevo Cliente"
                        />

                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default NuevoCliente;