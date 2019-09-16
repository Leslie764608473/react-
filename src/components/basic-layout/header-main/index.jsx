import React from 'react';
import  { Button,Icon } from 'antd'
import screenfull from 'screenfull'
import { connect } from 'react-redux'
import './index.less'
import { withTranslation,getI18n } from 'react-i18next'

@withTranslation()
@connect(
    (state)=>({username:state.user.user.username})
)
class HeaderMain extends React.Component{

    state = {
        isScreenFull:false,
        isEnglish:getI18n().language === 'en'
    }


    screenFull = ()=>{
        if (screenfull.isEnabled) {
            screenfull.toggle();

        }
    }

    change = ()=>{
        this.setState({
            isScreenFull:!this.state.isScreenFull
        })
    }

     componentDidMount() {
         // 绑定事件
         screenfull.on('change', this.change);
     }

     componentWillUnmount() {
         // 解绑事件
         screenfull.off('change', this.change);
     }

    changeLanguage = ()=>{
        const isEnglish = !this.state.isEnglish
        this.props.i18n.changeLanguage(isEnglish ? 'en' : 'zh-CN');
        this.setState({
            isEnglish
        })
    }


    render() {

        const {username} = this.props
        return (
            <div className='header-main'>
                <div className='header-top'>
                    <Button size="small" onClick={this.screenFull} ><Icon type={this.state.isScreenFull?'fullscreen-exit':'fullscreen'} /></Button>
                    <Button onClick={this.changeLanguage} size="small" className="header-main-btn" >{this.state.isEnglish?'中文':'English'}</Button>
                    <span>欢迎, {username}</span>
                    <Button type="link">退出</Button>
                </div>
                <div className='header-bottom'>
                    <h3>首页</h3>
                    <span>2019-09-12 15:31:16</span>
                </div>
            </div>
        );
    }

}
export default HeaderMain