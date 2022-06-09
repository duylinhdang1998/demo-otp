import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Spacer,
  VStack,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { createSharedKey, createSmartOtp } from "./utils/smartOtp";
import axios from "axios";

export default function App() {
  const [pin, setPin] = useState("");
  const [text, setText] = useState("000000");
  const [timeStamp, setTimeStamp] = useState(0);

  const handleChangePin = (value: string) => {
    setPin(value);
  };

  const handleGenOTP = () => {
    if (!pin) {
      alert("Please enter pin");
      return;
    }
    const sharedKey = createSharedKey(pin);
    axios
      .post("http://192.168.1.21:3000/createOtpPin", {
        mobileNumber: "0386170837",
        sharedKey,
        deviceId: "iPhone13pro,5",
      })
      .then((res) => {
        const { smartOtp, now } = createSmartOtp(sharedKey);
        setText(smartOtp);
        setTimeStamp(now);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCheck = () => {
    axios
      .post("http://192.168.1.21:3000/confirmOTP", {
        clientOTP: text,
        time: timeStamp,
        deviceId: "iPhone13pro,5",
      })
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const LogoSpin = motion(Image);

  return (
    <Container maxW="container.sm" my={{ base: 0, md: 8 }}>
      <Flex alignItems="center">
        <LogoSpin
          width={"7%"}
          src="/chakra.svg"
          animate={{ rotate: 360 }}
          transition={{
            ease: "linear",
            duration: 10,
            repeat: Infinity,
          }}
        />
        <Box fontStyle="italic" fontWeight="bold">
          Chakra UI
        </Box>
        <Spacer />
      </Flex>
      <VStack spacing={4} mt={3} pt={6} height="80vh">
        <HStack>
          <PinInput onChange={handleChangePin}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Button onClick={handleGenOTP}>Gen smart otp</Button>
        <Text>{text}</Text>
        <Button onClick={handleCheck}>Check smart otp</Button>
      </VStack>
    </Container>
  );
}
