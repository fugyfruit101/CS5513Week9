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
import { addContact } from "../api/contact";
const AddContact = () => {
const [name, setName] = React.useState("");
const [description, setDescription] = React.useState("");
const [phone, setPhone] = React.useState("");
const [email, setEmail] = React.useState("");
const [status, setStatus] = React.useState("pending");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
const { isLoggedIn, user } = useAuth();
const handleContactCreate = async () => {
if (!isLoggedIn) {
toast({
name: "You must be logged in to make changes",
status: "error",
duration: 9000,
isClosable: true,
});
return;
}
setIsLoading(true);
const contact = {
name,
description,
phone,
email,
status,
userId: user.uid,
};
await addContact(contact);
setIsLoading(false);
setName("");
setDescription("");
setPhone("");
setEmail("");
setStatus("pending");
toast({ contact: "Contact created successfully", status: "success" });
};
return (
<Box w={[100, 300, 500, 700, 900]} margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Name"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<Textarea
placeholder="description"
value={description}
onChange={(e) => setDescription(e.target.value)}
/>
<Textarea
placeholder="phone"
value={phone}
onChange={(e) => setPhone(e.target.value)}
/>
<Textarea
placeholder="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>

<Button
onClick={() => handleContactCreate()}
disabled={name.length < 1 || description.length < 1 || email.length < 1 || phone.length < 1 || isLoading}
variantColor="teal"
variant="solid"
>
Add
</Button>
</Stack>
</Box>
);
};
export default AddContact;