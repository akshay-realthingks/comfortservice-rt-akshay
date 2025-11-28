import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const mockTasks = [
  { id: 1, title: "Follow up with Acme Corp", priority: "High", completed: false, dueDate: "Today" },
  { id: 2, title: "Prepare proposal for TechStart", priority: "Medium", completed: false, dueDate: "Tomorrow" },
  { id: 3, title: "Schedule demo with Global Solutions", priority: "High", completed: true, dueDate: "Yesterday" },
  { id: 4, title: "Send contract to Beta LLC", priority: "Low", completed: false, dueDate: "Next Week" },
  { id: 5, title: "Update CRM data", priority: "Medium", completed: false, dueDate: "Today" },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(mockTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Tasks</h1>

      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <div className="flex-1">
                  <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{task.dueDate}</p>
                </div>
                <Badge variant={getPriorityColor(task.priority) as any}>
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tasks;
