
import Header from "./Header";
import AutoRefresh from "./AutoRefresh";
import "./global.css";

export default function RootLayout({ children })
{
  return (
    <AutoRefresh>
      <html lang="en">
        <body>
          <Header />
          <menu>{children}</menu>
        </body>
      </html>
    </AutoRefresh>
  )
}
