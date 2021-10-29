export function RequestPushMsg(token, name, msg,posts) {
  console.log("param=>", token, msg);
  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "accept-encoding": "gzip, deflate",
      host: "exp.host",
    },
    body: JSON.stringify({
      to: token,
     // title: `${name} created a new post.`,
      body: `${name} ${posts} `,
      // image:image,
      data: { msg: msg, title: "Kabfi Notification" },
      priority: "high",
      sound: "default",
      channelId: "messages",
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.log(error);
    });
}
