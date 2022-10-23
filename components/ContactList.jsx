import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    } from "@chakra-ui/react";
    import React, { useEffect } from "react";
    import useAuth from "../hooks/useAuth";
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    import { db } from "../firebase";
    import { FaTrash, FaEdit } from "react-icons/fa";
    import { deleteContact, editContact} from "../api/contact";
    const contactList = () => {
    const [contact, setContact] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
    const refreshData = () => {
    if (!user) {
    setContact([]);
    return;
    }
    const q = query(collection(db, "contact"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
    let ar = [];
    querySnapchot.docs.forEach((doc) => {
    ar.push({ id: doc.id, ...doc.data() });
    });
    setContact(ar);
    });
    };
    useEffect(() => {
    refreshData();
    }, [user]);
    const handleContactDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this contact?")) {
    deleteContact(id);
    toast({ title: "contact deleted successfully", status: "success" });
    }
    };
    const handleContactEdit = async (id) => {
        editContact(id);
    };
    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {contact &&
    contact.map((contact) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={{ base: '20px', md: '25px', lg: '30px' }}>
    {contact.name}{" "}
    <Badge
    color="red.500"
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => handleContactDelete(contact.id)}
    >
    <FaTrash />
    </Badge>

    <Badge
    color="red.500"
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => handleContactEdit(contact.id)}
    >
    <FaEdit />
    </Badge>
    
    </Heading>
    <Text fontSize={{ base: '18px', md: '22px', lg: '27px' }}>{contact.description}</Text>
    <Text fontSize={{ base: '18px', md: '22px', lg: '27px' }}>{contact.phone}</Text>
    <Text fontSize={{ base: '18px', md: '22px', lg: '27px' }}>{contact.email}</Text>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default contactList;