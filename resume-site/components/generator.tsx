import React, { useState } from 'react';
import Form from './form';
import Results from './results';
import Image from 'next/image';
// import Logo from '../public/logo.png';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { initFirebase } from '../firebase/firebaseApp';

const Generator: React.FC = () => {
  const CHARACTER_LIMIT: number = 128;

  const ENDPOINT: string =
    'https://kj3y0mxhv5.execute-api.us-east-1.amazonaws.com/prod/generate_snippet';
  // add _and_keywords to the end of the endpoint to get keywords
  // by using states we can keep track of the input of the user
  const [prompt, setPrompt] = React.useState('');
  const [snippet, setSnippet] = React.useState('');
  // const [keywords, setKeywords] = useState([]);
  const [hasResult, setHasResult] = useState(false);
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  initFirebase();
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const onSubmit = () => {
    console.log('submitting: ' + prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult);
    callApi();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  //   if (!user) {
  //     return <div>Loading...</div>
  //   }

  //   if (user) {
  //     router.push('/');
  //     return <div>Loading...</div>
  //   }

  // this takes the json data when the user clicks the button and sets the state
  // gives you the snippet and keywords as variables you can use
  const onResult = (data: any) => {
    setSnippet(data.snippet);
    // setKeywords(data.keywords);
    setHasResult(true);
    setIsLoading(false);
  };

  const onReset = () => {
    setPrompt(''); // reset the prompt
    setHasResult(false);
    setIsLoading(false);
  };

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  const callApi = async () => {
    const token = await user.getIdToken();
    console.log(token);

    const echoEndpoint: string =
      'https://kj3y0mxhv5.execute-api.us-east-1.amazonaws.com/prod/generate_snippet';

    const certStr: string =
      '-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIcGlOR4pTw1MwDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAwwmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjIx\nMDE4MDkzOTA0WhcNMjIxMTAzMjE1NDA0WjAxMS8wLQYDVQQDDCZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBAKao9TW+dmq7mfimg7lX7JJfQ6HemUJ77UpVYZ0oyUQgwBzP\nH0cjDU3qSWKB8BzCBdZj/ZDSxI1QRRLLIS/Atffpxb1tG7hhVO9hPP0tXaCi+Epa\nUsAGQrj4cg9w7YMvA+9Lp2Lrxqy73zx4mkrvCKv4B821bVKJaJuShQl3wDS7STUq\naWptNIxdJjQ/p6jBcaEH41tUSlLakZQZA3oXcMapY9hTtCrY422ezomTidBiZskd\npCfsKYrjpZLcuF4PpzpAdZv3gdR9vJLs+g+Agi7M5S0lqyI6TG1J6ONdaq0QCd2Z\nbeYmgcjwrpnrkNhaA1rG1bhY7kUE/yGoT8Pq290CAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAJUAKTALZSYb5Yqq19QNBMdoPT3sKRpKWX/6kmrIyWGv\nUhbIDajpte3ogQw226St4lBVvcPnL/vCC0YE99+xlRSuO2DhoRtf0UENSjEVQa+4\nJFb22uL4XI7r3M783BN7h2UCEE3tWLYndzOY5H8y2o8HCvnHnSY4kYrUlBt+JEox\nYut9eeNya+fUkOnjZSQ5A+ljmTGk9bTcUbMC9Vi7wTYh9H1q4K1ac9QI79L3eXRa\nD5dk7AQcbwpSxy5hnB6MTmB7bznIMFmK0tVNw7i9y0R+xOqDWjOtOnRLC8QTBY7x\n3lLfGbyh+JVd/Yo/3k55tyJ5OsFX1Cm3+UKrquAzuzM=\n-----END CERTIFICATE-----\n';

    const encodedCertStr: string = encodeURIComponent(certStr);

    const audience: string = 'resume-bio-generator';

    const verificationEndpoint: string = `${echoEndpoint}/verify?audience=${audience}&cert_str=${encodedCertStr}`;

    const requestInfo = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(echoEndpoint, requestInfo);

    const responseBody = await response.json();
    console.log(responseBody);
  };

  let displayedElement = null;

  if (hasResult) {
    displayedElement = (
      <Results snippet={snippet} onBack={onReset} prompt={prompt} />
    );
    // keywords={keywords} throw this in there if you want to display the keywords for the user
  } else {
    displayedElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        isLoading={isLoading}
        characterLimit={CHARACTER_LIMIT}
      />
    );
  }

  // this makes the texts white and transparent and clips it to the shape of the image
  const gradientTextStyle =
    'text-white text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-light w-fit mx-auto text-4xl';

  return (
    <div className='h-screen flex'>
      <div className='max-w-md m-auto p-2'>
        <div className='bg-slate-200 p-6 rounded-md text-white'>
          <div className='text-center my-6'>
            {/* <Image src={Logo} width={128} height={128} alt='logo'/> */}
            <h1
              className={
                gradientTextStyle + 'text-3xl font-light w-fit mx-auto'
              }
            >
              Welcome to the AI assisted Resume Bio generator!
            </h1>
            <div className={gradientTextStyle}>
              Generate bios with a few keywords and personality traits which you
              would like to include
            </div>
          </div>
          {user ? (
            <div>
              {displayedElement}
              <div className='my-2'>
                <button
                  className='bg-red-600 text-white rounded-md p-2 w-full'
                  onClick={() => auth.signOut()}
                >
                  <div>Sign Out with Google</div>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                className='bg-blue-500 text-white rounded-md p-2 w-full'
                onClick={signIn}
              >
                <div>Sign in with Google</div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generator;
