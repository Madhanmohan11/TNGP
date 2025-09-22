import React, { useState } from "react";
// import Header from "./components/Header";
// import Table_1 from "./components/Table_1";
// import Table_2 from "./components/Table_2";
// import Table_3 from "./components/Table_3";
// import Table_4 from "./components/Table_4";
// import Table_5 from "./components/Table_5";
// import Table_6 from "./components/Table_6";
// import Table_7 from "./components/Table_7";
import Vr from "./components/vr";   // ✅ changed name

import LanguageToggleButton from "./components/LanguageToggleButton";

function App() {
  const [lang, setLang] = useState("tamil");

  const handleLanguageToggle = () => {
    setLang((prev) => (prev === "tamil" ? "english" : "tamil"));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 relative overflow-x-hidden">
{/*       <Header lang={lang} /> */}
{/*       <LanguageToggleButton lang={lang} onToggle={handleLanguageToggle} /> */}
{/*       <Table_1 lang={lang} />
      <Table_2 lang={lang} />
      <Table_3 lang={lang} />
      <Table_4 lang={lang} />
      <Table_5 lang={lang} />
      <Table_6 lang={lang} />
      <Table_7 lang={lang} /> */}
      <Vr lang={lang} />   {/* ✅ fixed usage */}
    </div>
  );
}

export default App;
