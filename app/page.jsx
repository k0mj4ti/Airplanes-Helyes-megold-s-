"use client"

import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [planes, setPlanes] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    async function getPlanes(){
      if (isLoggedIn){
        const res = await fetch('/api/myplanes', {
          headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}
        })
        if (!res.ok){
          const text = await res.text();
          alert(text)
        }
        const body = await res.json();
        setPlanes(body);
      }else{
        const res = await fetch('/api/planes')
        if (!res.ok){
          const text = await res.text();
          alert(text)
        }
        const body = await res.json();
        setPlanes(body);
      }
    }
    getPlanes()
  }, [isLoggedIn, refresh])

  async function Login(e){
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (!username || !password) {
      alert("Username and Password are required!")
      return;
    }
    const res = await fetch("/api/login", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    })
    if (!res.ok){
      const text = await res.text();
      alert(text);
      return;
    }
    const token = await res.json();
    sessionStorage.setItem("token", token);
    setIsLoggedIn(true);
  }
  async function LogOut(){
    if (!isLoggedIn) return;
    sessionStorage.removeItem("token")
    setIsLoggedIn(false);
  }

  async function AddPlane(e){
    if (!isLoggedIn) return;
    e.preventDefault();
    const name = e.target.name.value;
    const type = e.target.type.value;
    const seats = e.target.seats.value;
    const range = e.target.range.value;
    if (!name || !type || !seats || !range) {
      alert("Missing fields!")
      return;
    }
    const res = await fetch("/api/planes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify({name, type, seats, range})
    })
    if (!res.ok){
      const text = await res.text();
      alert(text);
      return;
    }
    setRefresh(!refresh);
  }
  async function DeletePlane(id){
    if (!isLoggedIn) return;
    if (!id) return;
    const res = await fetch(`/api/planes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      },
    })
    if (!res.ok){
      const text = await res.text();
      alert(text);
      return;
    }
    setRefresh(!refresh);
  }
  return (
    <div className="text-black m-2">
      <h1 className="font-bold text-center text-4xl mb-4">Repülők</h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-auto w-2/3 ">
          <div className="md:col-span-8 bg-base-300 p-2 rounded-lg">
            <h1 className="font-bold text-2xl mb-3">Repülők</h1>
            <ul className="flex flex-col gap-2">
              {planes.map((item) => (
                <li key={item.id} className=" p-2 border rounded-lg flex flex-row items-center justify-between">
                  <div>
                    <h2 className="font-bold">Név <span className="font-normal">{item.name}</span></h2>
                    <p className="font-bold">Típus: <span className="font-normal">{item.type}</span></p>
                    <p className="font-bold">Ülőhelyek: <span className="font-normal">{item.seats}</span></p>
                    <p className="font-bold">Hatótáv: <span className="font-normal">{item.range}</span></p>
                  </div>
                  {isLoggedIn && <div className="bg-red-500 hover:bg-red-600 rounded-lg p-1 cursor-pointer" onClick={() => DeletePlane(item.id)}><Trash className="text-black"/></div>}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 grid grid-rows-1 gap-4 ">
            <div className="bg-base-300 rounded-lg">
              {isLoggedIn ? (
                <div className="p-2">
                  <h1 className="text-2xl font-bold mb-5">Kijelentkezés</h1>
                  <button onClick={LogOut} className="btn bg-red-500 hover:bg-red-600 w-full">Kijelentkezés</button>
                </div>
              ) : (
                <form className="fieldset p-2" onSubmit={(e) => Login(e)}>
                  <h1 className="text-2xl font-bold">Bejelentkezés</h1>
                  <label className="">Felhasználónév</label>
                  <input name="username" type="text" className="input w-full" placeholder="Írd be a felhasználóneved" required/>
                  <label className="">Jelszó</label>
                  <input name="password" type="text" className="input w-full" placeholder="Írd be a jelszavad" required/>
                  <button type="submit" className="btn bg-green-500 hover:bg-green-600">Bejelentkezés</button>
                </form>
              )}
            </div>
            <div className="bg-base-300 rounded-lg p-2" onSubmit={(e) => AddPlane(e)}>
              <form className="fieldset p-2">
                <h1 className="text-2xl font-bold">Új repülőgép felvétele</h1>
                <label className="">Név</label>
                <input name="name" type="text" className="input w-full" placeholder="Írd be a repülő nevét" required/>
                <label className="">Típus</label>
                <input name="type" type="text" className="input w-full" placeholder="Írd be a repülő típusát" required/>
                <label className="">Férőhely</label>
                <input name="seats" type="number" className="input w-full" placeholder="Írd be a repülő férőhelyét" required/>
                <label className="">Hatótáv</label>
                <input name="range" type="number" className="input w-full" placeholder="Írd be a repülő hatótávát" required/>
                <button type="submit" className="btn bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300" disabled={!isLoggedIn}>Hozzáadás</button>
              </form>
            </div>
          </div>

        </div>
        <footer className="text-center mt-2 text-white">
          <div>Komjáti Gábor Kornél</div>
          <div>Repülők</div>
          <div>2026.04.26</div>
        </footer>
    </div>
  );
}
