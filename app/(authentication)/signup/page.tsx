"use client";

import React, { useState } from "react";
import Image from "next/image";
import { registerUser } from "@/utils/authHelpers";
import styles from "@/styles/signup.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerUser(username, email, password);
      alert("Account created successfully!");
      router.push("/login");
    } catch (err) {
      setError("Registration failed");
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
            <p>Create an Account</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Choose a Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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
              <input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type='submit'>Create Account</button>
            </form>

            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Already have an account?&nbsp;
              <span>
                <Link href='/login' style={{ textDecoration: "underline" }}>
                  Login
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
