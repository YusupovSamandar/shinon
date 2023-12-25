import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/navigation";

function notificationsLabel(count) {
  if (count === 0) {
    return "no notifications";
  }
  if (count > 99) {
    return "more than 99 notifications";
  }
  return `${count} notifications`;
}

export default function AccessibleBadges({ number }) {
  const router = useRouter();
  return (
    <IconButton
      onClick={() => router.push("/notifications")}
      aria-label={notificationsLabel(number)}
    >
      <Badge badgeContent={number} color="secondary">
        <NotificationsIcon style={{ color: "#fff" }} />
      </Badge>
    </IconButton>
  );
}
