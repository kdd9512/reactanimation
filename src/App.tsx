import styled from "styled-components";
import {motion, useMotionValue, useTransform, useViewportScroll, AnimatePresence} from "framer-motion";
import {useState} from "react";


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
  height: 20vw;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Ball = styled(motion.div)`
  background-color: #00a5ff;
  height: 70px;
  width: 70px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 3fr);
  grid-template-columns: repeat(2, 3fr);
  width: 60vw;
  gap: 15px;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
`;


const overlayVariants = {
    initial: {backgroundColor: "rgba(0, 0, 0, 0)"},
    animate: {backgroundColor: "rgba(0, 0, 0, 0.6)"},
    exit: {backgroundColor: "rgba(0, 0, 0, 0)"},
}

function App() {
    const [clicked, setClicked] = useState(false);
    const [switched, setSwitched] = useState(false);
    const [id, setId] = useState<null | string>(null);
    const [ballId, setBallId] = useState<null | string>(null);

    const toggleClicked = () => (
        setClicked(prev => !prev)
    );

    const toggleSwitch = () => (
        setSwitched(prev => !prev)
    );

    return (
        <Wrapper onClick={toggleClicked}>
            <Grid>
                {["1", "2"].map((num) => (
                    <Box
                        whileHover={{scale: 1.03, transition: {transform: .1}}}
                        onClick={() => setId(num)}
                        key={num} layoutId={num}
                    >
                        <AnimatePresence>
                            {!switched ?
                                num === "2" ?
                                    <Ball layoutId="ball"/> : null
                                : null
                            }
                        </AnimatePresence>
                    </Box>
                    )
                )}
                {["3","4"].map((num) => (
                    <Box
                        whileHover={{scale: 1.03, transition: {transform: .1}}}
                        onClick={() => setId(num)}
                        key={num} layoutId={num}
                    >
                        <AnimatePresence>
                            {switched ?
                                num === "3" ?
                                    <Ball layoutId="ball"/> : null
                                : null
                            }
                        </AnimatePresence>
                    </Box>
                ))}
            </Grid>
            <AnimatePresence>
                {id ?
                    <Overlay
                        onClick={() => setId(null)}
                        variants={overlayVariants}
                        initial={"initial"}
                        animate={"animate"}
                        exit={"exit"}>
                        <Box style={{width: 600, height: 300,}} layoutId={id}/>
                    </Overlay>
                    : null}
            </AnimatePresence>
            <button onClick={toggleSwitch}>switch</button>
        </Wrapper>
    );
}

export default App;