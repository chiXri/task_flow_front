import { defineStore } from 'pinia';
import axiosInstance from '@/config/axiosConfig';
import axios, { isAxiosError } from 'axios'; 

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  startTime: string;
  endTime: string;
  user: { id: number };
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    async fetchTasks(userId: number) {
      try {
        const response = await axiosInstance.get(`/api/tasks/user/${userId}`);
        this.tasks = response.data as Task[];
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.error('Error fetching tasks:', error.response?.data || error.message);
        } else {
          console.error('Error fetching tasks:', (error as Error).message);
        }
      }
    },
    async saveTask(task: Task): Promise<Task> {
      try {
        const response = await axiosInstance.post('/api/tasks', task);
        const savedTask = response.data as Task;
        this.tasks.push(savedTask);
        return savedTask;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.error('Error saving task:', error.response?.data || error.message);
        } else {
          console.error('Error saving task:', (error as Error).message);
        }
        throw error;
      }
    }
  }
});
