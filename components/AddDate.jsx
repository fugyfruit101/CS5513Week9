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
import { addDate } from "../api/date";
const AddDate = () => {
const [project, setProject] = React.useState("");
const [deadline, setDeadline] = React.useState("");
const [status, setStatus] = React.useState("pending");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
const { isLoggedIn, user } = useAuth();
const handleDateCreate = async () => {
if (!isLoggedIn) {
toast({
project: "You must be logged in to make changes",
status: "error",
duration: 9000,
isClosable: true,
});
return;
}
setIsLoading(true);
const date = {
project,
deadline,
status,
userId: user.uid,
};
await addDate(date);
setIsLoading(false);
setProject("");
setDeadline("");
setStatus("pending");
toast({ project: "Deadline created successfully", status: "success" });
};
return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="project"
value={project}
onChange={(e) => setProject(e.target.value)}
/>
<Textarea
placeholder="deadline"
value={deadline}
onChange={(e) => setDeadline(e.target.value)}
/>
<Select value={status} onChange={(e) => setStatus(e.target.value)}>
<option
value={"pending"}
style={{ color: "yellow", fontWeight: "bold" }}
>
Pending ⌛
</option>
<option
value={"completed"}
style={{ color: "green", fontWeight: "bold" }}
>
Completed ✅
</option>
</Select>
<Button
onClick={() => handleDateCreate()}
disabled={project.length < 1 || deadline.length < 1 || isLoading}
variantColor="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
);
};
export default AddDate;