import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Generator from '../components/generator'
// import Logo from '../public/logo.png'
import { initFirebase } from '../firebase/firebaseApp'
import styles from '../styles/Home.module.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  // initFirebase();
  // const provider = new GoogleAuthProvider();
  // const auth = getAuth();
  // const [user, loading] = useAuthState(auth);
  // const router = useRouter();

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  // if (!user) {
  //   router.push('/login');
  //   return <div>Loading...</div>
  // }

  // if (user) {
  //   router.push('/');
  //   return <div>Loading...</div>
  // }

  // const signIn = async () => {
  //   const result = await signInWithPopup(auth, provider);
  //   console.log(result.user);
  // }

  // const callApi = async () => {
  //   const token = await user.getIdToken();
  //   console.log(token);

  //   const echoEndpoint: string = 'https://tinder-bio-generator.vercel.app/'
  //   const certStr: string = "-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIcQ5Oi22voe0wDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAwwmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjIw\nOTE2MDkzOTAwWhcNMjIxMDAyMjE1NDAwWjAxMS8wLQYDVQQDDCZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBALAjywxQ3NbCYLu2aFcsH8FmelB0J1NuuRWPIfeQEbGUGJIL\ns3kKOerbnFSIJD5f9efpAFhvhctdqE6kI3zVP3q+mvU2bcrAqhiKboFmI58ZKwAx\nlLpmPuAX0Yj21Gqn0fgqF9L2ytL5niS4hd7oYZxab5tk8Jpwr+iiyvdJprxpR0un\n8S/QQ4ZPHpLCThXgu4T31FpxX4y/S01rj4I5gj8WOZ7gdiYSpxQXIKMeDYpQ6W5D\npOYy8V1W84BNEP6/ksf8WLIUZADN+zmoSahQeRliwB/NYJkhOUoANxNuwJjduCi8\ncBNcycet0Xh+P0NmR158SgIyt+29GKOb4ZsogAkCAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAABh0COOYkJzbOtf8AhCiMjMKD9l6mk/u4gx7SOe6rZA\n/UIRDg3zRrkEocd/TdljAzaWoDp2BXDuFQXrfI5ZWbEugv+RkJjVk5hxrqhcpWYp\nrNzFwQzA5bu9lNXl1iYaX9t2kW6ikj7N6iYwbtozqlmiH3JeLKmmq+5634X3lcua\nyWNRocDx8yhrUn0B8vjn6l0WlNdoiTn7mZtIu1u26zLrw5ahTpk5FsxexoaIWcEi\nMyDApMCSyIf3ECeS/cAc/5npIUHkFHbsarA79bYaL+epVW3r8xoLlRXMDEjknun8\nAuBe+8FUZWR/To6nAL2g85LhJqMzQMuSvDzW4PWqLnw=\n-----END CERTIFICATE-----\n";
  //   const encodedCertStr: string = encodeURIComponent(certStr);
  //   const audience: string = 'brandinggeneratordemo';

  //   const verificationEndpoint: string = `${echoEndpoint}/verify?audience=${audience}&cert_str=${encodedCertStr}`;


  //   const requestInfo = {
  //       headers: {
  //           Authorization: `Bearer ${token}`
  //       },
  //    }
  //   const response = await fetch(echoEndpoint, requestInfo);
  //   const responseBody = await response.json();
  //   console.log(responseBody);
  // }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>AI Generated Tinder Bios!</title>
        <meta name="description" content="Generate Tinder Bios since none of you know how" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {user ? (
      <div> */}
        <Generator />
        {/* <div>
          <button onClick={() => auth.signOut()}>
            <div className='bg-blue-600 text-white rounded-md p-2 w-48'>
              Sign Out with Google
            </div>
            </button>
        </div>
      </div>
       ) : ( 
        <div>
          <div>
              <button onClick={signIn}>
                  <div className='bg-blue-600 text-white rounded-md p-2 w-48'>
                      Sign in with Google
                  </div>
              </button>
          </div>

          <div>
              <button onClick={() => auth.signOut()}>
                  <div className='bg-blue-600 text-white rounded-md p-2 w-48'>
                      Sign Out with Google
                  </div>
              </button>
          </div>
        </div>
     )} */}
    </div>
  )
}

export default Home
