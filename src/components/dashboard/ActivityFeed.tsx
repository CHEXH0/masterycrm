
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Activity {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

const activities: Activity[] = [
  {
    id: 1,
    title: "New policy issued",
    description: "Emma Thompson issued a life insurance policy for John Smith",
    timestamp: "10 min ago",
    user: { name: "Emma Thompson", initials: "ET" }
  },
  {
    id: 2,
    title: "Claim processed",
    description: "John approved health claim #HC-2023-0472 for $1,250",
    timestamp: "1 hour ago",
    user: { name: "John Doe", initials: "JD" }
  },
  {
    id: 3,
    title: "Client meeting scheduled",
    description: "Sarah scheduled a policy review with Mary Johnson",
    timestamp: "3 hours ago",
    user: { name: "Sarah Wilson", initials: "SW" }
  },
  {
    id: 4,
    title: "Policy renewal",
    description: "Michael processed renewal for Policy #LI-7825-44B",
    timestamp: "Yesterday",
    user: { name: "Michael Johnson", initials: "MJ" }
  },
];

const ActivityFeed = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>{activity.user.initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{activity.title}</p>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
