import React, { useState } from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import Logo from '../public/logo.png';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router'
import { initFirebase } from '../firebase/firebaseApp'

const Generator: React.FC = () => {

    const CHARACTER_LIMIT: number = 128;

    const ENDPOINT: string = 'https://kj3y0mxhv5.execute-api.us-east-1.amazonaws.com/prod/generate_snippet'
    // add _and_keywords to the end of the endpoint to get keywords
    // by using states we can keep track of the input of the user
    const [prompt, setPrompt] = React.useState('');
    const [snippet, setSnippet] = React.useState('');
    // const [keywords, setKeywords] = useState([]);
    const [hasResult, setHasResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    initFirebase();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    const onSubmit = () => {
        console.log("submitting: " + prompt);
        // callApi();
        setIsLoading(true);
        fetch(`${ENDPOINT}?prompt=${prompt}`)
        .then((res) => res.json())
        .then(onResult);
    }

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

    let displayedElement = null;

    if (hasResult) {
        displayedElement = <Results snippet={snippet} onBack={onReset} prompt={prompt}/>
        // keywords={keywords} throw this in there if you want to display the keywords for the user
    } else {
        displayedElement = <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isLoading={isLoading} characterLimit={CHARACTER_LIMIT}/>        
    }

    // this makes the texts white and transparent and clips it to the shape of the image
    const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-light w-fit mx-auto text-4xl";

    if (loading) {
        return <div>Loading...</div>
      }
    
      // if (!user) {
      //   router.push('/login');
      //   return <div>Loading...</div>
      // }
    
    const signIn = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
      }
    
    // const callApi = async () => {
    //     const token = await user.getIdToken();
    //     console.log(token);
    
    //     const echoEndpoint: string = 'https://tinder-bio-generator.vercel.app/'
    //     const certStr: string = "-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIcQ5Oi22voe0wDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAwwmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjIw\nOTE2MDkzOTAwWhcNMjIxMDAyMjE1NDAwWjAxMS8wLQYDVQQDDCZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBALAjywxQ3NbCYLu2aFcsH8FmelB0J1NuuRWPIfeQEbGUGJIL\ns3kKOerbnFSIJD5f9efpAFhvhctdqE6kI3zVP3q+mvU2bcrAqhiKboFmI58ZKwAx\nlLpmPuAX0Yj21Gqn0fgqF9L2ytL5niS4hd7oYZxab5tk8Jpwr+iiyvdJprxpR0un\n8S/QQ4ZPHpLCThXgu4T31FpxX4y/S01rj4I5gj8WOZ7gdiYSpxQXIKMeDYpQ6W5D\npOYy8V1W84BNEP6/ksf8WLIUZADN+zmoSahQeRliwB/NYJkhOUoANxNuwJjduCi8\ncBNcycet0Xh+P0NmR158SgIyt+29GKOb4ZsogAkCAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAABh0COOYkJzbOtf8AhCiMjMKD9l6mk/u4gx7SOe6rZA\n/UIRDg3zRrkEocd/TdljAzaWoDp2BXDuFQXrfI5ZWbEugv+RkJjVk5hxrqhcpWYp\nrNzFwQzA5bu9lNXl1iYaX9t2kW6ikj7N6iYwbtozqlmiH3JeLKmmq+5634X3lcua\nyWNRocDx8yhrUn0B8vjn6l0WlNdoiTn7mZtIu1u26zLrw5ahTpk5FsxexoaIWcEi\nMyDApMCSyIf3ECeS/cAc/5npIUHkFHbsarA79bYaL+epVW3r8xoLlRXMDEjknun8\nAuBe+8FUZWR/To6nAL2g85LhJqMzQMuSvDzW4PWqLnw=\n-----END CERTIFICATE-----\n";

    //     const encodedCertStr: string = encodeURIComponent(certStr);
    //     const audience: string = 'brandinggeneratordemo';
    
    //     const verificationEndpoint: string = `${echoEndpoint}/verify?audience=${audience}&cert_str=${encodedCertStr}`;
    
    
    //     const requestInfo = {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         },
    //      }
    //     const response = await fetch(echoEndpoint, requestInfo);
    //     const responseBody = await response.json();
    //     console.log(responseBody);
    //   }

    return (
        <div className="h-screen flex">
            <div className="max-w-md m-auto p-2">
                <div className="bg-slate-200 p-6 rounded-md text-white">
                    <div className="text-center my-6">
                        <Image src={Logo} width={128} height={128} alt='logo'/>
                        <h1 className={gradientTextStyle + "text-3xl font-light w-fit mx-auto"}>Welcome to the AI assisted Resume Bio generator!</h1>
                        <div className={gradientTextStyle}>Generate bios with a few keywords and personality traits which you would like to include</div>
                    </div>
                    {user ? (
                    <div>
                        {displayedElement}
                        <div className="my-2">
                            <button className='bg-red-600 text-white rounded-md p-2 w-full' onClick={() => auth.signOut()}>
                                <div>
                                Sign Out with Google
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    ) : (
                        <div>
                            <button className='bg-blue-500 text-white rounded-md p-2 w-full' onClick={signIn}>
                                <div>
                                    Sign in with Google
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Generator