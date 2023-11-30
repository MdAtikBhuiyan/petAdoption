
import SectionTitle from "../../../../components/sectionTitle/sectionTitle";

import Select from 'react-select'
import { useFormik } from "formik";

import * as Yup from 'yup';
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const formValidationSchema = Yup.object().shape({
    petName: Yup.string().required("Pet Name is Required"),
    petAge: Yup.string().required("Pet Age is Required"),
    petCategory: Yup.object().required("Pet Category is Required"),
    petLocation: Yup.string().required("Location is Required"),
    petShortDes: Yup.string().required("Short description is Required"),
    petLongDes: Yup.string().required("Long description is Required"),
    petImg: Yup.string().required("Pet image is Required"),
});


const cloudinary_api = 'https://api.cloudinary.com/v1_1/df0nnfc5b/image/upload'
const upload_preset_name = 'rp3ewx6o'

const UpdatePets = () => {

    const { state } = useLocation()
    const [petDetails, setPetDetils] = useState(state?.signlePet || {})
    useEffect(() => {
        setPetDetils(state?.signlePet)
    }, [state?.signlePet])

    console.log(petDetails);

    const axiosSecure = useAxiosSecure()

    const options = [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'rabbit', label: 'Rabbit' },
        { value: 'bird', label: 'Bird' },
        { value: 'fish', label: 'Fish' },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const { values, handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            petName: petDetails?.petName,
            petAge: petDetails?.petAge,
            petCategory: petDetails?.petCategory,
            petLocation: petDetails?.petLocation,
            petShortDes: petDetails?.petShortDes,
            petLongDes: petDetails?.petLongDes,
            petImg: petDetails?.petImg,
        },

        validationSchema: formValidationSchema,

        onSubmit: (values, { resetForm }) => {
            console.log(values);
            // image hosting
            const formData = new FormData();
            formData.append('file', values?.petImg);
            formData.append('upload_preset', upload_preset_name);

            let addPetInfo = { ...values, adoptStatus: petDetails?.adoptStatus || false }
            let photoURl = null;
            if (values.petImg) {

                fetch(cloudinary_api, {
                    method: 'POST',
                    body: formData,
                })
                    .then(response => response.json())
                    .then((data) => {
                        // console.log(data);

                        photoURl = data.url;

                        if (photoURl) {
                            addPetInfo.petImg = photoURl;
                            axiosSecure.put(`/allPets?id=${petDetails?._id}`, addPetInfo)
                                .then(res => {
                                    console.log(res.data);
                                    resetForm();

                                    if (res.data.modifiedCount > 0) {
                                        Swal.fire({
                                            icon: "success",
                                            title: "Pet Updated!",
                                            text: `Pet successfully Updated to the database`,
                                            // timer: 2000
                                        });
                                    }
                                })
                        }


                    })
                    .catch(err => console.error(err));

            }
            // axiosSecure.post('/allPets', addPetInfo)
            //     .then(res => {
            //         // console.log(res.data);
            //         resetForm();

            //         if (res.data?.insertedId) {
            //             Swal.fire({
            //                 icon: "success",
            //                 title: "Pet added!",
            //                 text: `Pet successfully add to the database`,
            //                 // timer: 2000
            //             });
            //         }
            //     })

        },

    });



    //     const formData = new FormData();
    //     formData.append('file', values?.petImg);
    //     formData.append('upload_preset', upload_preset_name);

    //     if (values?.petImg) {
    //         formData.append('file', values?.petImg);
    //         formData.append('upload_preset', upload_preset_name);

    //         fetch(cloudinary_api, {
    //             method: 'POST',
    //             body: formData,
    //         })
    //             .then(response => response.json())
    //             .then((data) => {
    //                 console.log(data);
    //                 if (data.secure_url !== '') {
    //                     const uploadedFileUrl = data.secure_url;
    //                     localStorage.setItem('passportUrl', uploadedFileUrl);
    //                 }
    //             })
    //             .catch(err => console.error(err));
    //     }
    // }, [values?.petImg])

    // console.log(new Date("<YYYY-mm-ddTHH:MM:ssZ>"));

    return (
        <div>
            <div className="text-center">
                <SectionTitle subHeading={'Update'} heading={"Update your Pet"} darkMode={true} />
            </div>

            <form onSubmit={handleSubmit} className="my-12">

                <div className="max-w-xs mb-8">
                    <label className="text-title-optioanl text-sm font-bold">
                        Pet Image:
                    </label>
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-2 pb-4">
                            <svg className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload photo</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or JPEG </p>
                        </div>
                        <input
                            id='petImg'
                            name="petImg"
                            onChange={(event) => {
                                // let file = event.currentTarget.files[0]
                                let file = { target: { name: 'petImg', value: event?.currentTarget?.files[0] } }
                                console.log(file);
                                handleChange(file)
                            }}
                            // onChange={handleChange}

                            type="file" className="max-w-[220px] pb-2" />
                    </label>
                    {errors?.petImg && <div className="text-red-600">{errors.petImg}</div>}
                </div>
                <div className="grid grid-cols-1 gap-8 mt-6 sm:grid-cols-2">
                    <div>
                        <label className="text-title-optioanl text-sm font-bold">
                            Pet Name:
                        </label>
                        <input
                            onChange={handleChange}
                            value={values.petName}
                            id='petName'
                            name="petName"
                            type="text"
                            // defaultValue={updateProduct?.name}
                            placeholder="Pet Name"
                            className="w-full py-2 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded"
                        />
                        {errors?.petName && <div className="text-red-600">{errors.petName}</div>}
                    </div>
                    <div>
                        <label className="text-title-optioanl text-sm font-bold">
                            Pet Age:
                        </label>
                        <input
                            onChange={handleChange}
                            value={values.petAge}
                            id='petAge'
                            name="petAge"
                            type="number"
                            // defaultValue={updateProduct?.quantity}
                            placeholder="Pet Age"
                            className="w-full py-2 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded"
                        />
                        {errors?.petAge && <div className="text-red-600">{errors.petAge}</div>}
                    </div>
                    <div>
                        <label className="text-title-optioanl text-sm font-bold">
                            Category:
                        </label>
                        <Select
                            id='petCategory'
                            name="petCategory"
                            value={values.petCategory}
                            defaultValue={selectedOption}
                            isClearable={true}
                            isSearchable={false}
                            onChange={selectedOption => {
                                let event = { target: { name: 'petCategory', value: selectedOption } }
                                handleChange(event)
                            }}
                            options={options}
                        />
                        {errors?.petCategory && <div className="text-red-600">{errors.petCategory}</div>}
                    </div>
                    <div>
                        <label className="text-title-optioanl text-sm font-bold">
                            Location:
                        </label>
                        <input
                            id='petLocation'
                            name="petLocation"
                            onChange={handleChange}
                            value={values.petLocation}
                            type="text"
                            // defaultValue={updateProduct?.author}
                            placeholder="location"
                            className="w-full py-2 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded"
                        />
                        {errors?.petLocation && <div className="text-red-600">{errors.petLocation}</div>}
                    </div>
                    <div>
                        <label className="text-title-optioanl text-sm font-bold">
                            Short Description:
                        </label>
                        <input
                            id='petShortDes'
                            name="petShortDes"
                            onChange={handleChange}
                            value={values.petShortDes}
                            type="text"
                            // defaultValue={updateProduct?.author}
                            placeholder="Short description"
                            className="w-full py-2 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded"
                        />
                        {errors?.petShortDes && <div className="text-red-600">{errors.petShortDes}</div>}
                    </div>
                    <div>
                        <label className="text-title-optioanl text-sm font-bold">
                            Long Description:
                        </label>
                        <input
                            id='petLongDes'
                            name="petLongDes"
                            onChange={handleChange}
                            value={values.petLongDes} type="text"
                            // defaultValue={updateProduct?.author}
                            placeholder=" Long description"
                            className="w-full py-2 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded"
                        />
                        {errors?.petLongDes && <div className="text-red-600">{errors.petLongDes}</div>}
                    </div>

                </div>
                <button
                    className="relative group mt-10 block w-40 h-fit py-3 px-5 text-center text-base font-semibold font-title text-orange-50 bg-secondary-bg rounded overflow-hidden hover:bg-primary-bg transition-all"
                    type="submit">
                    Submit
                </button>

            </form>

            {/* <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"

                    onChange={handleChange}
                    value={values.firstName}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    // name="lastName"
                    type="text"
                    defaultValue={'a'}
                    onChange={handleChange}
                    value={values.lastName}
                />
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={values.email}
                />

                <button type="submit">Submit</button>
            </form> */}
        </div>
    );
};

export default UpdatePets;