import {
  BarChart2,
  FileText,
  Calendar,
  BookOpen,
  Database,
  Users,
} from "lucide-react";

export const navigation = [
  {
    name: "Insights",
    href: "/insights",
    icon: BarChart2,
  },
  {
    name: "Admission Flow",
    href: "/admission",
    icon: FileText,
  },
  {
    name: "Interview Schedule",
    href: "/interviews",
    icon: Calendar,
  },
  {
    name: "Academic Year Roster",
    href: "/roster",
    icon: BookOpen,
  },
  {
    name: "WISE Database",
    href: "/database",
    icon: Database,
  },
  {
    name: "WISE Families",
    href: "/families",
    icon: Users,
  },
];
