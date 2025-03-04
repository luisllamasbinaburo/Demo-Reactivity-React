## **1️⃣ Configurar el Proyecto con Vite + React + Tailwind**  

```sh
npx create-vite@latest shoppingcart --template react
cd shoppingcart
npm install

npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

npm install zustand
```

Edita `tailwind.config.js` para incluir archivos JSX:  

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

En `src/index.css`, agrega Tailwind:  

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

En `src/main.jsx`, importa Tailwind:  

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```


