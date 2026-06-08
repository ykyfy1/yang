/**
 * allHead 通用头部组件 - 支持自定义图片
 * 功能：动态渲染头部、自定义logo/背景图、配置文字、样式自适应
 */
(function (window, document) {
  // 默认配置项
  const defaultConfig = {
    // 头部容器挂载节点
    container: "#app",
    // 头部高度
    height: "60px",
    // 头部背景色
    bgColor: "#ffffff",
    // 头部文字
    title: "自定义头部",
    titleColor: "#333",
    // 图片配置
    logo: {
      // 支持 网络图片地址 / 本地相对路径
      src: "https://blog.yangjunyu.cc.cd/docs/image/beijing.jpg",
      width: "40px",
      height: "40px",
      marginRight: "12px"
    },
    // 头部整体圆角、阴影
    radius: "0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  };

  // 合并配置
  function mergeConfig(userConfig) {
    return Object.assign({}, defaultConfig, userConfig);
  }

  // 创建头部DOM结构
  function createHead(config) {
    const container = document.querySelector(config.container);
    if (!container) {
      console.error("allHead：未找到挂载容器 " + config.container);
      return;
    }

    // 头部外层容器
    const headWrap = document.createElement("div");
    headWrap.className = "all-head";
    headWrap.style.cssText = `
      display: flex;
      align-items: center;
      width: 100%;
      height: ${config.height};
      background-color: ${config.bgColor};
      border-radius: ${config.radius};
      box-shadow: ${config.boxShadow};
      padding: 0 20px;
      box-sizing: border-box;
    `;

    // Logo 图片元素
    const logoImg = document.createElement("img");
    logoImg.className = "all-head-logo";
    logoImg.src = config.logo.src;
    logoImg.style.cssText = `
      width: ${config.logo.width};
      height: ${config.logo.height};
      margin-right: ${config.logo.marginRight};
      object-fit: contain;
    `;

    // 标题文字
    const titleText = document.createElement("span");
    titleText.className = "all-head-title";
    titleText.innerText = config.title;
    titleText.style.cssText = `
      font-size: 18px;
      color: ${config.titleColor};
      font-weight: 500;
    `;

    // 组装结构
    headWrap.appendChild(logoImg);
    headWrap.appendChild(titleText);
    container.appendChild(headWrap);

    // 返回实例，用于后续修改图片/内容
    return {
      el: headWrap,
      logo: logoImg,
      title: titleText,
      // 动态修改 Logo 图片方法
      setLogoImg: function (imgSrc) {
        logoImg.src = imgSrc;
      },
      // 动态修改标题
      setTitle: function (text) {
        titleText.innerText = text;
      }
    };
  }

  // 暴露全局方法
  window.allHead = function (userConfig = {}) {
    const config = mergeConfig(userConfig);
    return createHead(config);
  };

})(window, document);
