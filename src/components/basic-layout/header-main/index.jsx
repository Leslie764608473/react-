import React from 'react';
import {Button, Icon, Modal,} from 'antd'
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import './index.less'
import {withTranslation, getI18n} from 'react-i18next'
import dayjs from 'dayjs'
import {setTitle, initUser} from '../../../redux/action-creators'
import menus from "../../../config/menus";
import {withRouter} from 'react-router-dom'


@withRouter
@withTranslation()
@connect(
  (state) => ({
    username: state.user.user.username,
    title: state.title
  }),
  {setTitle, initUser}
)
class HeaderMain extends React.Component {

  state = {
    isScreenFull: false,
    isEnglish: getI18n().language === 'en',
    time: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }


  screenFull = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  change = () => {
    this.setState({
      isScreenFull: !this.state.isScreenFull
    })
  }

  findTitle = (key) => {

    for (let i = 0; i < menus.length; i++) {
      if (menus[i].children) {
        for (let j = 0; j < menus[i].children.length; j++) {
          if (key.startsWith(menus[i].children[j].key)) {
            return menus[i].children[j].title
          }
        }
      } else {
        if (key.startsWith(menus[i].key)) {
          return menus[i].title
        }
      }
    }
  }

  componentDidMount() {
    const {pathname} = this.props.location
    const result = this.findTitle(pathname)
    this.props.setTitle(result)

    // 绑定事件
    screenfull.on('change', this.change);
    setInterval(() => {
      this.setState({
        time: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000)
  }

  componentWillUnmount() {
    // 解绑事件
    screenfull.off('change', this.change);
  }

  changeLanguage = () => {
    const isEnglish = !this.state.isEnglish
    console.log(this.props.i18n)
    this.props.i18n.changeLanguage(isEnglish ? 'en' : 'zh-CN');
    this.setState({
      isEnglish
    })
  }

  logout = () => {

    Modal.confirm({
      title: '亲，确认退出么？',
      onOk: () => {
        this.props.initUser()

      }
    })
  }


  render() {

    const {username, t} = this.props
    return (
      <div className='header-main'>
        <div className='header-top'>
          <Button size="small" onClick={this.screenFull}><Icon
            type={this.state.isScreenFull ? 'fullscreen-exit' : 'fullscreen'}/></Button>
          <Button onClick={this.changeLanguage} size="small"
                  className="header-main-btn">{this.state.isEnglish ? '中文' : 'English'}</Button>
          <span>欢迎, {username}</span>
          <Button onClick={this.logout} type="link">退出</Button>
        </div>
        <div className='header-bottom'>
          <h3>{t(this.props.title)}</h3>
          <span>{this.state.time}</span>
        </div>
      </div>
    );
  }

}

export default HeaderMain