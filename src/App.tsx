import styled from "styled-components";
import {motion, useMotionValue, useTransform} from "framer-motion";
import {useEffect, useRef} from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  //background: linear-gradient(112deg, #0abbe6, #d0ecf6);
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: #09afd7;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BigBox = styled(motion.div)`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Circle = styled(motion.div)`
  background-color: whitesmoke;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;


const boxVariants = {
    hover: {
        rotateZ: 90,
    },
    click: {
        borderRadius: "100px",
    },
    drag: {
        backgroundColor: "#4cd137"
    },
};


function App() {
    // useRef 는 특정한 Element 를 지목하여 참조값으로 사용할 수 있다.
    // 이 hook 을 안쓰면 높이/너비로 계산을 해야해서 상당히 까다롭다.
    // typescript 로 어떤 DOM 요소를 참고할 것인지 <요소명> 으로 지목한다.
    // const biggerBoxRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);

    // useTransform(기준값 ,[검토하길 원하는 값들(=input)] ,[검토값으로 얻을 값(=output)])
    const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
    const gradient = useTransform(x,
        [-800, 0, 800],
        [
            'linear-gradient(112deg, #8c7ae6, #dcdde1)',
            'linear-gradient(112deg, #0abbe6, #d0ecf6)',
            'linear-gradient(112deg, #7f8fa6, #c23616)'
        ]);

    return (
        <Wrapper style={{background:gradient}}>
            {/*<BigBox ref={biggerBoxRef}>*/}
            <Box
                style={{x, rotateZ}}
                drag="x"
                dragSnapToOrigin
            />
            {/*</BigBox>*/}
        </Wrapper>
    );
}

export default App;