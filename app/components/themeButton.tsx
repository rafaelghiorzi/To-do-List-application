interface ThemeButtonProps {
  theme: string;
  toggletheme: () => void;
}

const toggleLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="#000000"
    viewBox="0 0 256 256"
  >
    <path d="M176,56H80a72,72,0,0,0,0,144h96a72,72,0,0,0,0-144Zm0,128H80A56,56,0,0,1,80,72h96a56,56,0,0,1,0,112ZM80,88a40,40,0,1,0,40,40A40,40,0,0,0,80,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,80,152Z"></path>
  </svg>
);

const toggleRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="#ffffff"
    viewBox="0 0 256 256"
  >
    <path d="M176,56H80a72,72,0,0,0,0,144h96a72,72,0,0,0,0-144Zm0,128H80A56,56,0,0,1,80,72h96a56,56,0,0,1,0,112Zm0-96a40,40,0,1,0,40,40A40,40,0,0,0,176,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,176,152Z"></path>
  </svg>
);

export default function ThemeButton({ theme, toggletheme }: ThemeButtonProps) {
  return (
    <button
      className={`transition duration-300 fixed bottom-4 right-4  ml-3 mt-2 flex ${
        theme === "dark" ? "dark" : ""
      }`}
      onClick={() => {
        toggletheme();
      }}
    >
      {theme === "dark" ? toggleLeft : toggleRight}
      <span className="ml-2">toggle theme</span>
    </button>
  );
}
