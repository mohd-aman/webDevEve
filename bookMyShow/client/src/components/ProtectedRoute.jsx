import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { ROLE } from "../utils/constant";


export default function ProtectedRoute({ children }) {
  const { user } = useSelector((store) => store.user);
  const { loading } = useSelector((store) => store.loader);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
      onClick:()=>{
        navigate("/");
      }
    },
    {
      key: "user",
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          key: "profile",
          label: "My Profile",
          icon: <UserOutlined />,
          onClick:()=>{
            if(user.role === ROLE.ADMIN){
                navigate("/admin");
            }else if(user.role === ROLE.PARTNER){
               navigate("/partner");
            }else if(user.role === ROLE.USER){
              navigate("/profile");
            }
          }
        },
        {
          key: "logout",
          label: "Logout",
          icon: <LogoutOutlined />,
          onClick: () => {
            localStorage.removeItem("token");
            navigate("/login");
          },
        },
      ],
    },
  ];

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(showLoading());
        const resp = await GetCurrentUser();
        dispatch(setUser(resp.data));
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(hideLoading());
      }
    };

    if (localStorage.getItem("token")) {
      getUser();
    } else {
      //redirect user to login page
      navigate("/login");
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout>
        <Header
          className="d-flex justify-content-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
            Book My Show
          </h3>
          <Menu theme="dark" mode="horizontal" items={navItems} />
        </Header>
        <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </Layout>
    </>
  );
}
