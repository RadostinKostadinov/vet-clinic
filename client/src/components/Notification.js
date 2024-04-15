import "./Notification.css";
import { useEffect, useState } from "react";

export default function Notification({
  title,
  description,
  type,
  duration = 3000,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (description) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [description, duration]);

  if (!visible) return null;

  return (
    <div className="notification">
      <div className="notification-title">{title}</div>
      <div className="notification-description">{description}</div>
      <div className="notification-type">{type}</div>
    </div>
  );
}
