import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, User } from "lucide-react";

const Tasks = () => {
  const tasks = [
    { id: 1, title: "Follow up with Acme Corp", priority: "high", dueDate: "Today", assignee: "You", completed: false },
    { id: 2, title: "Send proposal to TechStart", priority: "high", dueDate: "Today", assignee: "Sarah", completed: false },
    { id: 3, title: "Schedule demo for GlobalCo", priority: "medium", dueDate: "Tomorrow", assignee: "Mike", completed: false },
    { id: 4, title: "Update CRM data", priority: "low", dueDate: "This week", assignee: "You", completed: false },
    { id: 5, title: "Prepare quarterly report", priority: "medium", dueDate: "This week", assignee: "Team", completed: true },
  ];

  const priorityColors = {
    high: "bg-destructive/10 text-destructive",
    medium: "bg-warning/10 text-warning",
    low: "bg-muted text-muted-foreground",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-1">Manage your activities and to-dos</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors ${
                    task.completed ? "opacity-50" : ""
                  }`}
                >
                  <Checkbox
                    checked={task.completed}
                    className="h-5 w-5"
                  />
                  <div className="flex-1 space-y-1">
                    <p className={`font-medium ${task.completed ? "line-through" : ""}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{task.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{task.assignee}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
