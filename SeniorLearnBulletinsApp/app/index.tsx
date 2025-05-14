import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request Failed");
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
      })

      .catch((err) => {
        console.error("Fetch error:", err);
        setError(true);
      });
  });
  return (
    <View>
      {error ? (
        <Text>request failed</Text>
      ) : message ? (
        <Text>{message}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
