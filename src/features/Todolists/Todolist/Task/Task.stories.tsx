import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatus} from "../../../../API/task-api";



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action("Status changed inside Task")
const changeTaskTitleCallback = action("Title changed inside Task")
const removeTaskCallback = action("Remove button inside form was clicked")

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'JS', description: '', status: TaskStatus.Completed,
        priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''},
    todolistId: 'todolistId1',
};

export const TaskIsNotDoneExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '2', status: TaskStatus.New, title: 'Python', description: '',
        priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''},
    todolistId: 'todolistId1',
};
