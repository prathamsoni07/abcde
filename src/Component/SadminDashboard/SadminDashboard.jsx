import React from 'react';
import 'antd/dist/antd.css';
import '../FrontPage/FrontPage.css';
import { Layout, Menu, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    FormOutlined,
    UploadOutlined,
    LogoutOutlined,
    SnippetsOutlined


} from '@ant-design/icons';
import Axios from 'axios';
import Cookies from 'js-cookie';
import queryString from 'query-string'
import EnrollCards from './SuperAdmin/EnrollCards/EnrollCards';
import SectionCards from './SuperAdmin/SectionAndBranch/SectionCards';
import UpdateCard from './SuperAdmin/UpdateandDelete/Card';

const { Header, Sider, Content, Footer } = Layout;

class SadminDashboard extends React.Component {
    state = {
        collapsed: true,
        enrollMentid: '',
        enrollCard: true,
        SectionCard: false,
        UpdateandDelete: false
    };

    componentDidMount = () => {
        console.log("component SuperAdmin called");
        Axios.post(process.env.REACT_APP_SECURITY_API.concat("verification"), { data: 'verification' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
            console.log(res.data);
            if (res.data === true) {
                const username1 = queryString.parse(window.location.href.split('?')[1])
                this.setState({ enrollMentid: username1.enrollMentid })
            }
        }).catch(err => {
            if (err) {
                this.props.history.push("/")

            }
        })



    }




    to

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    enroll = () => {
        this.setState({ enrollCard: true, SectionCard: false, UpdateandDelete: false })
    }

    section = () => {
        this.setState({ enrollCard: false, SectionCard: true, UpdateandDelete: false })
    }
    update = () => {
        this.setState({ enrollCard: false, SectionCard: false, UpdateandDelete: true })
    }
    logout = () => {
        var d = window.confirm("Leave Site")
        if (d) {
            this.setState({ spin: false })
            Axios.post(process.env.REACT_APP_SECURITY_API.concat("logout"), { hello: 'logout' }, { headers: { Authorization: Cookies.get("Authorization") } }).then((res) => {
                console.log(res.data);
                Cookies.remove("Authorization")
                this.props.history.push('/')
            })
        } else return false


    }

    render() {
        return (
            <div>     <Layout>
                <Sider breakpoint="xs" className="sider" trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" style={{ color: "white", paddingBottom: 60 }} > {this.state.collapsed ? <UserOutlined style={{ padding: 8, fontSize: 30 }} /> : <div style={{ textAlign: 'center', fontFamily: 'cursive' }}><UserOutlined style={{ fontSize: 30 }} /> SuperAdmin Dashboard </div>} </div>
                    <Menu className='nav' theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" onClick={this.enroll} icon={<FormOutlined />}>
                            Enroll Page
            </Menu.Item>
                        <Menu.Item key="2" onClick={this.section} icon={<SnippetsOutlined />}>
                            Section Page
            </Menu.Item>
                        <Menu.Item key="3" onClick={this.update} icon={<UploadOutlined />}>
                            Update And Delete Page
            </Menu.Item>
                        <Menu.Item key="4" onClick={this.logout} icon={<LogoutOutlined />}>
                            Sign Out
            </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <div className="mobileHidden">    <Header className="site-layout-background" style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 20, textAlign: 'left' }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                            style: { fontSize: 30, zIndex: 10 }
                        })}


                        <p style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 25, marginTop: -50, marginLeft: '40%' }} >Super Admin Dashboard <span style={{ float: 'right', marginRight: '2%', cursor: 'pointer' }} > <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large" icon={<UserOutlined />} /></span> </p>

                    </Header></div>
                    <div className="mobileVisible" style={{ backgroundColor: 'white' }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                            style: { fontSize: 25, zIndex: 10, marginTop: '4%' }
                        })} <p style={{ padding: 0, color: '#373737', fontFamily: 'fantasy', fontSize: 20, marginTop: -27, marginLeft: 60 }} >Super Admin Dashboard  </p>
                    </div>

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '30px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {this.state.enrollCard ? <EnrollCards /> : null}
                        {this.state.SectionCard ? <SectionCards /> : null}
                        {this.state.UpdateandDelete ? <UpdateCard /> : null}

                    </Content>
                </Layout>
            </Layout>
                <div>
                    <Footer>SuperAdmin's Footer</Footer>
                </div>
            </div>

        );
    }
}

export default SadminDashboard