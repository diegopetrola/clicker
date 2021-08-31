import { useState, useEffect } from "react";

const getUserAPI = async (user) => {
  const result = await fetch("/api/counter/" + user);
  const data = await result.json();
  return data;
};

export default function Body() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("");

  useEffect(async function () {
    let res = localStorage['user'] ?
      await getUserAPI(localStorage['user']) : { user: "", count: 0 };
    setUser(res.user);
    setCount(res.count);
  }, []);

  useEffect(() => {
    const className = "self-center mr-4 rounded-full h-8 w-12 bg-blue-400 text-white " +
      "flex items-center justify-center text-w2xl";
    const element = document.getElementById("counter");
    element.className = className + " animate-bounce";
    const timeout = setTimeout(() => element.className = className, 500);
    return () => { element.className = className; clearTimeout(timeout) };
  }, [count])

  const increaseCounter = async (user) => {
    const result = await fetch("/api/counter", {
      method: "POST",
      body: JSON.stringify({
        user: user,
        value: 1
      }),
    });
    const data = await result.json();
    setUser(data.user);
    setCount(data.count);
  };

  // Dinamically update user as the username is being typed
  // Code from StackOverflow
  const handleInput = function (e) {
    let cancel = () => { };
    let term = e.target.value;
    if (term == "") return;
    console.log(`searching for "${term}"`);
    cancel();
    let p = new Promise(resolve => cancel = resolve);
    Promise.race([p, getUserAPI(term)]).then(results => {
      if (results) {
        console.log(`results for "${term}"`, results);
        localStorage.setItem("user", e.target.value);
        setUser(results.user);
        setCount(results.count);
      }
    });
  }

  return (<>
    <div className="mt-10 grid grid-cols-4 justify-center gap-3">
      <span className=" self-center text-right font-light text-gray-400 text-sm">Username</span>
      <input className="text-center col-span-2 rounded border-gray-400 border-2" type="text"
        onChange={handleInput}
        placeholder="" name="" key="input" defaultValue={user} />
      <div></div>
      <div className="text-right self-center text-gray-400 text-sm ">
        Clicks
      </div>
      <div className="flex font-semibold col-span-2 justify-center">
        <span className="self-center mr-4 rounded-full h-8 w-12 bg-blue-400 text-white 
                flex items-center justify-center text-w2xl animate-bounce" key="counter" id="counter">
          {count}</span>
        <div className="transition transform hover:scale-110 ease-in" onClick={() => increaseCounter(user)} >
          <svg xmlns="http://www.w3.org/2000/svg" className="text-green-500 h-12 w-12"
            viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 
                  0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </>);
}
