import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import Auth from "./components/Auth";

const filters = { type: "messaging" };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const client = StreamChat.getInstance("64vdjrsdr4jb");

const App = () => {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);

  const authToken = true;

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: "dave-matthews",
            name: "Dave Matthews",
          },

          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGF2ZS1tYXR0aGV3cyJ9.Ulm8YYe_5dXbiorgqGgUQ45FWWXlnP7Njq4IHc9aUmM"
        );

        const channel = await client.channel("gaming", "gaming-demo", {
          name: "Gaming Demo",
        });
        setChannel(channel);

        setClientReady(true);
      } catch (err) {
        console.log(err);
      }
    };

    setupClient();
  }, []);

  if (!clientReady) return null;

  const customStyles: CustomStyles = {
    "--primary-color": "blue",
    "--md-font": "1.2rem",
    "--xs-m": "1.2rem",
    "--xs-p": "1.2rem",
  };

  return (
    <>
      {!authToken && <Auth />}
      {authToken && (
        <Chat
          client={client}
          //darkMode={true}  -used customStyles instead of that
          customStyles={customStyles}
        >
          <ChannelList filters={filters} sort={sort} options={options} />
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      )}
    </>
  );
};

export default App;
