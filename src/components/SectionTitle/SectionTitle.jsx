
const SectionTitle = ({ heading, subHeading, description, darkMode }) => {
    return (
        <div>

            <h4 className="text-title-secondary font-title font-extrabold text-lg md:text-xl capitalize mb-2">{subHeading}</h4>
            <h2 className={` ${darkMode ? 'text-title-optioanl' : 'text-title-primary'} font-extrabold text-4xl capitalize font-title`}>{heading}</h2>
            {
                description &&
                <p className="text-secondary-text mt-5 max-w-[640px] mx-auto">{description}</p>
            }
        </div>
    );
};

export default SectionTitle;