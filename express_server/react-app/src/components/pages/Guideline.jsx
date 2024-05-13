import React, { useState } from 'react';
import guideline from "../assets/guideline.jpg"
import serves from "../assets/serves.jpg"
import eating1 from "../assets/eating.jpeg";
import eating from "../assets/eatingG.jpeg";



const Guideline = () => (
    <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            {/* Text Column */}
            <h3 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">
                Nutritional Portion Guide: Recommended Serve Sizes for Balanced Eating
                  <div class="w-4/5 border-t border-gray-500 my-10 mx-auto"></div>
                  <img src={eating1} alt="Descriptive Text" className="mx-auto my-8 rounded-lg shadow-lg" style={{maxWidth: '50%'}} />
                
                  <div class="w-4/5 border-t border-gray-500 my-10 mx-auto"></div>
                </h3>
                
                <h3 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">
                  Healthy Eating Pyramid: A Visual Guide to Food Groups and Choices
                  <div class="w-4/5 border-t border-gray-500 my-10 mx-auto"></div>
                  <img src={eating} alt="Descriptive Text" className="mx-auto my-8 rounded-lg shadow-lg" style={{maxWidth: '90%'}} />
                
                  <div class="w-4/5 border-t border-gray-500 my-10 mx-auto"></div>
                </h3>
        </div>
    </div>
);

export default Guideline;

