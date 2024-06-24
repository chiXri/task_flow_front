interface Task {
    id: number;
    title: string;
    description: string;
    category: string;
    startTime: string;
    endTime: string;
    user: { id: number };
  }
  