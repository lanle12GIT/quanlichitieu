import './header.css'

const Header = () => {
  return (
    <ul>
      <li><a className="active" href="/">Home</a></li>
      <li><a href="/order">Đơn Hàng</a></li>
      <li><a href="/spend">Chi tiêu</a></li>
      <li><a href="/statistic">Thống kê</a></li>
    </ul>
  )

}
export default Header