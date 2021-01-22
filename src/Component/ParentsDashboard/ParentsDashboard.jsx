import React from 'react';
import 'antd/dist/antd.css';
import '../FrontPage/FrontPage.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LogoutOutlined
  
  
} from '@ant-design/icons';

const { Header, Sider, Content,Footer } = Layout;

class ParentsDashboard extends React.Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

 
  render() {
    return (
      <div>     <Layout>
        <Sider breakpoint="xs"  className="sider" trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" style={{color:"white",paddingBottom:60}} > {this.state.collapsed ?  <UserOutlined style={{padding:8,fontSize:30}}/>: <div style={{textAlign:'center',fontFamily:'cursive'}}><UserOutlined style={{fontSize:30}}/> holy Child Convent hr. sec.school </div> } </div>
          <Menu className='nav' theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>    
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />}>
              Sign Out
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
        <div className="mobileHidden">    <Header  className="site-layout-background" style={{ padding: 0,color:'#373737',fontFamily:'fantasy',fontSize:20,textAlign:'left' }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
              style:{fontSize:30,zIndex:10}
            })}
            
      
            <p  style={{ padding: 0,color:'#373737',fontFamily:'fantasy',fontSize:25,marginTop:-50,marginLeft:'40%' }} >Parent's Dashboard </p>
      
          </Header></div>
<div className="mobileVisible" style={{backgroundColor:'white'}}>
{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
              style:{fontSize:25,zIndex:10,marginTop:'4%'}
            })} <p  style={{ padding: 0,color:'#373737',fontFamily:'fantasy',fontSize:20,marginTop:-27,marginLeft:60 }} >Parent's Dashboard </p>
</div>

          <Content
            className="site-layout-background"
            style={{
              margin: '30px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
      <div>
        <Footer>Parent's Footer</Footer>
      </div>
      </div>
 
    );
  }
}

export default ParentsDashboard