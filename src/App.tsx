import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Spacer,
  useColorMode,
  VStack,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { createSharedKey, createSmartOtp } from "./utils/smartOtp";
import axios from "axios";

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [pin, setPin] = useState("");
  const [shareKey, setShareKey] = useState("");

  const handleChangePin = (value: string) => {
    setPin(value);
  };

  const handleGenOTP = () => {
    const sharedKey = createSharedKey(pin);
    console.log({ sharedKey });
    // setShareKey(sharedKey);
    // axios
    //   .post("http://192.168.1.21/createOtpPin", {
    //     mobileNumber: "0386170836",
    //     sharedKey,
    //     deviceId: "iPhone13pro,2",
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const handleCheck = () => {
    // const { newOtp, now } = createSmartOtp(shareKey);
    // axios
    //   .post("http://192.168.1.21/confirmOTP", {
    //     clientOTP: newOtp,
    //     time: now,
    //     deviceId: "iPhone13pro,2",
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
        <Button onClick={handleCheck}>Check smart otp</Button>
      </VStack>
    </Container>
  );
}
