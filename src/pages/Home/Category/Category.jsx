import Container from "../../../components/Container/Container";
import SectionTitle from "../../../components/sectionTitle/sectionTitle";
import bgImg from '../../../../public/images/bg-2.jpg'
import img1 from '../../../../public/images/category-1.png'
import img2 from '../../../../public/images/category-2.png'

const categories = [
    {
        id: 1,
        petCategory: "Dogs",
        img: img1,
    },
    {
        id: 2,
        petCategory: "Cats",
        img: img2,
    },
    {
        id: 3,
        petCategory: "Dogs",
        img: img1,
    },
    {
        id: 4,
        petCategory: "Cats",
        img: img1,
    },
    {
        id: 1,
        petCategory: "Dogs",
        img: img1,
    },
    {
        id: 2,
        petCategory: "Cats",
        img: img2,
    },
    {
        id: 3,
        petCategory: "Dogs",
        img: img1,
    },
    {
        id: 4,
        petCategory: "Cats",
        img: img1,
    },
    {
        id: 1,
        petCategory: "Dogs",
        img: img1,
    },
    {
        id: 2,
        petCategory: "Cats",
        img: img2,
    },
    {
        id: 3,
        petCategory: "Dogs",
        img: img1,
    },
    {
        id: 4,
        petCategory: "Cats",
        img: img1,
    },
]

const Category = () => {
    return (
        <div style={{ backgroundImage: `url(${bgImg})` }} className="bg-no-repeat bg-cover bg-center py-20 w-full text-center">
            <SectionTitle subHeading="categories" heading="Meet the pet" darkMode={false} />
            <Container>
                <div className="flex justify-center flex-wrap items-center gap-4 text-center mt-14">
                    {
                        categories?.map(category => (

                            <div key={category.id}
                                className="w-[140px] md:min-w-[200px] shadow-2xl py-10 px-2 rounded bg-white space-y-2 cursor-pointer transition-all hover:scale-110 hover:bg-primary-bg group">
                                <img src={category.img} className="h-20 mx-auto" alt="" />
                                <h2 className="text-title-primary font-extrabold text-2xl md:text-3xl group-hover:text-white">{category.petCategory}</h2>
                            </div>

                        ))
                    }
                </div>
            </Container>
        </div>
    );
};

export default Category;