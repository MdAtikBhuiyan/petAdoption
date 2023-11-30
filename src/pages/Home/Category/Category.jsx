import Container from "../../../components/Container/Container";
import SectionTitle from "../../../components/sectionTitle/sectionTitle";
import bgImg from '../../../../public/images/bg-2.jpg'
import img1 from '../../../../public/images/category-1.png'
import img2 from '../../../../public/images/category-2.png'
import img3 from '../../../../public/images/category-3.png'
import img4 from '../../../../public/images/category-4.png'
import img5 from '../../../../public/images/category-5.png'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const categories = [
    {
        id: 1,
        petCategory: "dog",
        img: img1,
    },
    {
        id: 2,
        petCategory: "cat",
        img: img2,
    },
    {
        id: 3,
        petCategory: "rabbit",
        img: img3,
    },
    {
        id: 4,
        petCategory: "bird",
        img: img4,
    },
    {
        id: 5,
        petCategory: "fish",
        img: img5,
    },

]

// const options = [
//     { value: 'dog', label: 'Dog' },
//     { value: 'cat', label: 'Cat' },
//     { value: 'rabbit', label: 'Rabbit' },
//     { value: 'bird', label: 'Bird' },
//     { value: 'fish', label: 'Fish' },
// ];

const Category = () => {

    const navigate = useNavigate()

    const axiosPublic = useAxiosPublic()
    const handleCategoryClick = (data) => {

        axiosPublic.get(`/petLists?petKey=${data}`)
            .then(res => {
                console.log(res.data);
                if(res.data){
                    navigate('/petLists', { state: { petsData: res.data, category: data } })
                }

            })


    }

    return (
        <div style={{ backgroundImage: `url(${bgImg})` }} className="bg-no-repeat bg-cover bg-center py-20 w-full text-center">
            <SectionTitle subHeading="categories" heading="Meet the pet" darkMode={false} />
            <Container>
                <div className="flex justify-center flex-wrap items-center gap-4 text-center mt-14">
                    {
                        categories?.map(category => (

                            <div key={category.id}
                                onClick={() => handleCategoryClick(category?.petCategory)}
                                className="w-[140px] md:min-w-[200px] shadow-2xl py-10 px-2 rounded bg-white space-y-2 cursor-pointer transition-all hover:scale-110 hover:bg-primary-bg group">
                                <img src={category.img} className="h-20 mx-auto" alt="" />
                                <h2 className="mt-8 text-title-primary font-extrabold text-2xl md:text-3xl group-hover:text-white">{category.petCategory}</h2>
                            </div>

                        ))
                    }
                </div>
            </Container>
        </div>
    );
};

export default Category;