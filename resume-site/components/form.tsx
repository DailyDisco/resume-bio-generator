interface FormProps {
    prompt: string;
    setPrompt: any;
    onSubmit: any;
    isLoading: boolean;
    characterLimit: number;
}

const Form: React.FC<FormProps> = (props) => {

    // here is where you can change the front end suggested prompt limit
    const isPromptValid = props.prompt.length < props.characterLimit;
    const updatePromptValue = (text: string) => {
        if (text.length <= props.characterLimit) {
            props.setPrompt(text);
        }
    }

    let statusColor = "text-slate-500";
    let statusText = null;
    if (!isPromptValid) {
      statusColor = "text-red-400";
      statusText = `Input must be less than ${props.characterLimit} characters.`;
    }

    return (
        <>
        <div className="mb-6">
            <p className="text-blue-500">Enter a few words that you would throw into a bio. Like... "MERN Stack, Python, Amazon Web Services, Machine Learning, AI, hardworking, dedicated." </p>
        </div>
            <input className="p-2 w-full rounded-md focus:outline-teal-400 focus:outline text-slate-700" type='text' placeholder='MERN Stack, Python, Amazon Web Services...' value={props.prompt} onChange={(e) => updatePromptValue(e.currentTarget.value)}></input>
            <div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
                <div>{statusText}</div>
                <div>
                    {props.prompt.length}/{props.characterLimit}
                </div>
            </div>

            {/* disable the button if the prompt is over the limit */}
            <button className='bg-gradient-to-r from-blue-400 to-purple-500 disabled:opacity-50 w-full p-2 rounded-md text-lg' onClick={props.onSubmit} disabled={props.isLoading || !isPromptValid}>Submit</button>
        </>
    )
}

export default Form