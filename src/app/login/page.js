"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    useToast,
    Text,
} from "@chakra-ui/react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulasi login
        if (email === "user@example.com" && password === "password123") {
            toast({
                title: "Login successful",
                description: "Redirecting to dashboard...",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            // Redirect ke dashboard
            setTimeout(() => {
                router.push("/dashboard");
            }, 3000);
        } else {
            toast({
                title: "Login failed",
                description: "Invalid email or password.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            backgroundImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img_bg.jpg')" // Membuat background lebih gelap
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <Box
                p={6}
                rounded="md"
                shadow="md"
                w={{ base: "90%", sm: "400px" }}
                bg="rgba(255, 255, 255, 0.6)" // Card lebih transparan
                backdropFilter="blur(10px)" // Blur latar belakang di belakang card
            >
                <Heading mb={6} textAlign="center">
                    Login
                </Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl id="email" mb={4}>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl id="password" mb={6}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" width="full">
                        Login
                    </Button>
                </form>
            </Box>

            {/* Tambahkan paragraf di bawah card */}
            <Box mt={6} w={{ base: "90%", sm: "400px" }}>
                <Text textAlign="center" color="white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
                </Text>
            </Box>
        </Box>
    );
}
