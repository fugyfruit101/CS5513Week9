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
    import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
    import { deleteDate, toggleDateStatus } from "../api/date";
    const DateList = () => {
    const [date, setDate] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
    const refreshData = () => {
    if (!user) {
    setDate([]);
    return;
    }
    const q = query(collection(db, "date"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
    let ar = [];
    querySnapchot.docs.forEach((doc) => {
    ar.push({ id: doc.id, ...doc.data() });
    });
    setDate(ar);
    });
    };
    useEffect(() => {
    refreshData();
    }, [user]);
    const handleDateDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this deadline?")) {
    deleteDate(id);
    toast({ title: "Deadline deleted successfully", status: "success" });
    }
    };
    const handleToggle = async (id, status) => {
    const newStatus = status == "completed" ? "pending" : "completed";
    await toggleDateStatus({ docId: id, status: newStatus });
    toast({
    title: `Date marked ${newStatus}`,
    status: newStatus == "completed" ? "success" : "warning",
    });
    };
    return (
    <Box mt={5}>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
    {date &&
    date.map((date) => (
    <Box
    p={3}
    boxShadow="2xl"
    shadow={"dark-lg"}
    transition="0.2s"
    _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={"xl"}>
    {date.project}{" "}
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
    onClick={() => handleDateDelete(date.id)}
    >
    <FaTrash />
    </Badge>
    <Badge
    color={date.status == "pending" ? "gray.500" : "green.500"}
    bg="inherit"
    transition={"0.2s"}
    _hover={{
    bg: "inherit",
    transform: "scale(1.2)",
    }}
    float="right"
    size="xs"
    onClick={() => handleToggle(date.id, date.status)}
    >
    {date.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
    </Badge>
    <Badge
    float="right"
    opacity="0.8"
    bg={date.status == "pending" ? "yellow.500" : "green.500"}
    >
    {date.status}
    </Badge>
    </Heading>
    <Text>{date.deadline}</Text>
    </Box>
    ))}
    </SimpleGrid>
    </Box>
    );
    };
    export default DateList;