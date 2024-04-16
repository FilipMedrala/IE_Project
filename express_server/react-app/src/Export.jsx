import React, { Component, PropTypes } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jsPDF";
import family from "./assets/family.jpg";
// download html2canvas and jsPDF and save the files in app/ext, or somewhere else
// the built versions are directly consumable
// import {html2canvas, jsPDF} from 'app/ext';

export default class Export extends Component {
  constructor(props) {
    super(props);
  }

  printDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }

  render() {
    return (
      <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900">
        <button className="text-black" onClick={this.printDocument}>
          Print
        </button>
        <div
          className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center"
          id="divToPrint"
        >
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full">
              Does your kid know what's healthy?
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              We can help you!
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Embark on a noble quest with your children to uncover the wonders
              of healthy eating and why it matters! 🛡️🍏
            </p>
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            <img className="w-full md:w-4/5 z-50" src={family} alt="Family" />
          </div>
        </div>
      </div>
      // {/* <div className="p-36">
      //   <div className="mb5">
      //     <button className="text-black" onClick={this.printDocument}>
      //       Print
      //     </button>
      //   </div>
      //   <div
      //     id="divToPrint"
      //     className="mt4"
      //     style={{
      //       backgroundColor: "#f5f5f5",
      //       width: "210mm",
      //       minHeight: "297mm",
      //       marginLeft: "auto",
      //       marginRight: "auto",
      //     }}
      //   >
      //     <div>Note: Here the dimensions of div are same as A4</div>
      //     <div>You Can add any component here</div>
      //   </div>
      // </div> */}
    );
  }
}
