import { useCallback, useState, useEffect, useRef } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false);
  

  // useRef used to store the reference of the password
  const passwordRef = useRef(null);

  // useCallback used to memorize the function and prevent the function from rendering again and again
  const passwordGenerator = useCallback(() => {
    let pass="",
    str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed){
      str +=  "0123456789"
    }


    if(charAllowed){
      str += "!@#$%^&*()"
    }

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword])

  // here we are using the use Call Back method for copy text
  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password)
    setCopied(true);
    setTimeout(() => {
    setCopied(false);
}, 2000);
  },[password])

  // Use Effect used for rendering the function
  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator])
  

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
    <h1 className='text-white text-center text-4xl pb-7 my-3'>Password generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type='text' value={password} className='outline-none w-full py-1 px-3'
      placeholder='Password' readOnly ref={passwordRef}
      />
      <button className={`outline-none bg-${copied ? 'green' : 'blue'}-500 hover:bg-${copied ? 'green' : 'blue'}-400 text-white px-3 py-0.5 shrink-0`}
              onClick={copyToClipboard}
      > {copied ? 'copied' : 'copy'}
      </button>
    </div>

    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={8} max={20} value={length} className='cursor-pointer' 
          onChange={(e)=>setLength(e.target.value)}
        />
        <label>Length:{length}</label>
      </div>

      <div className='flex text-sm gap-x-2'>
          <input type="checkbox" name="" id="numberInput" defaultChecked={numberAllowed} 
          onChange={()=>{setNumberAllowed((prev)=> !prev);}}/>
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex text-sm gap-x-2'>
          <input type="checkbox" name="" id="characterInput" defaultChecked={charAllowed} 
          onChange={()=>{setCharAllowed((prev)=> !prev);}}/>
          <label htmlFor="characterInput">Character</label>
        </div>
    </div>
    </div>
    </>
  )
}

export default App
