import { useState } from "react";
import { NAVBAR_MENU, SLIDERIGHT } from "../constants/animations";
import styles from "../styles/navbar.module.css";
import { GithubIcon, PythonIcon, ReactIcon } from "./icons";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isReposOpen, setIsReposOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1 className="text-primary">Lynx</h1>
        </div>
        <GithubIcon
          className={styles.github}
          onClick={() => setIsReposOpen(!isReposOpen)}
        />
        <AnimatePresence>{isReposOpen && <RepoMenu />}</AnimatePresence>
      </div>
    </header>
  );
}

const MenuItem = ({ icon, text, href }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <motion.div className={styles.menuItem} variants={SLIDERIGHT}>
        {icon}
        <p>{text}</p>
      </motion.div>
    </a>
  );
};

const Menu = ({ children, className }) => {
  return (
    <motion.div
      className={styles.menu + " " + className ?? ""}
      variants={NAVBAR_MENU}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={NAVBAR_MENU.transition}
    >
      {children}
    </motion.div>
  );
};

const RepoMenu = () => {
  return (
    <Menu className={styles.repos}>
      <MenuItem
        icon={<ReactIcon />}
        text="React App"
        href="https://github.com/daniel-lujan/lynx-client"
      />
      <MenuItem
        icon={<PythonIcon />}
        text="Flask API"
        href="https://github.com/daniel-lujan/lynx-api"
      />
    </Menu>
  );
};
