import React, { useState, useEffect, useRef } from "react";
import Quiz from "./Quiz"
import axios from 'axios';
import jsPDF from "jspdf";
import './journey.css'
import './App.css'
import CatImage from '../assets/cat.svg'
import { Button, message, Popconfirm, Tooltip, Modal } from "antd";
import Video from "./Video";
// import goodImage from "../assets/certificate_good.jpeg";

import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/pic2.jpg'
import pic3 from '../assets/pic3.jpg'
import pic4 from '../assets/pic4.jpg'

import BottomImage from '../assets/bottom.png'

import fruitImg from '../assets/fruit.png'
import vegImg from '../assets/veg.png'
import proteinImg from '../assets/protein.png'
import grainsImg from '../assets/grains.png'
import dairyImg from '../assets/dairy.png'

import guidelineImg from '../assets/guideline.jpeg'

export default function FallingFood() {

  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
  }, [quizData]);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get('https://getkidhealthy-backend.onrender.com/quiz', {
        params: {
          stage1: 'Fruit Nutrition',
          stage2: 'Vegetable Nutrition',
          stage3: 'Grains Nutrition',
          stage4: 'Protein Nutrition',
          stage5: 'Dairy Nutrition',
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

  const [maxIndex, setMaxIndex] = useState(-1)

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
        url: 'https://nutrition-journey.s3.ap-southeast-2.amazonaws.com/Fruits_low.mp4'
      },
      {
        type: "quiz",
        content: 'Attempt Quiz',
      },
      {
        type: "snake",
        content: 'Go to Canvas',
         url: '/#/Sketch'
      },
      {
        type: "snake",
        content: 'Play Game',
        url: "/#/Snake",
      }
    ],
    [
      {
        type: "video",
        content: 'Watch the Educationl Video',
        url: 'https://nutrition-journey.s3.ap-southeast-2.amazonaws.com/Vegetable.mp4',
      },
      {
        type: "quiz",
        content: 'Attempt Quiz',
      },
      {
        type: "snake",
        content: 'Go to Canvas',
         url: '/#/Sketch'
      },
      {
        type: "snake",
        content: 'Play Game',
        url: "/#/FallingFood",
      }
    ],
    [
      {
        type: "video",
        content: 'Watch the Educationl Video',
        url: 'https://nutrition-journey.s3.ap-southeast-2.amazonaws.com/Grains.mp4'
      },
      {
        type: "quiz",
        content: 'Attempt Quiz',
      },
      {
        type: "snake",
        content: 'Go to Canvas',
         url: '/#/Sketch'
      },
      {
        type: "snake",
        content: 'Play Game',
        url: "/#/Snake",
      }
    ],
    [
      {
        type: "video",
        content: 'Watch the Educationl Video',
        url: 'https://nutrition-journey.s3.ap-southeast-2.amazonaws.com/Protine.mp4',
      },
      {
        type: "quiz",
        content: 'Attempt Quiz',
      },
      {
        type: "snake",
        content: 'Go to Canvas',
         url: '/#/Sketch'
      },
      {
        type: "snake",
        content: 'Play Game',
        url: "/#/FallingFood",
      }
    ],
    [
      {
        type: "video",
        content: 'Watch the Educationl Video',
        url: 'https://nutrition-journey.s3.ap-southeast-2.amazonaws.com/Dairy.mp4',
      },
      {
        type: "quiz",
        content: 'Attempt Quiz',
      },
      {
        type: "snake",
        content: 'Go to Canvas',
         url: '/#/Sketch'
      },
      {
        type: "snake",
        content: 'Play Game',
        url: "/#/FallingFood",
      }
    ],
    [],
  ]

  const moduleList = [
    {
      prop: 'Fruit',
      img: fruitImg,
    },
    {
      prop: 'Vegetable',
      img: vegImg,
    },
    {
      prop: 'Grains',
      img: grainsImg,
    },
    {
      prop: 'Protein',
      img: proteinImg,
    },
    {
      prop: 'Dairy',
      img: dairyImg,
    },
    {
      prop: 'Finally',
    }
  ]

  const labelConfig = [
    {
      title: 'FRUITS!',
      content: 'Fruit NutritionFruit NutritionFruit NutritionFruit NutritionFruit Nutrition',
      titleStyle: { color: "#fff" },
      contentStyle: { color: "#fff" },
    },
    {
      title: 'VEGETABLES!',
      content: 'Vegetable Nutrition',
      titleStyle: { color: "#000" },
      contentStyle: { color: "#000" },
    },
    {
      title: 'GRAINS!',
      content: 'Grains Nutrition',
      titleStyle: { color: "#000" },
      contentStyle: { color: "#000" },
    },
    {
      title: 'PROTEIN!',
      content: 'Protein Nutrition',
      titleStyle: { color: "#000" },
      contentStyle: { color: "#000" },
    },
    {
      title: 'DAIRY!',
      content: 'Dairy Nutrition',
      titleStyle: { color: "#000" },
      contentStyle: { color: "#000" },
    },
  ]

  const handleMouseDown = (module, index) => {
    setFlag(false)
    let tempIndex = Number(`${module}${index}`);
    if (tempIndex <= maxIndex) {
      setCurrIndex(index);
      setCurrModule(module);
      const currentPoint = housePointArr[index];
      setPosition({ x: currentPoint[0], y: currentPoint[1] + 900 * module });
      return;
    }
    if (!flag) {
      message.error("You need to complete the previous level")
      return;
    }
    setIsFinally(false)
    if (module - currModule === 1) {
      if (currIndex == 3 && index == 0) {
        setCurrIndex(index);
        const currentPoint = housePointArr[index];
        setPosition({ x: currentPoint[0], y: currentPoint[1] + 900 * module });
        setCurrModule(module);
        setFlag(false)
        return;
      } else {
        message.error("You need to complete the previous level");
        return;
      }
    } else if (module === currModule) {
      if (index === currIndex) {
        setFlag(true)
        return
      }
      if (index - currIndex <= 1) {
        setCurrIndex(index);
        const currentPoint = housePointArr[index];
        setPosition({ x: currentPoint[0], y: currentPoint[1] + 900 * module });
        setFlag(false)
        return;
      } else if (tempIndex < maxIndex) {
        setCurrIndex(index);
        const currentPoint = housePointArr[index];
        setPosition({ x: currentPoint[0], y: currentPoint[1] + 900 * module });
      } else {
        message.error("You need to complete the previous level")
        return;
      }
    } else if (module <= currModule) {
      setCurrIndex(index);
      const currentPoint = housePointArr[index];
      setPosition({ x: currentPoint[0], y: currentPoint[1] + 900 * module });
      return;
    } else {
      message.error("You need to complete the previous level");
    }
  };

  const handleAction = (mIndex, index, type, url) => {
    setFlag(true)
    if (index === 3) {
      setMaxIndex(Math.max(maxIndex, Number(`${mIndex + 1}0`)));
    } else {
      setMaxIndex(Math.max(maxIndex, Number(`${mIndex}${index + 1}`)));
    }
    type === 'quiz' && !quizRefs.current[mIndex]?.isModalOpen && quizRefs.current[mIndex]?.showModal()
    type === 'snake' && window.open(url)
    type === 'video' && !videoRefs.current[mIndex]?.isModalOpen && videoRefs.current[mIndex]?.showModal()
    if (mIndex === 4 && index === 3) {
      setPosition({ x: 698, y: 5120 });
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

  const createLabel = (mIndex) => {
    let label = labelConfig[mIndex]
    return <div className="label-box">
      <div className="label-title" style={label.titleStyle}>{label.title}</div>
      <div className="label-content" style={label.contentStyle}>{label.content}</div>
    </div>
  }

  const createModule = (arr) => {
    let modules = arr.map((item, index) => {
      if (item.length === 0) return <div key={index} className="page-wrapper empty " id={`section${index + 1}`} ></div>
      return <div key={index} className="page-wrapper" id={`section${index + 1}`} >
        {createLabel(index)}
        {createItem(index, item)}
        {quizData?.length > 0 && quizData[index]?.length && <Quiz ref={(ref) => quizRefs.current[index] = ref} quizData={quizData[index]} type={`stage${index + 1}`} />}
        {item[0]?.url && <Video ref={(ref) => videoRefs.current[index] = ref} videoSrc={item[0].url} />}
      </div>
    })
    return modules;
  }

  const printDocument = () => {

    let score = 0
    let answers = JSON.parse(sessionStorage.getItem("answers"))
    Object.keys(answers).forEach((key) => {
      score += Object.values(answers[key]).filter(item => item).length
    })

    const goodImage = score === 25 ? pic1 : score >= 20 && score <= 24 ? pic2 : score >= 15 && score <= 19 ? pic3 : pic4

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

  const [activeAnchor, setActiveAnchor] = useState('section1');

  useEffect(() => {
    const handleScroll = () => {
      let timeoutId = null;
      timeoutId && clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('[id^="section"]')
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveAnchor(section.id);
            // window.history.replaceState(null, null, `#${section.id}`);
          }
        });
      }, 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const boxElement = document.getElementById('Journey');
    if (boxElement) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // window.history.replaceState(null, null, `#section1`);
    }
  }, [])

  const scrollToAnchor = (anchorId) => {
    if (!anchorId) return
    setActiveAnchor(anchorId)
    const element = document.getElementById(anchorId);
    if (element) {
      if (activeAnchor === anchorId) return
      const offsetTop = element.offsetTop;
      if (anchorId === 'section1') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  };

  const nextModel = () => {
    scrollToAnchor(`section${Number(activeAnchor.slice(-1)) + 1}`)
  }

  const [open, setOpen] = useState(true);

  const handleOk = () => {
    setOpen(false);
  };

  return (
    <div className="Journey" id="Journey">
      <img className="cat-box" src={CatImage} style={movingElementStyle} />
      {
        createModule(configData)
      }
      {
        isFinally && (
          <div className="finally-wrapper">
            <div className="title">CONGRATULATIONS</div>
            <div className="btn">
              <Button type="primary" onClick={printDocument}>Get your certificate</Button>
            </div>
          </div>
        )
      }
      <nav className="nav-box">
        <ul>
          {
            moduleList.map((item, index) => {
              if (index === moduleList.length - 1) return null;
              return (
                <Tooltip key={index} placement="left" title={item.prop} color='geekblue' arrow={false}>
                  <li key={index} className={activeAnchor === `section${index + 1}` ? 'active' : ''} onClick={() => scrollToAnchor(`section${index + 1}`)}>
                    <img className="left-img" src={item.img} />
                  </li>
                </Tooltip>
              )
            })
          }
        </ul>
      </nav>
      {
        (activeAnchor !== 'section6') && <img className="bottom-img" onClick={() => nextModel()} src={BottomImage} />
      }

      <Modal
        width={800}
        open={open}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Button
            block
            onClick={handleOk}
            className="start-btn"
          >
            START NOW!
          </Button>
        ]}
      >
        <img src={guidelineImg} alt="guideline" />
      </Modal>
    </div>
  );
}
