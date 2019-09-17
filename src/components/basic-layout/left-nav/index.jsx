import {Icon, Menu} from "antd";
import React from "react";
import menus from '../../../config/menus'
import {withRouter, Link} from 'react-router-dom'
import {withTranslation} from 'react-i18next'
import {connect} from 'react-redux'
import {setTitle} from '../../../redux/action-creators'


const {SubMenu} = Menu;

@connect(
  null,
  {setTitle}
)
@withTranslation()
@withRouter
class Leftnav extends React.Component {

  findOpenKeys = (pathname) => {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (menu.children) {
        for (let j = 0; j < menu.children.length; j++) {
          const cMenu = menu.children[j];
          if (pathname.startsWith(cMenu.key)) {
            return menu.key
          }
        }
      }
    }
  }

  findTitle = (key) => {

    for (let i = 0; i < menus.length; i++) {
      if (menus[i].children) {
        for (let j = 0; j < menus[i].children.length; j++) {
          if (menus[i].children[j].key === key) {
            return menus[i].children[j].title
          }
        }
      } else {
        if (menus[i].key === key) {
          return menus[i].title
        }
      }
    }

  }

  setTitle = ({key}) => {

    let title = this.findTitle(key)
    this.props.setTitle(
      title
    )
  }

  render() {
    const {pathname} = this.props.location
    const result = this.findOpenKeys(pathname)
    let a = pathname.startsWith('/product')?'/product':pathname
    const {t} = this.props
    return (
      <Menu onSelect={this.setTitle} theme="dark" defaultSelectedKeys={[a]} defaultOpenKeys={[result]}
            mode="inline">

        {
          menus.map((menu) => {

            if (menu.children) {
              return (
                <SubMenu key={menu.key} title={<span><Icon type={menu.icon}/><span>{t(menu.title)}</span></span>}>
                  {
                    menu.children.map((child) => {
                      return (<Menu.Item key={child.key}>
                        <Link to={child.key}>
                          <Icon type={child.icon}/>
                          <span>{t(child.title)}</span>
                        </Link>
                      </Menu.Item>)
                    })
                  }
                </SubMenu>
              )
            } else {
              return (
                <Menu.Item key={menu.key}>
                  <Link to={menu.key}>
                    <Icon type={menu.icon}/>
                    <span>{t(menu.title)}</span>
                  </Link>
                </Menu.Item>
              )
            }


          })
        }

        {/*<Menu.Item key="1">
                    <Icon type="pie-chart"/>
                    <span>Option 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="desktop"/>
                    <span>Option 2</span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                  <Icon type="user"/>
                  <span>User</span>
                </span>
                    }
                >
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                  <Icon type="team"/>
                  <span>Team</span>
                </span>
                    }
                >
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9">
                    <Icon type="file"/>
                    <span>File</span>
                </Menu.Item>*/}
      </Menu>
    )
  }
}

export default Leftnav



