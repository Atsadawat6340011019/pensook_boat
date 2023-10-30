export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const buddhistYear = date.getFullYear() + 543;
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "น." : "น.";

  const formattedDate = `${day} ${month} ${buddhistYear},`;
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return `${formattedDate} ${formattedTime}`;
};
