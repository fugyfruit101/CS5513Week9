import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import AddDate from "../components/AddDate";
import DateList from "../components/DateList";
export default function Home() {
return (
<Container maxW="7xl">
<Auth />
<AddTodo />
<TodoList />
<AddDate />
<DateList />
</Container>
);
}