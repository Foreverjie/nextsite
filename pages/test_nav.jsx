import React, { useState } from 'react'
import { Menu, Row, Col, Input, Layout } from 'antd'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LikeFilled,
} from '@ant-design/icons'

const { SubMenu } = Menu
const { Search } = Input
const { Header } = Layout

const TestNav = () => {
  const [current, setCurrent] = useState('mail')

  const handleClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backgroundColor: 'inherit',
      }}
    >
      <Row gutter={[16]}>
        <Col
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 6, offset: 2 }}
          md={{ span: 6, offset: 2 }}
          lg={{ span: 6, offset: 2 }}
          xl={{ span: 6, offset: 2 }}
        >
          <div
            className="logo"
            style={{
              width: '120px',
              height: '31px',
              background: 'gray',
              margin: '16px 24px 16px 0',
              float: 'left',
            }}
          />
        </Col>
        <Col
          sm={8}
          md={8}
          lg={8}
          xl={8}
          xs={{ span: 10, offset: 0 }}
          sm={{ span: 6, offset: 2 }}
          md={{ span: 6, offset: 2 }}
          lg={{ span: 6, offset: 0 }}
          xl={{ span: 6, offset: 0 }}
        >
          <Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
          />
        </Col>
        <Col
          sm={8}
          md={8}
          lg={8}
          xl={8}
          xs={{ span: 2, offset: 0 }}
          sm={{ span: 6, offset: 2 }}
          md={{ span: 6, offset: 2 }}
          lg={{ span: 6, offset: 0 }}
          xl={{ span: 6, offset: 4 }}
        >
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={
              {
                // width: '100%',
              }
            }
          >
            <Menu.Item
              key="mail"
              icon={<MailOutlined />}
              breakpoint="lg"
              collapsedwidth="30%"
            >
              Navigation One
            </Menu.Item>
            <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
              Navigation Two
            </Menu.Item>
            <SubMenu
              icon={<SettingOutlined />}
              title="Navigation Three - Submenu"
            >
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
              <a
                href="https://ant.design"
                target="_blank"
                rel="noopener noreferrer"
              >
                Navigation Four - Link
              </a>
            </Menu.Item>
          </Menu>
        </Col>
        {/* <Col xs={6} sm={8} md={8} lg={8} xl={8}>
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={
              {
                // width: '100%',
              }
            }
          >
            <Menu.Item
              key="mail"
              icon={<MailOutlined />}
              breakpoint="lg"
              collapsedWidth="30%"
            >
              Navigation One
            </Menu.Item>
            <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
              Navigation Two
            </Menu.Item>
            <SubMenu
              icon={<SettingOutlined />}
              title="Navigation Three - Submenu"
            >
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
              <a
                href="https://ant.design"
                target="_blank"
                rel="noopener noreferrer"
              >
                Navigation Four - Link
              </a>
            </Menu.Item>
          </Menu>
        </Col> */}
      </Row>
    </Header>
  )
}

export default TestNav
