import * as d3 from "d3-force";
import { useEffect, useState } from "preact/hooks";
import { FaTwitter } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import "./notification.css";

const classNames = (...args) => args.filter(Boolean).join(" ");

const Notification = ({
  app,
  title,
  body,
  buttons = [],
  img = undefined,
  blurred = false,
  x = 0,
  y = 0,
  icon,
  i = 0,
}) => {
  const isBig = buttons.length > 0 ? true : false;
  const [hidden, setHidden] = useState(!isBig);
  useEffect(() => {
    setTimeout(() => setHidden(false), 1500 + (600 - i * 40) * i);
  }, []);

  const timeAgo = i === 5 ? "Just now" : `${5 - i}m ago`;

  return (
    <div
      className={classNames(
        "notification",
        blurred && "blurred",
        hidden && "hide"
      )}
      style={{
        // marginLeft: x === 0 ? 'auto' : x * 40,
        // top: y
        transform: `translate(${Math.max(-330, x * 2)}px, ${Math.max(
          -170,
          y
        )}px)`,
      }}
    >
      <header>
        <img className="img" src={`./assets/icons/${icon}?${Math.random()}`} />
        <span className="app">{app}</span>
        <span className="time-ago">{timeAgo}</span>
      </header>
      {isBig && img && (
        <div
          className="bigimg"
          style={{ backgroundImage: `url(${img}?${Math.random()})` }}
        />
      )}
      <div className="main">
        <div className="text">
          <span className="heading">{title}</span>
          <span className="body">{body}</span>
        </div>
        {!isBig && img && (
          <img
            src={`./assets/images/${img}?${Math.random()}`}
            className="image"
          />
        )}
      </div>
    </div>
  );
};

let simulation;

const Notifications = () => {
  const notifs = [
    {
      app: "PsyOptions",
      title: "Your Option will expire in 3 days",
      body: "Remember to trade or exercise your 45,000 USDC/BTC Call before Saturday",
      icon: "psyoptions.png",
      img: "btc.png",
    },
    {
      app: "Metaplex",
      title: "You've been outbid on an NFT",
      body: "Aurorian #9990 is now 999 SOL. 2 SOL higher than your bid. Ends in 20 minutes",
      icon: "metaplex.png",
      img: "aurory.png",
    },
    {
      app: "Serum",
      title: "Your MNGO-USDC order was filled",
      body: "You bought 1024 MNGO at 0.46 USDC, totalling 471.04 USDC",
      icon: "serum.png",
      img: "mango.svg",
    },
    {
      app: "Pyth",
      title: "SOL-USDC Price increase alert",
      body: "Solana has increased 3.142% in the last hour!",
      icon: "pyth.png",
      img: "solana.png",
    },
    {
      app: "Note",
      title: "Airdrop alert!",
      body: "You received 420.69 ORCA in your wallet",
      icon: "note.png",
      img: "orca.png",
    },
    {
      app: "Wormhole",
      title: "Ethereum Deposit received",
      body: "2.1 wrapped ETH is now in your wallet",
      icon: "wormhole.png",
      img: "ethereum.png",
    },
  ];

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    simulation = d3
      .forceSimulation(notifs)
      .force("charge", d3.forceManyBody().strength(-180))
      .alpha(0.5)
      .alphaDecay(0.02)
      .on("tick", () => {
        setNotifications([...simulation.nodes()]);
      });

    simulation.tick(400);
  }, []);

  return (
    <div className="notifications-container mt-10 mb-20">
      <div className="notifications">
        {notifications.map((n, i) => (
          <Notification {...n} i={i} />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="text-white h-screen">
      <header className="p-10">
        <img src="./assets/goo.svg" alt="Goo" className="mx-auto sm:mx-0" />
      </header>
      <main>
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pb-15 md:pb-0 hero">
          <h2 className="text-center text-5xl font-bold text-white md:text-6xl heading">
            Web3 push notifications are almost here
          </h2>
          <p className="mt-6 max-w-md mx-auto font-extralight text-center text-xl text-white subheading">
            Instant, decentralized, privacy-preserving, composable notifications
            for your service.
          </p>
        </div>

        <Notifications />

        <div className="max-w-md mx-auto text-center px-4 sm:px-6 lg:py-16 lg:px-8 improve">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Want to improve your web3 service with integrated notifications?
          </h2>
          <div className="mt-8 flex flex-col text-lg">
            <a
              href="https://twitter.com/goo_tools"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,204,160,1) 0%, rgba(0,204,126,1) 100%)",
              }}
              className="mb-5 inline-flex justify-center px-3 py-4 shadow-sm leading-4 rounded-md focus:outline-none"
            >
              @goo_tools
              <FaTwitter />
            </a>
            <a
              href="mailto:hi@goo.tools"
              style={{ background: "#1D252F" }}
              className="inline-flex justify-center px-3 py-4 shadow-sm leading-4 rounded-md focus:outline-none"
            >
              hi@goo.tools
              <IoMdMail />
            </a>
          </div>
        </div>
      </main>

      <footer className="mt-20 justify-center items-center flex flex-col sm:space-x-20 sm:flex-row text-gray-400">
        <div className="inline-flex items-center mb-10">
          <img src="./assets/goo.svg" style={{ height: 30 }} />
          sticks things together
        </div>
        <div className="inline-flex items-center mb-10">
          built on
          <a href="https://solana.com">
            <img
              src="./assets/images/solana-full.png"
              alt="Solana"
              style={{ height: 20 }}
            />
          </a>
        </div>
      </footer>

      <div className="bg aurory">
        <Notification
          app="Metaplex"
          title="You’ve been outbid on your NFT"
          body="Someone bid 2 more SOL on Aurorian #9990, increasing the price to 999 SOL."
          img="./assets/auorory.jpg"
          buttons={["Bid again", "View auction"]}
          blurred
        />
      </div>

      <div className="bg ape">
        <Notification
          app="Metaplex"
          title="You won your NFT auction!"
          body="Degen Ape #9209 sold for 666 SOL."
          img="./assets/degenape.jpg"
          buttons={["Bid again", "View auction"]}
          blurred
        />
      </div>
    </div>
  );
}
