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
    import { collection, onSnapshot, query, where} from "firebase/firestore";
    import { db } from "../firebase";
    import { FaTrash, FaEdit } from "react-icons/fa";
    import { deleteEvent, editEvent} from "../api/event";
    const EventList = () => {
    const [event, setEvent] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
    const refreshData = () => {
    if (!user) {
    setEvent([]);
    return;
    }
    const q = query(collection(db, "event"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
    let ar = [];
    querySnapchot.docs.forEach((doc) => {
    ar.push({ id: doc.id, ...doc.data() });
    });
    setEvent(ar);
    });
    };
    useEffect(() => {
    refreshData();
    }, [user]);
    const handleEventDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this deadline?")) {
    deleteEvent(id);
    toast({ title: "Deadline deleted successfully", status: "success" });
    }
    };

    const handleEventEdit = async (id) => {
            editEvent(id);
        };
   
    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {event &&
    event.map((event) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={{ base: '20px', md: '25px', lg: '30px' }}>
    {event.title}{" "}
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
    onClick={() => handleEventDelete(event.id)}
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
    onClick={() => handleEventEdit(event.id)}
    >
    <FaEdit />
    </Badge>
    
    </Heading>
    <Text fontSize={{ base: '18px', md: '22px', lg: '27px' }}>{event.deadline}</Text>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default EventList;