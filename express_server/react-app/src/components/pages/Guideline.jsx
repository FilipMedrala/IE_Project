import React, { useState } from 'react';
import guideline from "../assets/guideline.jpg"
import serves from "../assets/serves.jpg"



const Guideline = () => (
    <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            {/* Text Column */}
            <div className="w-full md:w-2/5 justify-center text-center md:text-left">
                <h1 className="my-4 text-5xl font-bold leading-tight" role="heading">
                    Guide To Healthy Eating
                </h1>
            </div>
            
            {/* Image Column */}
            <div className="w-full md:w-2.5/5 py-6 text-center">
                <img className="w-full z-30" src={guideline} alt="Healthy Guideline" />
            </div>
        </div>
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            {/* Text Column */}
            <div className="w-full md:w-2/5 justify-center text-center md:text-left">
                <h1 className="my-4 text-5xl font-bold leading-tight" role="heading">
                    Serve Sizes
                </h1>
            </div>
            
            {/* Image Column */}
            <div className="w-full md:w-2.5/5 py-6 text-center">
                <img className="w-full z-30" src={serves} alt="Serves" />
            </div>
        </div>
    </div>
);

export default Guideline;

