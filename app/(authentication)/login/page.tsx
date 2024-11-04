"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { initializeTestUser, loginUser } from "@/utils/authHelpers";
import styles from "@/styles/login.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  useEffect(() => {
    const init = async () => {
      if (typeof window !== "undefined") {
        await initializeTestUser();
      }
    };
    init();
  }, []);

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
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={styles.showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              </div>
              <h3>FORGOT PASSWORD?</h3>
              <button type='submit'>Log in</button>
            </form>
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Don't have an account? Create one{" "}
              <span>
                <Link href='/signup' style={{ textDecoration: "underline" }}>
                  here
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
