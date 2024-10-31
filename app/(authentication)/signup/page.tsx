import Image from "next/image";
import styles from "./signup.module.scss";

const Login = () => {
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
            <form>
              <input type='text' placeholder='Choose a Username' />
              <input type='text' placeholder='Email' />
              <input type='password' placeholder='Password' />
              <input type='password' placeholder='Confirm Password' />

              <button type='submit'>Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
