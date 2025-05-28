import React, { useEffect, useState } from 'react';
import { selectUser } from "../redux/authSlice";
import { useSelector } from "react-redux";
import connect from "../js/connect";
import UserCard from "./UserCard";

function AddFriends() {
  const [sugg, setSugg] = useState([]);
  const [filteredSugg, setFilteredSugg] = useState([]);
  const [search, setSearch] = useState("");
  const user = useSelector(selectUser); 

  useEffect(() => {
    async function getSuggestions() {
      const result = await connect.getSuggestions(user.token); 
      if (result.status && result.suggestions.length > 0) {
        setSugg(result.suggestions.map(s => ({ ...s, status: "send" })));
      } 
    }
    getSuggestions();
    //eslint-disable-next-line
  }, []);

  useEffect(()=> {
    setFilteredSugg(sugg);
  }, [sugg]);

  const filterUsers = (search) => {
    const filtered = sugg.filter((f) =>
        f.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSugg(filtered);
  };

  useEffect(()=> {
    if(search === "")
      setFilteredSugg(sugg);
    else
      filterUsers(search);
    //eslint-disable-next-line
  }, [search]);


  const sendRequest = async (toUserId) => { 
    setSugg(prev => prev.map(user =>
      user._id === toUserId ? { ...user, status: "request-sent" } : user
    ));

    await connect.sendRequest(toUserId, user.token); 
  };

  return (
    <div className="space-y-0">
      <div className='bg-slate-900'>
        <input 
          className="w-full bg-slate-700 px-4 py-2 text-white font-medium focus-visible:outline-none" 
          type="text" 
          placeholder="Search for friends"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
 
      {filteredSugg.length > 0 ? filteredSugg.map((user, idx) => (
        <div key={idx} className="bg-slate-800 hover:bg-slate-700 border-b border-slate-700 transition cursor-pointer">
          <UserCard
            name={user.username}
            type={user.status}
            onActionClick={() => sendRequest(user._id)}
          />
        </div>
      )): (
        <div className="p-4 text-gray-400">No Users found.</div>
      )}
    </div>
  );
}

export default AddFriends;
