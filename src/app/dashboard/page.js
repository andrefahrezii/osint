// "use client";

// import { useState } from "react";
// import {
//     Box,
//     Heading,
//     Button,
//     FormControl,
//     FormLabel,
//     Input,
//     VStack,
//     Text,
//     Divider,
// } from "@chakra-ui/react";
// import { useRouter } from 'next/navigation';

// export default function Dashboard() {
//     const [query, setQuery] = useState("");
//     const [results, setResults] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const router = useRouter();

//     const handleLogout = () => {
//         router.push("/login");
//     };

//     const handleSearch = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         try {
//             // Fetch ke API lokal (localhost)
//             const response = await fetch("/api/fetch-data", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ query }),  // Mengirim query dari input
//             });

//             const data = await response.json();

//             setResults(data || []);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//     return (
//         <Box
//             display="flex"
//             flexDirection="column"
//             justifyContent="center"
//             alignItems="center"
//             height="100vh"
//             bg="gray.50"
//             backgroundImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img_bg.jpg')"
//         >
//             <Box
//                 bg="white"
//                 p={6}
//                 rounded="md"
//                 shadow="md"
//                 w={{ base: "90%", sm: "500px" }}
//                 textAlign="center"
//             >
//                 <Heading mb={6}>Dashboard</Heading>
//                 <form onSubmit={handleSearch}>
//                     <FormControl id="search" mb={4}>
//                         <FormLabel>Search for Peopel</FormLabel>
//                         <Input
//                             type="text"
//                             placeholder="Enter Peopel name"
//                             value={query}
//                             onChange={(e) => setQuery(e.target.value)}
//                         />
//                     </FormControl>
//                     <Button type="submit" colorScheme="teal" isLoading={isLoading} width="full">
//                         Search
//                     </Button>
//                 </form>

//                 <Divider my={6} />

//                 <Heading size="md" mb={4}>Search Results</Heading>
//                 <VStack spacing={4}>
//                     <Box>
//                         <Text><strong>Num Of Results:</strong> {results.NumOfResults}</Text>
//                         <Text><strong>Num Of Database:</strong> {results.NumOfDatabase}</Text>
//                         <Text><strong>Free Requests Left:</strong> {results.free_requests_left}</Text>
//                         <Text><strong>price :</strong> {results.price}</Text>
//                         {results.List && typeof results.List === "object" ? (
//                             Object.entries(results.List).map(([key, value]) => (
//                                 <Box key={key} p={4} borderWidth="1px" borderRadius="md" w="100%" bg="gray.100">
//                                     <Text><strong>{key}:</strong> {key}</Text>
//                                     <Text><strong>InfoLeak:</strong> {value.InfoLeak || "No Info Leak Available"}</Text>
//                                     <Text><strong>Data:</strong></Text>
//                                     {value.Data && value.Data.length > 0 ? (
//                                         value.Data.map((dataItem, index) => (
//                                             <Box key={index} p={2} bg="gray.200" borderRadius="md" mt={2}>
//                                                 {Object.entries(dataItem).map(([dataKey, dataValue]) => (
//                                                     <Text key={dataKey}><strong>{dataKey}:</strong> {dataValue}</Text>
//                                                 ))}
//                                             </Box>
//                                         ))
//                                     ) : (
//                                         <Text>No Data Available</Text>
//                                     )}

//                                     {/* Tampilkan NumOfResults */}
//                                     <Text><strong>Num Of Results:</strong> {value.NumOfResults || "0"}</Text>
//                                 </Box>
//                             ))
//                         ) : (
//                             <Text>No Results Available</Text>
//                         )}
//                     </Box>
//                 </VStack>





//                 <Divider my={6} />

//                 <Button colorScheme="red" onClick={handleLogout} width="full">
//                     Logout
//                 </Button>
//             </Box>
//         </Box>
//     );
// }
"use client";

import { useState } from "react";
import {
    Box,
    Heading,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Text,
    Divider,
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
    const itemsPerPage = 10; // Jumlah item per halaman
    const router = useRouter();

    const handleLogout = () => {
        router.push("/login");
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/fetch-data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });

            const data = await response.json();
            setResults(data || {});
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Konversi results.List menjadi array
    const listEntries = results.List ? Object.entries(results.List) : [];

    // Hitung jumlah total halaman
    const totalPages = Math.ceil(listEntries.length / itemsPerPage);

    // Ambil data sesuai halaman saat ini
    const paginatedEntries = listEntries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bg="gray.50"
            backgroundImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img_bg.jpg')"
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <Box
                bg="white"
                p={6}
                rounded="md"
                shadow="md"
                w={{ base: "90%", sm: "600px" }}
                textAlign="center"
                maxHeight="90vh"
                overflowY="auto"
            >
                <Heading mb={6}>Dashboard</Heading>
                <form onSubmit={handleSearch}>
                    <FormControl id="search" mb={4}>
                        <FormLabel>Search for People</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter People name"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" isLoading={isLoading} width="full">
                        Search
                    </Button>
                </form>

                <Divider my={6} />

                <Heading size="md" mb={4}>Search Results</Heading>
                <VStack spacing={4} align="stretch">
                    <Box>
                        <Text><strong>Num Of Results:</strong> {results.NumOfResults}</Text>
                        <Text><strong>Num Of Database:</strong> {results.NumOfDatabase}</Text>
                        <Text><strong>Free Requests Left:</strong> {results.free_requests_left}</Text>
                        <Text><strong>Price:</strong> {results.price}</Text>
                        {paginatedEntries.length > 0 ? (
                            paginatedEntries.map(([key, value], index) => (
                                <Box key={index} p={4} borderWidth="1px" borderRadius="md" w="100%" bg="gray.100">
                                    <Text><strong>{key}:</strong> {key}</Text>
                                    {/* Menghapus tampilan InfoLeak */}
                                    {/* <Text><strong>InfoLeak:</strong> {value.InfoLeak || "No Info Leak Available"}</Text> */}
                                    <Text><strong>Data:</strong></Text>
                                    {value.Data && value.Data.length > 0 ? (
                                        value.Data.map((dataItem, dataIndex) => (
                                            <Box key={dataIndex} p={2} bg="gray.200" borderRadius="md" mt={2}>
                                                {Object.entries(dataItem).map(([dataKey, dataValue]) => (
                                                    <Text key={dataKey}><strong>{dataKey}:</strong> {dataValue}</Text>
                                                ))}
                                            </Box>
                                        ))
                                    ) : (
                                        <Text>No Data Available</Text>
                                    )}
                                    <Text><strong>Num Of Results:</strong> {value.NumOfResults || "0"}</Text>
                                </Box>
                            ))
                        ) : (
                            <Text>No Results Available</Text>
                        )}
                    </Box>
                </VStack>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <Box mt={6} display="flex" justifyContent="space-between" alignItems="center">
                        <Button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Text>Page {currentPage} of {totalPages}</Text>
                        <Button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </Box>
                )}

                <Divider my={6} />

                <Button colorScheme="red" onClick={handleLogout} width="full">
                    Logout
                </Button>
            </Box>
        </Box>
    );
}
