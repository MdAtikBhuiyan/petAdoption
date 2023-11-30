
import { useLoaderData, useParams } from "react-router-dom";
import paImg from '../../../public/images/w_pawprint.png'
import { useState } from "react";
import { Button, Modal } from 'flowbite-react';
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PetDetails = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const [openModal, setOpenModal] = useState(false);

    const pet = useLoaderData()

    const { petImg, petName, petAge, petLocation, petShortDes, petLongDes } = pet || {}

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        console.log(data);
        const { _id, ...rest } = pet || {};

        const adoptionRequest = { ...data, rest, petId: _id, requestStatus: 'pending' }

        const res = await axiosSecure.post('/adoptionRequests', adoptionRequest)
        console.log(res.data);
        if (res.data?.insertedId) {
            toast.success("Adoption request submit successfully")
            setOpenModal(false)
        }

    }

    return (
        <section className="w-[80%] mx-auto overflow-hidden mt-20 mb-14">

            <div className="bg-slate-100 rounded-xl shadow-xl max-w-6xl mx-auto p-10 flex flex-col md:flex-row gap-4 flex-wrap justify-center">

                <div className="w-full flex flex-col gap-6">
                    <img src={petImg} className="max-h-[350px] object-cover rounded-lg" alt="" />
                    <div className="md:px-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/2">
                                <h2 className="text-2xl md:text-3xl capitalize font-bold text-title-secondary ">{petName}</h2>
                                <p className="text-title-primary text-base font-bold mt-2">
                                    Age:
                                    <span className="text-secondary-text font-medium"> {petAge}</span>
                                </p>
                                <p className="text-title-primary text-base font-bold mt-2">
                                    Location:
                                    <span className="text-secondary-text font-medium"> {petLocation}</span>
                                </p>
                                <p className="text-secondary-text mt-4 text-justify text-sm">
                                    {petShortDes}
                                </p>
                            </div>
                            <div className="md:w-1/2">
                                <p className="text-secondary-text text-justify text-sm">
                                    {petLongDes}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-6 ">
                            <button
                                onClick={() => setOpenModal(true)}
                                className="text-white bg-primary-bg font-title hover:bg-secondary-bg focus:shadow-none font-medium rounded text-base md:text-xl px-3 py-2 md:px-5 md:py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2 capitalize">
                                Adoption <img src={paImg} className='w-6' alt="" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>





            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Adoption Form</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-wrap gap-2">
                                <div className="mb-6 md:w-[45%]">
                                    <label className="block mb-1.5 text-sm font-semibold text-title-optioanl" >Name</label>
                                    <input
                                        defaultValue={user?.displayName}
                                        name='name'
                                        {...register("name", { required: true })}
                                        className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded-lg "
                                        type="text"
                                        readOnly
                                    />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="mb-6 md:w-[45%]">
                                    <label className="block mb-1.5 text-sm font-semibold text-title-optioanl" >Email</label>
                                    <input
                                        defaultValue={user?.email}
                                        name='email'
                                        {...register("email", { required: true })}
                                        className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded-lg "
                                        type="email"
                                        readOnly
                                    />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="mb-7 md:w-[45%]">
                                    <label className="block mb-1.5 text-sm font-semibold text-title-optioanl" >Phone</label>
                                    <input
                                        name='phone'
                                        {...register("phone", { required: true })}
                                        className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded-lg "
                                        type="text"
                                        placeholder="Enter Phone" />
                                    {errors.phone && <span className="text-red-600">Phone is required</span>}
                                </div>
                                <div className="mb-7 md:w-[45%]">
                                    <label className="block mb-1.5 text-sm font-semibold text-title-optioanl" >Address</label>
                                    <input
                                        name='address'
                                        {...register("address", { required: true })}
                                        className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded-lg "
                                        type="text"
                                        placeholder="Enter address" />
                                    {errors.address && <span className="text-red-600">address is required</span>}
                                </div>
                            </div>

                            <button
                                className="relative group block w-full py-3 px-5 text-center text-base font-semibold font-title text-orange-50 bg-secondary-bg rounded-full overflow-hidden hover:bg-primary-bg transition-all"
                                type="submit">
                                Adoption Request
                            </button>

                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>

        </section>
    );
};

export default PetDetails;