import React, { useState, useEffect, useRef } from "react";
import Quiz from "./Quiz"
import axios from 'axios';
import jsPDF from "jsPDF";
import './journey.css'
import './App.css'

import CatImage from '../assets/cat.svg'
import { Button, message, Popconfirm } from "antd";

import Video from "./Video";

import VideoOne from '../assets/video/111111111.mp4'
import VideoTwo from '../assets/video/2222222222222.mp4'
import goodImage from "../assets/certificate_good.jpeg";

export default function FallingFood() {

  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
  }, [quizData]);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get('/quiz', {
        params: {
          stage1: [1, 4],
          stage2: [2, 4],
          stage3: [3, 4],
        }
      });
      const data = response.data;
      setQuizData(data);
      console.log("Received data in journey: ", data);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const housePointArr = [
    [810, 126],
    [436, 354],
    [836, 510],
    [660, 826],
  ]

  const quizRefs = useRef([]);
  const videoRefs = useRef([])
  const [position, setPosition] = useState({ x: 690, y: 56 });
  const [currIndex, setCurrIndex] = useState(-1);
  const [currModule, setCurrModule] = useState(0);

  const [flag, setFlag] = useState(true)
  const [isFinally, setIsFinally] = useState(false)

  const movingElementStyle = {
    transition: 'top 1s, left 1s',
    top: position.y + 'px',
    left: position.x + 'px',
  };

  const configData = [
    [
      {
        type: "video",
        content: 'Watch the Educationl Video',
        url: VideoOne
      },
      {
        type: "quiz",
        content: 'Attempt Quiz',
      },
      {
        type: "canvas",
        content: 'Go to Canvas',
      },
      {
        type: "snake",
        content: 'Play Game',
        url: "/Snake",
      }
    ],
    [
      {
        type: "video",
        content: 'Watch the Educationl Video',
        url: VideoTwo,
      },
      {
        type: "quiz",
        content: 'Attempt Quiz',
      },
      {
        type: "canvas",
        content: 'Go to Canvas',
      },
      {
        type: "snake",
        content: 'Play Game',
        url: "/FallingFood",
      }
    ],
    [
      {
        type: "video",
        content: 'Watch the Educationl Video',
        url: VideoOne
      },
      {
        type: "quiz",
        content: 'Attempt Quiz',
      },
      {
        type: "canvas",
        content: 'Go to Canvas',
      },
      {
        type: "snake",
        content: 'Play Game',
        url: "/Snake",
      }
    ],
    [
      {
        type: "video",
        content: 'Watch the Educationl Video',
        url: VideoTwo,
      },
      {
        type: "quiz",
        content: 'Attempt Quiz',
      },
      {
        type: "canvas",
        content: 'Go to Canvas',
      },
      {
        type: "snake",
        content: 'Play Game',
        url: "/FallingFood",
      }
    ],
    [
      {
        type: "video",
        content: 'Watch the Educationl Video',
        url: VideoOne,
      },
      {
        type: "quiz",
        content: 'Attempt Quiz',
      },
      {
        type: "canvas",
        content: 'Go to Canvas',
      },
      {
        type: "snake",
        content: 'Play Game',
        url: "/FallingFood",
      }
    ],
  ]

  const handleMouseDown = (module, index) => {
    if (!flag) {
      message.error("You need to complete the previous level")
      return;
    }
    setIsFinally(false)
    if (module - currModule === 1) {
      if (currIndex == 3 && index == 0) {
        setCurrIndex(index);
        const currentPoint = housePointArr[index];
        setPosition({ x: currentPoint[0], y: currentPoint[1] + 877 * module });
        setCurrModule(module);
        setFlag(false)
        return;
      } else {
        message.error("You need to complete the previous level");
        return;
      }
    } else if (module === currModule) {
      if (index - currIndex <= 1) {
        setCurrIndex(index);
        const currentPoint = housePointArr[index];
        setPosition({ x: currentPoint[0], y: currentPoint[1] + 877 * module });
        setFlag(false)

        return;
      } else {
        message.error("You need to complete the previous level");
      }
    } else if (module < currModule) {
      setCurrIndex(index);
      const currentPoint = housePointArr[index];
      setPosition({ x: currentPoint[0], y: currentPoint[1] + 877 * module });
      setFlag(false)

      return;
    } else {
      message.error("You need to complete the previous level");
    }
  };

  const handleAction = (mIndex, index, type, url) => {
    type === 'quiz' && !quizRefs.current[mIndex]?.isModalOpen && quizRefs.current[mIndex]?.showModal()
    type === 'snake' && window.open(url)
    type === 'video' && !videoRefs.current[mIndex]?.isModalOpen && videoRefs.current[mIndex]?.showModal()
    setFlag(true)
    if (mIndex === 4 && index === 3) {
      setPosition({ x: 698, y: 5030 });
      setIsFinally(true)
    }
  }

  const popconfirmOpen = (mIndex, index) => {
    return !flag && currModule === mIndex && currIndex === index
  }

  const createItem = (mIndex, arr) => {
    let childs = arr.map((item, index) => {
      return <Popconfirm
        icon={null}
        key={index}
        open={() => popconfirmOpen(mIndex, index)}
        showCancel={false}
        title={item.content}
        description={item.content}
        onConfirm={() => handleAction(mIndex, index, item.type, item.url)}
        okText="Get in"
      >
        <div className={`house-item item${index + 1}`} onClick={() => handleMouseDown(mIndex, index)}>
        </div>
      </Popconfirm>
    })
    return childs
  }

  const createModule = (arr) => {
    let modules = arr.map((item, index) => {
      return <div key={index} className="page-wrapper">
        {createItem(index, item)}
        {quizData?.length > 0 && quizData[index]?.length && <Quiz ref={(ref) => quizRefs.current[index] = ref} quizData={quizData[index]} type={`stage${index + 1}`} />}
        {item[0]?.url && <Video ref={(ref) => videoRefs.current[index] = ref} videoSrc={item[0].url} />}
      </div>
    })
    return modules;
  }

  const printDocument = () => {
    const pdf = new jsPDF({
      orientation: "landscape",  // 可以根据图片的宽高比选择适当的方向
    });

    // 获取图片的尺寸，根据需要调整下面的addImage参数
    var img = new Image();
    img.onload = () => {
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(width / imgWidth, height / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;

      pdf.addImage(goodImage, 'JPEG', 0, 0, newWidth, newHeight);
      pdf.save("download.pdf");
    };
    img.src = goodImage;
  }


  return (
    <div className="Journey">
      <img className="cat-box" src={CatImage} style={movingElementStyle} />
      {
        createModule(configData)
      }
      {
        isFinally && (
          <div className="finally-wrapper">
            <div className="title">CONGRATULATIONS</div>
            <div className="btn">
              <Button type="primary" onClick={printDocument}>Get your cartifate</Button>
            </div>
          </div>
        )
      }
    </div>
  );
}
