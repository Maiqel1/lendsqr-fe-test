"use client";

import React, { useState } from "react";
import Image from "next/image";
import { loginUser } from "@/utils/authHelpers";
import styles from "@/styles/login.module.scss";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return pattern.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    const isAuthenticated = await loginUser(email, password);
    if (isAuthenticated) {
      alert("Logged in successfully!");
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src='/logo.svg' alt='Logo' width={150} height={50} />
      </div>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <Image
            src='/loginpic.png'
            alt='Login Illustration'
            width={600}
            height={337}
          />
        </div>
        <div className={styles.rightSide}>
          <div>
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <h3>FORGOT PASSWORD?</h3>
              <button type='submit'>Log in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
