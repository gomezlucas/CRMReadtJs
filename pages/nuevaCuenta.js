import React, {useState} from 'react'
import Layout from './../components/Layout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'


const NUEVO_USUARIO = gql(`
    mutation nuevoUsuario($input: UsuarioInput) {
            nuevoUsuario( input: $input ){
                id
                nombre
                apellido
   }
 }
`);

const NuevaCuenta = () => {

    // State para guardar mensaje 

    const [mensaje, setMensaje] = useState(null)

    // mutation para crear nuevos usuarios
    const [nuevoUsuario] = useMutation(NUEVO_USUARIO)


    // Routing

    const router = useRouter()

    //validacion del formulario 
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El Nombre es obligatorio'),
            apellido: Yup.string().required('El Apellido es obligatorio'),
            email: Yup.string().email("Inserte un email valido").required('El Email es obligatorio'),
            password: Yup.string().required('El Password es obligatorio').min(6, "El Password debe ser de al menos 6 caracteres")
        }),
        onSubmit: async valores => {
            const { nombre, apellido, email, password } = valores
            console.log(valores)
            try {
                const { data } = await nuevoUsuario({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password
                        }
                    }
                })

                //usuario creado Correctamente
                setMensaje('El Usuario se ha creado corretamente')


                setTimeout(() => {
                    setMensaje(null)    
                    router.push('/login')
                }, 3000);

            } catch (e) {
                 setMensaje(e.message)

                 setTimeout(() => {
                     setMensaje(null)
                 }, 2500);
            }
        }
    })

    // function que muestra el mensaje 
    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full max-w-sm text-center mx-auto ">
                <p>{mensaje}</p>
            </div>
        )
    }


    return (
        <>
            <Layout>
                {
                    mensaje && mostrarMensaje()
                }
                <h1 className="text-center text-white font-light text-2xl"> Crear Nueva Cuenta</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm ">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                            </label>
                                <input
                                    type="nombre"
                                    id="nombre"
                                    className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Nombre Usuario"
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
                                    type="apellido"
                                    id="apellido"
                                    className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Apellido Usuario"
                                    value={formik.values.apellido}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}

                                /></div>
                            {formik.errors.apellido && formik.touched.apellido ?
                                <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> Error </p>
                                    <p> {formik.errors.apellido} </p>
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
                                    placeholder="Email Usuario"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}

                                /></div>
                            {formik.errors.email && formik.touched.email ?
                                <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> Error </p>
                                    <p> {formik.errors.email} </p>
                                </div>
                                : null}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                            </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Password Usuario"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}

                                /></div>
                            {formik.errors.password && formik.touched.password ?
                                <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> Error </p>
                                    <p> {formik.errors.password} </p>
                                </div>
                                : null}

                            <input type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900  "
                                value="Crear Cuenta"
                            />
                        </form>
                    </div>
                </div>

            </Layout>
        </>

    );
}

export default NuevaCuenta;