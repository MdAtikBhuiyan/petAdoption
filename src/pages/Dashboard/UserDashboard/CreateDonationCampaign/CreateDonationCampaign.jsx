import SectionTitle from "../../../../components/sectionTitle/sectionTitle";

import { useFormik } from "formik";

import * as Yup from 'yup';
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const formValidationSchema = Yup.object().shape({
    petName: Yup.string().required("Pet Name is Required"),
    maxDonation: Yup.string().required("this is Required"),
    lastDate: Yup.string().required("this is Required"),
    dCampShortDes: Yup.string().required("Short description is Required"),
    dCampLongDes: Yup.string().required("Long description is Required"),
    dCampImg: Yup.string().required("Pet image is Required"),
});


const cloudinary_api = 'https://api.cloudinary.com/v1_1/df0nnfc5b/image/upload'
const upload_preset_name = 'rp3ewx6o'

const CreateDonationCampaign = () => {


    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()

    const { values, handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            petName: '',
            maxDonation: '',
            lastDate: '',
            dCampShortDes: '',
            dCampLongDes: '',
            dCampImg: '',
        },

        validationSchema: formValidationSchema,

        onSubmit: (values, { resetForm }) => {
            console.log('main', values);
            // image hosting
            const formData = new FormData();
            formData.append('file', values?.dCampImg);
            formData.append('upload_preset', upload_preset_name);

            let addDonationInfo = { ...values, pauseStatus: false, creatorEmail: user?.email, donatedAmount: 0 }
            let photoURl = null;
            if (values.dCampImg) {

                fetch(cloudinary_api, {
                    method: 'POST',
                    body: formData,
                })
                    .then(response => response.json())
                    .then((data) => {
                        // console.log(data);

                        photoURl = data.url;

                        if (photoURl) {
                            addDonationInfo.dCampImg = photoURl;
                            console.log(addDonationInfo);
                            axiosSecure.post('/donationCamps', addDonationInfo)
                                .then(res => {
                                    console.log(res.data);
                                    // clear form fields
                                    resetForm();

                                    if (res.data?.insertedId) {
                                        Swal.fire({
                                            icon: "success",
                                            title: "Added Donation Campaign",
                                            text: `Donation Campaign successfully add to the database`,
                                            // timer: 2000
                                        });
                                    }
                                })
                        }


                    })
                    .catch(err => console.error(err));
            }

        },

    });


    return (
        <div>

            <div className="text-center">
                <SectionTitle subHeading={'Create'} heading={"Crate an donation camp"} darkMode={true} />
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
                            id='dCampImg'
                            name="dCampImg"
                            onChange={(event) => {
                                // let file = event.currentTarget.files[0]
                                let file = { target: { name: 'dCampImg', value: event?.currentTarget?.files[0] } }
                                console.log(file);
                                handleChange(file)
                            }}
                            // onChange={handleChange}

                            type="file" className="max-w-[220px] pb-2" />
                    </label>
                    {errors?.dCampImg && <div className="text-red-600">{errors.dCampImg}</div>}
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
                            placeholder="Enter max donation amount"
                            className="w-full py-2 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded"
                        />
                        {errors?.petName && <div className="text-red-600">{errors.petName}</div>}
                    </div>
                    <div>
                        <label className="text-title-optioanl text-sm font-bold">
                            Maximum Donation:
                        </label>
                        <input
                            onChange={handleChange}
                            value={values.maxDonation}
                            id='maxDonation'
                            name="maxDonation"
                            type="number"
                            // defaultValue={updateProduct?.name}
                            placeholder="Enter max donation amount"
                            className="w-full py-2 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded"
                        />
                        {errors?.maxDonation && <div className="text-red-600">{errors.maxDonation}</div>}
                    </div>
                    <div>
                        <label className="text-title-optioanl text-sm font-bold">
                            Last Date:
                        </label>
                        <input
                            onChange={handleChange}
                            value={values.lastDate}
                            id='lastDate'
                            name="lastDate"
                            type="date"
                            // defaultValue={updateProduct?.quantity}
                            placeholder="Pet Age"
                            className="w-full py-2 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded"
                        />
                        {errors?.lastDate && <div className="text-red-600">{errors.lastDate}</div>}
                    </div>
                    <div>
                        <label className="text-title-optioanl text-sm font-bold">
                            Short Description:
                        </label>
                        <input
                            id='dCampShortDes'
                            name="dCampShortDes"
                            onChange={handleChange}
                            value={values.dCampShortDes}
                            type="text"
                            // defaultValue={updateProduct?.author}
                            placeholder="Short description"
                            className="w-full py-2 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded"
                        />
                        {errors?.dCampShortDes && <div className="text-red-600">{errors.dCampShortDes}</div>}
                    </div>
                    <div>
                        <label className="text-title-optioanl text-sm font-bold">
                            Long Description:
                        </label>
                        <input
                            id='dCampLongDes'
                            name="dCampLongDes"
                            onChange={handleChange}
                            value={values.dCampLongDes}
                            type="text"
                            placeholder=" Long description"
                            className="w-full py-2 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-transparent focus:outline-0 focus:shadow-none rounded"
                        />
                        {errors?.dCampLongDes && <div className="text-red-600">{errors.dCampLongDes}</div>}
                    </div>

                </div>
                <button
                    className="relative group mt-10 block w-40 h-fit py-3 px-5 text-center text-base font-semibold font-title text-orange-50 bg-secondary-bg rounded overflow-hidden hover:bg-primary-bg transition-all"
                    type="submit">
                    Submit
                </button>

            </form>

        </div>
    );
};

export default CreateDonationCampaign;