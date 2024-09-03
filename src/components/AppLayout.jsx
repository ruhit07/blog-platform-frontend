/* eslint-disable react/prop-types */
import AppNavbar from "./AppNavbar"

const AppLayout = ({ children }) => {
  return (
    <div>
      <AppNavbar />
      {children}
    </div>
  )
}

export default AppLayout