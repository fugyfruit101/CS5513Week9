import React from "react";
import {
Box,
Input,
Button,
Textarea,
Stack,
Select,
useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addEvent } from "../api/event";
const AddEvent = () => {
const [title, setTitle] = React.useState("");
const [deadline, setDeadline] = React.useState("");
const [status, setStatus] = React.useState("pending");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
const { isLoggedIn, user } = useAuth();
const handleEventCreate = async () => {
if (!isLoggedIn) {
toast({
title: "You must be logged in to make changes",
status: "error",
duration: 9000,
isClosable: true,
});
return;
}
setIsLoading(true);
const event = {
title,
deadline,
status,
userId: user.uid,
};
await addEvent(event);
setIsLoading(false);
setTitle("");
setDeadline("");
setStatus("pending");
toast({ event: "Deadline created successfully", status: "success" });
};
return (
<Box w={[100, 300, 500, 700, 900]} margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Title"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
<Textarea
placeholder="deadline"
value={deadline}
onChange={(e) => setDeadline(e.target.value)}
/>

<Button
onClick={() => handleEventCreate()}
disabled={title.length < 1 || deadline.length < 1 || isLoading}
variantColor="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
);
};
export default AddEvent;