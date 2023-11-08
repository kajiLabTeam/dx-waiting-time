import { theme } from "../../utils/theme";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: 0,
        backgroundColor: theme.colors.orenge,
      }}
    >
      <h2
        style={{
          color: "#602E1B",
        }}
      >
        呼び出し
      </h2>
      <button
        style={{
          margin: 0,
          color: "#602E1B",
        }}
      >
        ログアウト
      </button>
    </header>
  );
};

export default Header;
