import Image from "next/image";
import styles from "@/styles/login.module.scss";
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
            <p>Enter details to login.</p>
            <form>
              <input type='text' placeholder='Email' />
              <input type='password' placeholder='Password' />
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
