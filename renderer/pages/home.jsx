import electron from "electron";
import React from "react";
import Head from "next/head";
import Link from "next/link";

const ipcRenderer = electron.ipcRenderer || false;

function Home() {
  const [message, setMessage] = React.useState("no ipc message");

  const onClickWithIpc = () => {
    ipcRenderer.send("get-files");
  };

  const onClickWithIpcSync = () => {
    const message = ipcRenderer.sendSync("get-files");
    console.log(message);
    setMessage("yes");
  };

  // If we use ipcRenderer in this scope, we must check the instance exists
  if (ipcRenderer) {
    // In this scope, the webpack process is the client
  }

  React.useEffect(() => {
    // like componentDidMount()

    // register `ping-pong` event
    ipcRenderer.on("get-files", (event, data) => {
      console.log(data);
      setMessage("ready");
    });

    return () => {
      // like componentWillUnmount()

      // unregister it
      ipcRenderer.removeAllListeners("ping-pong");
    };
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (ipc-communication)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
        <hr />
        <button onClick={onClickWithIpc}>IPC messaging</button>
        <button onClick={onClickWithIpcSync}>IPC messaging (sync)</button>
        <p>{message}</p>
      </div>
    </React.Fragment>
  );
}

export default Home;
