import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="w-full flex items-center justify-center mt-[91.25px] sm:mt-[85px] md:mt-[150px] px-5 md:px-0 mb-20">
      <div className="w-full md:w-[90%] lg:max-w-[1440px] mx-auto flex flex-col items-center justify-center xl:space-y-8">
        <h1 className="w-full text-left text-2xl xl:text-4xl font-bold !mb-5">
          Terms & Conditions
        </h1>
        {[...Array(5)].map((id) => (
          <div
            key={id}
            className="w-full flex flex-col items-center justify-center space-y-2.5 mb-5"
          >
            <h1 className="w-full text-left text-lg font-semibold">
              Lorem ipsum dolor sit amet.
            </h1>
            <p className="w-full text-left text-xs font-medium text-[#484A50]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              incidunt quis in odit placeat eligendi, delectus totam? Quidem
              harum minus nulla obcaecati cumque aliquam exercitationem, totam
              distinctio. Quo eaque, dolores enim quia sequi harum ab nobis quae
              optio voluptatum eos quisquam, illo fuga in aspernatur facere
              labore error aut magnam.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;
