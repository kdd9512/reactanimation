import styled from "styled-components";
import {motion, useMotionValue, useTransform, useViewportScroll, AnimatePresence} from "framer-motion";
import {useEffect, useRef, useState} from "react";

// Styled Components...

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(112deg, #0abbe6, #d0ecf6);
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 600px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: #09afd7;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const NewBox = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const AnotherBox = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: #09afd7;
  border-radius: 35px;
  display: flex;
  position: absolute;
  top: 250px;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Box2 = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Box3 = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 15px;

  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
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

const NewCircle = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Svg = styled.svg`
  width: 300px;
  height: 300px;

  path {
    stroke: white;
    stroke-width: 3;
  }
`;


// Variants...

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

const svgVariants = {
    initial: {
        pathLength: 0,
        fill: "rgba(255,255,255,0)",
    },
    animate: {
        pathLength: 1,
        fill: "rgba(255,255,255,1)",
    },
}

const newBoxVariants = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotateZ: 360,
    },
    leaving: {
        opacity: 0,
        scale: 0,
        y: 20,
    },

}

// AnimatePresence 2. custom variants
const AnotherBoxVariants = {
    entry: (back: boolean) => ({
        x: back ? -500 : 500,
        opacity: 0,
        scale: 0,
    }),
    centre: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: (back: boolean) => ({
            x: back ? 500 : -500,
            opacity: 0,
            scale: 0,
            transition: {
                duration: 0.5,
            },
        }
    ),
}


function App() {
    // useRef 는 특정한 Element 를 지목하여 참조값으로 사용할 수 있다.
    // 이 hook 을 안쓰면 범위를 요소들의 높이/너비로 계산을 해야해서 상당히 까다롭다.
    // typescript 로 어떤 DOM 요소를 참고할 것인지 <요소명> 으로 지목한다.
    // const biggerBoxRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const {scrollYProgress} = useViewportScroll();

    // useTransform(기준값 ,[검토하길 원하는 값들(=input)] ,[검토값으로 얻을 값(=output)])
    const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
    const gradient = useTransform(x,
        [-800, 0, 800],
        [
            'linear-gradient(112deg, #8c7ae6, #dcdde1)',
            'linear-gradient(112deg, #0abbe6, #d0ecf6)',
            'linear-gradient(112deg, #7f8fa6, #c23616)'
        ]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);


    // AnimatePresence 1. basic
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => setShowing((prev) => !prev);


    // AnimatePresence 2. custom variants
    const [visible, setVisible] = useState(1);
    const [back, setBack] = useState(false);
    const nextPlz = () => {
        setBack(false);
        setVisible(prev => prev === 10 ? 1 : prev + 1);
    };
    const prevPlz = () => {
        setBack(true);
        setVisible(prev => prev === 1 ? 10 : prev - 1);
    };

    // layout / layoutId
    const [clicked, setClicked] = useState(false);
    const toggleClicked = () => (
        setClicked(prev => !prev)
    );

    const [id, setId] = useState<null | string>(null);
    return (

        // Variants / Elastic / useTransform
        // <Wrapper style={{background: gradient}}>
        //      {/*BigBox 의 DOM 요소를 참조하게 하기 위해 ref 를 설정한다. */}
        //     <BigBox ref={biggerBoxRef}>
        //     <Box
        //         style={{x, rotateZ, scale: scale}}
        //         drag="x"
        //         dragSnapToOrigin />
        //     </BigBox>
        // </Wrapper>

        // SVG Animation
        // <Wrapper>
        //     <Svg
        //         focusable="false"
        //         xmlns="http://www.w3.org/2000/svg"
        //         viewBox="0 0 640 512">
        //         <motion.path
        //             variants={svgVariants}
        //             initial={"initial"}
        //             animate={"animate"}
        //             transition={{
        //                 // 모든 props 에 적용될 default.
        //                 default: {duration:3},
        //                 // 특정 props 에 접근하여 해당 부분만 다른 transition 을 부여.
        //                 // 예제의 경우 default 가 실행되고 1.5 초 간 대기한 후 fill 을 2초 간 실행하라는 의미.
        //                 fill:{duration:2, delay:1.5},
        //             }}
        //             d="M180.41 203.01c-.72 22.65 10.6 32.68 10.88 39.05a8.164 8.164 0 0 1-4.1 6.27l-12.8 8.96a10.66 10.66 0 0 1-5.63 1.92c-.43-.02-8.19 1.83-20.48-25.61a78.608 78.608 0 0 1-62.61 29.45c-16.28.89-60.4-9.24-58.13-56.21-1.59-38.28 34.06-62.06 70.93-60.05 7.1.02 21.6.37 46.99 6.27v-15.62c2.69-26.46-14.7-46.99-44.81-43.91-2.4.01-19.4-.5-45.84 10.11-7.36 3.38-8.3 2.82-10.75 2.82-7.41 0-4.36-21.48-2.94-24.2 5.21-6.4 35.86-18.35 65.94-18.18a76.857 76.857 0 0 1 55.69 17.28 70.285 70.285 0 0 1 17.67 52.36l-.01 69.29zM93.99 235.4c32.43-.47 46.16-19.97 49.29-30.47 2.46-10.05 2.05-16.41 2.05-27.4-9.67-2.32-23.59-4.85-39.56-4.87-15.15-1.14-42.82 5.63-41.74 32.26-1.24 16.79 11.12 31.4 29.96 30.48zm170.92 23.05c-7.86.72-11.52-4.86-12.68-10.37l-49.8-164.65c-.97-2.78-1.61-5.65-1.92-8.58a4.61 4.61 0 0 1 3.86-5.25c.24-.04-2.13 0 22.25 0 8.78-.88 11.64 6.03 12.55 10.37l35.72 140.83 33.16-140.83c.53-3.22 2.94-11.07 12.8-10.24h17.16c2.17-.18 11.11-.5 12.68 10.37l33.42 142.63L420.98 80.1c.48-2.18 2.72-11.37 12.68-10.37h19.72c.85-.13 6.15-.81 5.25 8.58-.43 1.85 3.41-10.66-52.75 169.9-1.15 5.51-4.82 11.09-12.68 10.37h-18.69c-10.94 1.15-12.51-9.66-12.68-10.75L328.67 110.7l-32.78 136.99c-.16 1.09-1.73 11.9-12.68 10.75h-18.3zm273.48 5.63c-5.88.01-33.92-.3-57.36-12.29a12.802 12.802 0 0 1-7.81-11.91v-10.75c0-8.45 6.2-6.9 8.83-5.89 10.04 4.06 16.48 7.14 28.81 9.6 36.65 7.53 52.77-2.3 56.72-4.48 13.15-7.81 14.19-25.68 5.25-34.95-10.48-8.79-15.48-9.12-53.13-21-4.64-1.29-43.7-13.61-43.79-52.36-.61-28.24 25.05-56.18 69.52-55.95 12.67-.01 46.43 4.13 55.57 15.62 1.35 2.09 2.02 4.55 1.92 7.04v10.11c0 4.44-1.62 6.66-4.87 6.66-7.71-.86-21.39-11.17-49.16-10.75-6.89-.36-39.89.91-38.41 24.97-.43 18.96 26.61 26.07 29.7 26.89 36.46 10.97 48.65 12.79 63.12 29.58 17.14 22.25 7.9 48.3 4.35 55.44-19.08 37.49-68.42 34.44-69.26 34.42zm40.2 104.86c-70.03 51.72-171.69 79.25-258.49 79.25A469.127 469.127 0 0 1 2.83 327.46c-6.53-5.89-.77-13.96 7.17-9.47a637.37 637.37 0 0 0 316.88 84.12 630.22 630.22 0 0 0 241.59-49.55c11.78-5 21.77 7.8 10.12 16.38zm29.19-33.29c-8.96-11.52-59.28-5.38-81.81-2.69-6.79.77-7.94-5.12-1.79-9.47 40.07-28.17 105.88-20.1 113.44-10.63 7.55 9.47-2.05 75.41-39.56 106.91-5.76 4.87-11.27 2.3-8.71-4.1 8.44-21.25 27.39-68.49 18.43-80.02z"
        //         />
        //     </Svg>
        // </Wrapper>

        // AnimatePresence 1. basic
        // <Wrapper>
        //     <button onClick={toggleShowing}>Click</button>
        //     <AnimatePresence>
        //         {showing ? (
        //             <NewBox variants={newBoxVariants}
        //                     initial="initial"
        //                     animate="visible"
        //                     exit="leaving"/>
        //         ) : null}
        //     </AnimatePresence>
        // </Wrapper>

        // AnimatePresence 2. custom variants
        // exitBeforeEnter : 이전 exit 가 실행을 "마쳐야" 다음 initial 을 실행하게 강제.
        // <Wrapper>
        //     <AnimatePresence exitBeforeEnter custom={back}>
        //         <AnotherBox
        //             custom={back}
        //             variants={AnotherBoxVariants}
        //             initial="entry"
        //             animate="centre"
        //             exit="exit"
        //             key={visible}
        //         >
        //             {`i'm ${visible}`}
        //         </AnotherBox>
        //     </AnimatePresence>
        //     <button onClick={nextPlz}>nextPlz</button>
        //     <button onClick={prevPlz}>prevPlz</button>
        // </Wrapper>

        // layout / layoutId
        // <Wrapper onClick={toggleClicked}>
        //     <Box2 >
        //         {!clicked ? <NewCircle layoutId="circle"/> : null}
        //     </Box2>
        //     <Box2 >
        //         {clicked ? <NewCircle layoutId="circle"/> : null}
        //     </Box2>
        // </Wrapper>

        <Wrapper onClick={toggleClicked}>
            <Grid>
                {["1", "2", "3", "4"].map((num) => (
                    <Box3 onClick={() => setId(num)}  key={num} layoutId={num}/>)
                )}
            </Grid>
            <AnimatePresence>
                {id ?
                    <Overlay
                        onClick={() => setId(null)}
                        initial={{backgroundColor: "rgba(0, 0, 0, 0)"}}
                        animate={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}
                        exit={{backgroundColor: "rgba(0, 0, 0, 0)"}}>
                        <Box3 style={{width: 600, height: 300,}} layoutId={id}/>
                    </Overlay>
                    : null}
            </AnimatePresence>
        </Wrapper>
    );
}

export default App;