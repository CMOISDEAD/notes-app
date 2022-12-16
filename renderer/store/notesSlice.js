import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    todos: [
      {
        name: "Test",
        items: [
          {
            id: 0,
            name: "this is just a test",
            description: "i dont know...",
            status: false,
          },
        ],
      },
    ],
  },
  reducers: {
    setNotesData: (state, action) => {
      state.notes = action.payload;
    },
    sortNotesData: (state, _action) => {
      console.log("sort");
      console.log(
        state.notes.sort((a, b) => {
          a.name.localeCompare(b.name);
        })
      );
    },
    setTodosData: (state, action) => {
      state.todos = action.payload;
      if (state.todos)
        state.todos = state.todos.sort(
          (a, b) => b.items.length - a.items.length
        );
    },
    addTodo: (state, action) => {
      const [name, new_task] = action.payload;
      state.todos = [
        ...state.todos.filter((section) => section.name != name),
        {
          name: name,
          items: new_task,
        },
      ];
      state.todos = state.todos.sort((a, b) => b.items.length - a.items.length);
    },
  },
});

export const { setNotesData, sortNotesData, setTodosData, addTodo } =
  notesSlice.actions;

export default notesSlice;
