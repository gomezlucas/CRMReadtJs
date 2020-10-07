import React from 'react';
import Layout from './../components/Layout';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'


const NUEVO_PRODUCTO = gql`
mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      existencia
      precio
      creado
    }
  }
  
`


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

const NuevoProducto = () => {

    const [crearNuevoProducto] = useMutation(NUEVO_PRODUCTO,{
        update(cache, {data: {nuevoProducto}}){
            //obtener el nuevo cache
            const {obtenerProductos} = cache.readQuery({query: OBTENER_PRODUCTOS})
console.log(obtenerProductos)
            //reescribir el cache con la nueva informacion
            cache.writeQuery({
                query: OBTENER_PRODUCTOS, 
                data: {
                    obtenerProductos:
                    [...obtenerProductos, nuevoProducto]
                }
            })
        }
    })

    const router = useRouter()

    // Validacion del formulario 
    const formik = useFormik({
        initialValues: {
            nombre: '',
            existencia: '',
            precio: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El campo Nombre no puede estar vacio'),
            existencia: Yup.number()
                .required('El Campo Existencia no puede ser vacio')
                .positive('No se aceptan numeros negativos')
                .integer("Deben ser numeros enteros")
            ,
            precio: Yup.number().required('El campo precio no puede estar vacio')
                .positive('No se aceptan numeros negativos')

        }),
        onSubmit: async valores => {
            console.log(valores)
            const { nombre, existencia, precio } = valores
            try {
                const { data } = await crearNuevoProducto({
                    variables: {
                        input: {
                            nombre, existencia, precio
                        }
                    }
                })
                console.log(data)

                //Mostrar alerta 
                Swal.fire(
                    'Creado!',
                    'El Producto ha sido creado',
                    'success'
                )
                //Redireccionar 
                router.push('/productos')
            } catch (error) {
                console.log(error)
            }

        }
    })



    return (
        <Layout>
            <h1 className="text-2xl text-grey-800 font-light"> Nuevo Cliente </h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                                Existencia
                        </label>
                            <input
                                type="number"
                                id="existencia"
                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Existencia del Producto"
                                value={formik.values.existencia}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.existencia && formik.touched.existencia ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.existencia} </p>
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
                                value={formik.values.precio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.precio && formik.touched.precio ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.precio} </p>
                            </div>
                            : null}


                        <input type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Crear Nuevo Producto"
                        />

                    </form>
                </div>
            </div>
        </Layout>


    );
}

export default NuevoProducto;