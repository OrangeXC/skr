<template>
  <aside class="aside">
    <img class="avatar" src="~assets/img/avatar.jpg" alt="avatar">
    <p class="name">Orange</p>
    <p class="info">Go big or go home</p>
    <div class="icons">
      <a href="https://github.com/OrangeXC" target="_blank">
        <img class="icon" src="~assets/img/github.png" alt="github">
      </a>
      <a href="https://twitter.com/orangewxc" target="_blank">
        <img class="icon" src="~assets/img/twitter.png" alt="twitter">
      </a>
      <a href="mailto:842012622@qq.com">
        <img class="icon" src="~assets/img/email.png" alt="email">
      </a>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.aside {
  width: 180px;
  position: absolute;
  left: -200px;
  padding: 20px 0;

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

  text-align: center;

  .avatar {
    width: 120px;
    height: 120px;

    border-radius: 50%;
  }

  .name {
    margin-top: 10px;

    font-size: 22px;
  }

  .info {
    font-size: 16px;
  }

  .icons {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    padding: 0 10px;
    margin-top: 20px;
  }

  .icon {
    width: 30px;
    cursor: pointer;
  }
}

@media screen and (max-width: 960px) {
  .aside {
    display: none;
  }
}
</style>
